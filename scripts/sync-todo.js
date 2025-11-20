#!/usr/bin/env node

/**
 * Todo List Sync Script
 * Opens TODO-LIST.md in VS Code
 */

const { execSync } = require('child_process');
const path = require('path');

const todoPath = path.join(__dirname, '..', 'TODO-LIST.md');

try {
    console.log('📋 Opening TODO-LIST.md...');
    execSync(`code "${todoPath}"`, { stdio: 'inherit' });
    console.log('✅ Todo list opened in VS Code');
} catch (error) {
    console.error('❌ Error opening todo list:', error.message);
    process.exit(1);
}