<?php
/**
 * Email configuration loader (no secrets committed).
 * Attempts to load external secrets file outside web root first.
 * Fallback: environment variables (NOT recommended for shared hosting unless set).
 * NEVER commit real credentials.
 */

declare(strict_types=1);

// Adjust this path to an absolute location OUTSIDE the web root (never commit). Example shared hosting path:
//   /home/ACCOUNT_NAME/secure/email-secrets.php
// Optionally override via env PORTFOLIO_EMAIL_SECURE
$SECURE_SECRETS_PATH = getenv('PORTFOLIO_EMAIL_SECURE') ?: 'D:/secure/email-secrets.php'; // PLACEHOLDER - replace with production absolute path

$config = [
    'host' => 'mail.riadkilani.com',
    'port' => 465,
    'secure' => 'ssl', // ssl or tls
    'from' => 'riad@riadkilani.com',
    'to'   => 'freelance@riadkilani.com',
    'rate' => [ 'max' => 5, 'windowMinutes' => 60 ],
    'max_length' => 12000,
    'retry' => 1,
];

// Attempt to load secrets (username/password + salt) from external file
if (is_file($SECURE_SECRETS_PATH)) {
    $secrets = include $SECURE_SECRETS_PATH; // should return ['username'=>'','password'=>'','salt'=>'random']
    if (is_array($secrets)) {
        $config['username'] = $secrets['username'] ?? null;
        $config['password'] = $secrets['password'] ?? null;
        $config['salt']     = $secrets['salt'] ?? null;
    }
}

// Environment fallbacks if not loaded
$config['username'] = $config['username'] ?? getenv('SMTP_USER');
$config['password'] = $config['password'] ?? getenv('SMTP_PASS');
$config['salt']     = $config['salt']     ?? getenv('SMTP_SALT');

if (!$config['username'] || !$config['password'] || !$config['salt']) {
    // In production you may want to throw; here we allow send.php to handle gracefully.
    $config['incomplete'] = true;
}

return $config;
