#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Phase 2: Automated UI Kit migration - Replace hardcoded values with design tokens
.DESCRIPTION
    Systematically replaces hardcoded colors, fonts, spacing, and shadows with
    the new design token system across all SCSS files.
.NOTES
    Author: GitHub Copilot
    Date: November 18, 2025
    Branch: css-cleanup-migration
#>

$ErrorActionPreference = "Stop"
$ProjectRoot = "c:\xampp\htdocs\riadkilani-react"
$BackupDir = Join-Path $ProjectRoot "backups\ui-kit-migration-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
$LogFile = Join-Path $ProjectRoot "ui-kit-migration.log"

# ANSI Colors
$Red = "`e[31m"
$Green = "`e[32m"
$Yellow = "`e[33m"
$Cyan = "`e[36m"
$Reset = "`e[0m"

# ============================================================
# LOGGING
# ============================================================

function Write-Log {
    param([string]$Message, [string]$Level = 'INFO')
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Add-Content -Path $LogFile -Value "[$Timestamp] [$Level] $Message"
    
    switch ($Level) {
        'SUCCESS' { Write-Host ("{0}[OK] {1}{2}" -f $Green, $Message, $Reset) }
        'ERROR'   { Write-Host ("{0}[ERROR] {1}{2}" -f $Red, $Message, $Reset) }
        'WARNING' { Write-Host ("{0}[WARN] {1}{2}" -f $Yellow, $Message, $Reset) }
        default   { Write-Host ("{0}[INFO] {1}{2}" -f $Cyan, $Message, $Reset) }
    }
}

# ============================================================
# REPLACEMENT MAPS
# ============================================================

$ColorReplacements = @{
    # Core colors
    '#333333' = '$color-text-primary'
    '#333' = '$color-text-primary'
    '#fff' = '$color-text-inverse'
    '#ffffff' = '$color-text-inverse'
    '#000' = '$color-text-black'
    '#000000' = '$color-text-black'
    '#595959' = '$color-text-secondary'
    '#6c757d' = '$color-text-muted'
    
    # Grays
    '#f8f9fa' = '$gray-50'
    '#f4f3f4' = '$gray-100'
    '#f5f5f5' = '$gray-100'
    '#e9ecef' = '$gray-200'
    '#e3e3e3' = '$color-border-light'
    '#dee2e6' = '$gray-300'
    '#dadada' = '$color-border-medium'
    '#ccc' = '$color-border-medium'
    '#cccccc' = '$color-border-medium'
    '#adb5bd' = '$gray-500'
    '#eee' = '$progress-bg'
    '#eeeeee' = '$progress-bg'
    
    # Technology colors (already defined as variables)
    '#61DAFB' = '$tech-react'
    '#F7DF1E' = '$tech-javascript'
    '#E34F26' = '$tech-html5'
    '#1572B6' = '$tech-css3'
    '#CC6699' = '$tech-sass'
    '#7952B3' = '$tech-bootstrap'
    '#339933' = '$tech-node'
    '#21759B' = '$tech-wordpress'
    '#F24E1E' = '$tech-figma'
    '#F05032' = '$tech-git'
    '#CF4647' = '$tech-gulp'
    '#4FC08D' = '$tech-vue'
    '#777BB4' = '$tech-php'
    '#0678BE' = '$tech-drupal'
    '#31A8FF' = '$tech-photoshop'
    '#FF9A00' = '$tech-illustrator'
    '#FF3366' = '$tech-indesign'
    '#F7B500' = '$tech-sketch'
    '#181717' = '$tech-github'
    '#FC6D26' = '$tech-gitlab'
    '#CB3837' = '$tech-npm'
    '#2C8EBB' = '$tech-yarn'
    '#2496ED' = '$tech-docker'
    '#FF9900' = '$tech-aws'
    '#4285F4' = '$tech-google'
    '#00A1F1' = '$tech-microsoft'
    '#3DDC84' = '$tech-android'
    '#3776AB' = '$tech-python'
    '#ED8B00' = '$tech-java'
    '#DD0031' = '$tech-angular'
    '#FF2D20' = '$tech-laravel'
    
    # Brand-specific
    '#217dbb' = '$brand-primary'
    '#2b72c9' = '$brand-primary-light'
    '#0d1c2a' = '$brand-primary-dark'
}

