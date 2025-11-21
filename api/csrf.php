<?php
declare(strict_types=1);
session_start();
header('Content-Type: application/json');
$_SESSION['csrf'] = bin2hex(random_bytes(32));
// Simple math captcha (temporary until Turnstile):
$a = random_int(1, 9); $b = random_int(1, 9); $sum = $a + $b;
$_SESSION['captcha_expected'] = $sum;
// Provide challenge text (avoid giving answer)
echo json_encode([
  'csrf' => $_SESSION['csrf'],
  'captchaQuestion' => "What is $a + $b?"
]);
