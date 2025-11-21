<?php
/**
 * Contact form mailer endpoint
 * Path: /contact/send.php
 * Dependencies: PHPMailer (vendored minimal) or system mail() fallback.
 * Security: CSRF token (session), honeypot, rate limit, IP hash logging, length cap.
 * NOTE: Replace placeholder PHPMailer include with actual library placement.
 */
declare(strict_types=1);
session_start();
header('Content-Type: application/json');

// Health / readiness check (no secrets leaked)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $config = @include __DIR__ . '/../config/email.php';
    $mailerClass = 'PHPMailer\\PHPMailer\\PHPMailer';
    $status = [
        'ok' => true,
        'configured' => empty($config['incomplete']),
        'hasHost' => !empty($config['host']),
        'hasCreds' => !empty($config['username']) && !empty($config['password']),
        'fromSet' => !empty($config['from']),
        'toSet' => !empty($config['to']),
        'phpmailerPresent' => class_exists($mailerClass),
    ];
    echo json_encode($status);
    exit;
}

// Allow only POST beyond this point
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Load config
$config = include __DIR__ . '/../config/email.php';

// Basic availability check
if (!empty($config['incomplete'])) {
    http_response_code(500);
    echo json_encode(['error' => 'Mailer not configured']);
    exit;
}

// Read JSON body
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// CSRF validation
if (empty($_SESSION['csrf']) || empty($data['csrf']) || !hash_equals($_SESSION['csrf'], $data['csrf'])) {
    http_response_code(403);
    echo json_encode(['error' => 'CSRF failed']);
    exit;
}

// Honeypot
if (!empty($data['website'])) {
    // Pretend success silently
    echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
    exit;
}

$name    = trim($data['name']    ?? '');
$email   = trim($data['email']   ?? '');
$message = trim($data['message'] ?? '');
$source  = trim($data['source']  ?? 'contact');
$captcha_answer = trim($data['captchaAnswer'] ?? '');
$captcha_expected = $_SESSION['captcha_expected'] ?? null;

$errors = [];
if ($name === '' || mb_strlen($name) < 2) $errors['name'] = 'Name must be at least 2 chars';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Invalid email';
if ($message === '' || mb_strlen($message) < 10) $errors['message'] = 'Message must be at least 10 chars';
if (mb_strlen($message) > $config['max_length']) $errors['message'] = 'Message too long';
if ($captcha_expected !== null && $captcha_answer !== (string)$captcha_expected) $errors['captcha'] = 'Captcha incorrect';

if ($errors) {
    http_response_code(422);
    echo json_encode(['error' => 'Validation failed', 'fields' => $errors]);
    exit;
}

// Rate limiting
$rateFile = __DIR__ . '/../storage/logs/rate.json';
if (!is_file($rateFile)) file_put_contents($rateFile, json_encode([]));
$rateData = json_decode(file_get_contents($rateFile), true) ?: [];
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$ipHash = hash_hmac('sha256', $ip, $config['salt']);
$now = time();
$window = $config['rate']['windowMinutes'] * 60;
$max = $config['rate']['max'];
$entry = $rateData[$ipHash] ?? ['count' => 0, 'first' => $now];
if (($now - $entry['first']) > $window) {
    $entry = ['count' => 0, 'first' => $now];
}
$entry['count']++;
$rateData[$ipHash] = $entry;
file_put_contents($rateFile, json_encode($rateData));
if ($entry['count'] > $max) {
    http_response_code(429);
    echo json_encode(['error' => 'Rate limit exceeded']);
    exit;
}

// Logging helpers
$successLog = __DIR__ . '/../storage/logs/success.log';
$errorLog   = __DIR__ . '/../storage/logs/error.log';
rotateOldLogs([$successLog, $errorLog], 7); // 7 day retention

function logLine(string $file, array $payload): void {
    $payload['ts'] = date('c');
    file_put_contents($file, json_encode($payload) . PHP_EOL, FILE_APPEND);
}
function rotateOldLogs(array $files, int $days): void {
    $cutoff = time() - ($days * 86400);
    foreach ($files as $f) {
        if (is_file($f)) {
            $mtime = filemtime($f) ?: time();
            if ($mtime < $cutoff) unlink($f); // simple rotation
        }
    }
}

// Prepare email body (HTML + plain text)
$htmlBody = '<html><body style="font-family:Arial,sans-serif;">'
    . '<h2>New Portfolio Contact</h2>'
    . '<p><strong>Name:</strong> ' . htmlspecialchars($name) . '</p>'
    . '<p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>'
    . '<p><strong>Source:</strong> ' . htmlspecialchars($source) . '</p>'
    . '<p><strong>IP:</strong> ' . htmlspecialchars($ip) . '</p>'
    . '<hr><p style="white-space:pre-line">' . nl2br(htmlspecialchars($message)) . '</p>'
    . '</body></html>';
$plainBody = "New Portfolio Contact\nName: $name\nEmail: $email\nSource: $source\nIP: $ip\n\nMessage:\n$message";

// Attempt PHPMailer load via loader stub
require_once __DIR__ . '/../backend/mailer/PHPMailerLoader.php';
// Evaluate availability lazily during instantiation to avoid static analyzer errors
$mailerClass = 'PHPMailer\\PHPMailer\\PHPMailer';
$mailerLoaded = class_exists($mailerClass);

if ($mailerLoaded) {
    // Instantiate via variable class name to keep code flexible
    $mail = new $mailerClass(true);
    $attempts = 0; $sent = false; $lastError = '';
    while ($attempts <= $config['retry'] && !$sent) {
        try {
            $mail->isSMTP();
            $mail->Host = $config['host'];
            $mail->Port = $config['port'];
            $mail->SMTPAuth = true;
            $mail->Username = $config['username'];
            $mail->Password = $config['password'];
            $mail->SMTPSecure = 'ssl'; // Using SSL for port 465
            $mail->setFrom($config['from'], 'Portfolio Contact');
            $mail->addAddress($config['to']);
            $mail->addReplyTo($email, $name);
            $mail->Subject = 'New Portfolio Contact';
            $mail->Body = $htmlBody;
            $mail->AltBody = $plainBody;
            $mail->send();
            $sent = true;
        } catch (Throwable $ex) {
            $lastError = $ex->getMessage();
            $attempts++;
            if ($attempts <= $config['retry']) sleep(1);
        }
    }
    if ($sent) {
        logLine($successLog, ['ip' => $ipHash, 'ok' => true, 'len' => mb_strlen($message), 'source' => $source]);
        echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
    } else {
        logLine($errorLog, ['ip' => $ipHash, 'ok' => false, 'error' => $lastError, 'source' => $source]);
        http_response_code(500);
        echo json_encode(['error' => 'Oh Noes! Yous Broke It! Try Snail Mail Next Time']);
    }
    exit;
}

// Fallback: mail() if PHPMailer not available (less reliable)
$headers = 'From: ' . $config['from'] . "\r\n" . 'Reply-To: ' . $email . "\r\n" . 'Content-Type: text/plain; charset=UTF-8';
$sentFallback = @mail($config['to'], 'New Portfolio Contact', $plainBody, $headers);
if ($sentFallback) {
    logLine($successLog, ['ip' => $ipHash, 'ok' => true, 'len' => mb_strlen($message), 'fallback' => true, 'source' => $source]);
    echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
} else {
    logLine($errorLog, ['ip' => $ipHash, 'ok' => false, 'error' => 'fallback-failed', 'source' => $source]);
    http_response_code(500);
    echo json_encode(['error' => 'Oh Noes! Yous Broke It! Try Snail Mail Next Time']);
}