$RgbaReplacements = @{
    'rgba(0, 0, 0, 0.5)' = '$overlay-light'
    'rgba(0, 0, 0, 0.8)' = '$overlay-medium'
    'rgba(0, 0, 0, 0.9)' = '$overlay-dark'
    'rgba(255, 255, 255, 0.1)' = '$overlay-white-light'
    'rgba(255, 255, 255, 0.4)' = '$overlay-white-medium'
    'rgba(255, 255, 255, 0.98)' = '$overlay-white-heavy'
}

$FontSizeReplacements = @{
    'font-size: 11px' = 'font-size: $font-size-xs'
    'font-size: 12px' = 'font-size: $font-size-xs'
    'font-size: 13px' = 'font-size: $font-size-sm'
    'font-size: 14px' = 'font-size: $font-size-sm'
    'font-size: 15px' = 'font-size: $font-size-base'
    'font-size: 16px' = 'font-size: $font-size-base'
    'font-size: 18px' = 'font-size: $font-size-md'
    'font-size: 20px' = 'font-size: $font-size-lg'
    'font-size: 24px' = 'font-size: $font-size-xl'
    'font-size: 32px' = 'font-size: $font-size-2xl'
    'font-size: 40px' = 'font-size: $font-size-3xl'
    'font-size: 48px' = 'font-size: $font-size-4xl'
}

$FontFamilyReplacements = @{
    "font-family: 'Inter'" = 'font-family: $font-body'
    'font-family: "Inter"' = 'font-family: $font-body'
    "font-family: 'DM Sans'" = 'font-family: $font-ui'
    'font-family: "DM Sans"' = 'font-family: $font-ui'
    "font-family: 'TrajanProBold'" = 'font-family: $font-heading-main'
    "font-family: 'trajan-pro-3'" = 'font-family: $font-heading-main'
}

# ============================================================
# FILE PROCESSING
# ============================================================

function Backup-File {
    param([string]$FilePath)
    
    if (Test-Path $FilePath) {
        $RelativePath = $FilePath.Replace($ProjectRoot, "").TrimStart('\')
        $BackupPath = Join-Path $BackupDir $RelativePath
        $BackupFolder = Split-Path $BackupPath -Parent
        
        if (-not (Test-Path $BackupFolder)) {
            New-Item -ItemType Directory -Path $BackupFolder -Force | Out-Null
        }
        
        Copy-Item -Path $FilePath -Destination $BackupPath -Force
    }
}

function Process-SCSSFile {
    param(
        [string]$FilePath,
        [hashtable]$Replacements,
        [string]$Description
    )
    
    Write-Log "Processing: $FilePath - $Description" -Level INFO
    Backup-File -FilePath $FilePath
    
    $Content = Get-Content -Path $FilePath -Raw
    $OriginalContent = $Content
    $ReplacementCount = 0
    
    foreach ($Key in $Replacements.Keys) {
        $Value = $Replacements[$Key]
        $Pattern = [regex]::Escape($Key)
        
        if ($Content -match $Pattern) {
            $Matches = ([regex]::Matches($Content, $Pattern)).Count
            $Content = $Content -replace $Pattern, $Value
            $ReplacementCount += $Matches
        }
    }
    
    if ($Content -ne $OriginalContent) {
        Set-Content -Path $FilePath -Value $Content -NoNewline
        Write-Log "  Replaced $ReplacementCount instances" -Level SUCCESS
        return $ReplacementCount
    }
    
    Write-Log "  No changes needed" -Level WARNING
    return 0
}

function Test-SCSSCompiles {
    Write-Log "Testing SCSS compilation..." -Level INFO
    
    Push-Location $ProjectRoot
    try {
        $Result = npx gulp styles 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Log "SCSS compiled successfully" -Level SUCCESS
            return $true
        } else {
            Write-Log "SCSS compilation failed" -Level ERROR
            Write-Host $Result
            return $false
        }
    }
    finally {
        Pop-Location
    }
}

# ============================================================
# MAIN MIGRATION
# ============================================================

