<?php
/**
 * PHPMailerLoader.php
 * Purpose: Attempt to load PHPMailer classes if user uploaded them manually.
 * Usage: require this file before using send.php mailer logic.
 * Instructions:
 * 1. Download PHPMailer from https://github.com/PHPMailer/PHPMailer/releases
 * 2. Upload the contents of the PHPMailer/src directory to: backend/vendor/PHPMailer/src
 *    (Create directory: backend/vendor/PHPMailer/src on hosting if not present.)
 * 3. Ensure the following files exist:
 *      - PHPMailer.php
 *      - SMTP.php
 *      - Exception.php
 * 4. Do NOT upload test examples or unused language files unless needed.
 * 5. Keep this loader lightweight; if classes are not found fallback to mail().
 */

$vendorBase = __DIR__ . '/../vendor/PHPMailer/src';
$files = [
  $vendorBase . '/PHPMailer.php',
  $vendorBase . '/SMTP.php',
  $vendorBase . '/Exception.php'
];

foreach ($files as $f) {
  if (is_file($f)) {
    require_once $f;
  }
}
