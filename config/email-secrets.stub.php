<?php
/**
 * email-secrets.stub.php
 * DO NOT USE IN PRODUCTION. Example structure only.
 * Copy this file OUTSIDE the web root (e.g., /home/ACCOUNT_NAME/secure/email-secrets.php)
 * and rename to email-secrets.php then fill real values.
 * Remove any stub remains from repository to avoid confusion.
 */
return [
  // SMTP username (often full email address or mail account name)
  'username' => 'REPLACE_SMTP_USERNAME',
  // SMTP password or app-specific password (never a primary account password)
  'password' => 'REPLACE_SMTP_PASSWORD',
  // 32+ byte random salt for HMAC IP hashing (hex or base64). Generate a fresh one.
  'salt'     => 'REPLACE_RANDOM_SALT',
];