function Main {
    Write-Host ""
    Write-Host "$Cyanâ•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—$Reset"
    Write-Host "$Cyanâ•‘                                                               â•‘$Reset"
    Write-Host "$Cyanâ•‘           PHASE 2: UI KIT MIGRATION AUTOMATION                â•‘$Reset"
    Write-Host "$Cyanâ•‘                                                               â•‘$Reset"
    Write-Host "$Cyanâ•‘  Replacing hardcoded values with design tokens               â•‘$Reset"
    Write-Host "$Cyanâ•‘                                                               â•‘$Reset"
    Write-Host "$Cyanâ•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—$Reset"
    Write-Host ""
    
    # Initialize
    if (Test-Path $LogFile) { Remove-Item $LogFile -Force }
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    
    Write-Log "UI Kit Migration Started" -Level INFO
    Write-Log "Backup Directory: $BackupDir" -Level INFO
    
    $TotalReplacements = 0
    
    # Get all SCSS files (excluding abstracts and new components)
    $SCSSFiles = Get-ChildItem -Path "$ProjectRoot\src\scss" -Filter "*.scss" -Recurse | 
        Where-Object { 
            $_.FullName -notmatch 'abstracts' -and 
            $_.FullName -notmatch 'components\\(_buttons|_cards|_badges|_typography|_loader)' 
        }
    
    Write-Host ""
    Write-Host "$Cyan[STEP 1] Processing Color Replacements$Reset"
    Write-Host "$Cyanâ”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”$Reset"
    
    foreach ($File in $SCSSFiles) {
        $Count = Process-SCSSFile -FilePath $File.FullName `
            -Replacements $ColorReplacements `
            -Description "Colors"
        $TotalReplacements += $Count
    }
    
    Write-Host ""
    Write-Host "$Cyan[STEP 2] Processing RGBA/Overlay Replacements$Reset"
    Write-Host "$Cyanâ”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”$Reset"
    
    foreach ($File in $SCSSFiles) {
        $Count = Process-SCSSFile -FilePath $File.FullName `
            -Replacements $RgbaReplacements `
            -Description "RGBA/Overlays"
        $TotalReplacements += $Count
    }
    
    Write-Host ""
    Write-Host "$Cyan[STEP 3] Processing Font Size Replacements$Reset"
    Write-Host "$Cyanâ”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”$Reset"
    
    foreach ($File in $SCSSFiles) {
        $Count = Process-SCSSFile -FilePath $File.FullName `
            -Replacements $FontSizeReplacements `
            -Description "Font Sizes"
        $TotalReplacements += $Count
    }
    
    Write-Host ""
    Write-Host "$Cyan[STEP 4] Processing Font Family Replacements$Reset"
    Write-Host "$Cyanâ”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”$Reset"
    
    foreach ($File in $SCSSFiles) {
        $Count = Process-SCSSFile -FilePath $File.FullName `
            -Replacements $FontFamilyReplacements `
            -Description "Font Families"
        $TotalReplacements += $Count
    }
    
    Write-Host ""
    Write-Host "$Cyan[STEP 5] Compiling SCSS$Reset"
    Write-Host "$Cyanâ”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”$Reset"
    
    if (-not (Test-SCSSCompiles)) {
        Write-Log "Migration failed - SCSS compilation error" -Level ERROR
        Write-Host ""
        Write-Host "$Redâ•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—$Reset"
        Write-Host "$Redâ•‘  MIGRATION FAILED - Check compilation errors above           â•‘$Reset"
        Write-Host "$Redâ•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•$Reset"
        Write-Host ""
        Write-Host ("{0}Backups available at: {1}{2}" -f $Yellow, $BackupDir, $Reset)
        exit 1
    }
    
    Write-Host ""
    Write-Host "$Greenâ•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—$Reset"
    Write-Host "$Greenâ•‘                                                               â•‘$Reset"
    Write-Host "$Greenâ•‘              MIGRATION COMPLETED SUCCESSFULLY                 â•‘$Reset"
    Write-Host "$Greenâ•‘                                                               â•‘$Reset"
    Write-Host "$Greenâ•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•$Reset"
    Write-Host ""
    Write-Log "Total replacements: $TotalReplacements" -Level SUCCESS
    Write-Host ""
    Write-Host "Total replacements: $TotalReplacements"
    Write-Host "Files processed: $($SCSSFiles.Count)"
    Write-Host "Backup location: $BackupDir"
    Write-Host "Log file: $LogFile"
    Write-Host ""
}

Main

