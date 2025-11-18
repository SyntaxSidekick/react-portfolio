#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Automated CSS to SCSS migration script with zero-error handling
.DESCRIPTION
    Executes the CSS cleanup action plan step-by-step with validation,
    backups, and rollback capability. Based on SCSS-AUDIT-REPORT.md Section 14.
.NOTES
    Author: GitHub Copilot
    Date: November 18, 2025
    Branch: css-cleanup-migration
#>

#Requires -Version 5.1

# ============================================================================
# CONFIGURATION
# ============================================================================

$ErrorActionPreference = "Stop"
$ProjectRoot = "c:\xampp\htdocs\riadkilani-react"
$BackupDir = Join-Path $ProjectRoot "backups\css-migration-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
$LogFile = Join-Path $ProjectRoot "css-migration.log"

# ANSI Color Codes
$Red = "`e[31m"
$Green = "`e[32m"
$Yellow = "`e[33m"
$Blue = "`e[34m"
$Magenta = "`e[35m"
$Cyan = "`e[36m"
$Reset = "`e[0m"

# ============================================================================
# LOGGING FUNCTIONS
# ============================================================================

function Write-Log {
    param(
        [string]$Message,
        [ValidateSet('INFO', 'SUCCESS', 'WARNING', 'ERROR', 'STEP')]
        [string]$Level = 'INFO'
    )
    
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogMessage = "[$Timestamp] [$Level] $Message"
    
    # Write to log file
    Add-Content -Path $LogFile -Value $LogMessage
    
    # Write to console with colors
    switch ($Level) {
        'SUCCESS' { Write-Host ("{0}[OK] {1}{2}" -f $Green, $Message, $Reset) }
        'ERROR'   { Write-Host ("{0}[ERROR] {1}{2}" -f $Red, $Message, $Reset) }
        'WARNING' { Write-Host ("{0}[WARN] {1}{2}" -f $Yellow, $Message, $Reset) }
        'STEP'    { Write-Host ("{0}[STEP] {1}{2}" -f $Cyan, $Message, $Reset) }
        default   { Write-Host ("{0}[INFO] {1}{2}" -f $Blue, $Message, $Reset) }
    }
}

function Write-StepHeader {
    param([string]$StepNumber, [string]$Title)
    Write-Host ""
    Write-Host "$Magenta═══════════════════════════════════════════════════════$Reset"
    Write-Host "$Magenta  STEP $StepNumber`: $Title$Reset"
    Write-Host "$Magenta═══════════════════════════════════════════════════════$Reset"
    Write-Log "Starting Step $StepNumber`: $Title" -Level STEP
}

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

function Test-FileExists {
    param([string]$Path)
    if (-not (Test-Path $Path)) {
        Write-Log "File not found: $Path" -Level ERROR
        throw "Required file missing: $Path"
    }
    return $true
}

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
        Write-Log "Backed up: $RelativePath" -Level INFO
        return $BackupPath
    }
    return $null
}

function Test-SCSSCompiles {
    Write-Log "Testing SCSS compilation..." -Level INFO
    
    Push-Location $ProjectRoot
    try {
        $CompileResult = npx gulp styles 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Log "SCSS compiled successfully" -Level SUCCESS
            return $true
        } else {
            Write-Log "SCSS compilation failed: $CompileResult" -Level ERROR
            return $false
        }
    }
    finally {
        Pop-Location
    }
}

function Invoke-GitStatus {
    Push-Location $ProjectRoot
    try {
        $Status = git status --short 2>&1
        return $Status
    }
    finally {
        Pop-Location
    }
}

# ============================================================================
# STEP 1: DELETE CONFLICTING CSS FILES
# ============================================================================

function Step1-DeleteConflictingCSS {
    Write-StepHeader "1" "Delete Conflicting CSS Files"
    
    $FilesToDelete = @(
        "src\index.css",
        "src\App.css",
        "src\components\Skeleton.css",
        "src\components\Loader.css"
    )
    
    $DeletedFiles = @()
    
    foreach ($File in $FilesToDelete) {
        $FullPath = Join-Path $ProjectRoot $File
        
        if (Test-Path $FullPath) {
            # Backup before delete
            Backup-File -FilePath $FullPath
            
            # Delete file
            Remove-Item -Path $FullPath -Force
            $DeletedFiles += $File
            Write-Log "Deleted: $File" -Level SUCCESS
        } else {
            Write-Log "File not found (already deleted?): $File" -Level WARNING
        }
    }
    
    if ($DeletedFiles.Count -eq 0) {
        Write-Log "No files were deleted (already clean)" -Level WARNING
    } else {
        Write-Log "Deleted $($DeletedFiles.Count) CSS files" -Level SUCCESS
    }
    
    return $DeletedFiles
}

# ============================================================================
# STEP 2: UPDATE COMPONENT IMPORTS
# ============================================================================

function Step2-UpdateComponentImports {
    Write-StepHeader "2" "Update Component Imports"
    
    $Updates = @()
    
    # Update Skeleton.jsx
    $SkeletonPath = Join-Path $ProjectRoot "src\components\Skeleton.jsx"
    if (Test-Path $SkeletonPath) {
        Backup-File -FilePath $SkeletonPath
        
        $Content = Get-Content -Path $SkeletonPath -Raw
        $OriginalContent = $Content
        
        # Remove CSS import
        $Content = $Content -replace 'import\s+[''"]\.\/Skeleton\.css[''"];?\s*\r?\n', ''
        
        if ($Content -ne $OriginalContent) {
            Set-Content -Path $SkeletonPath -Value $Content -NoNewline
            Write-Log "Removed CSS import from Skeleton.jsx" -Level SUCCESS
            $Updates += "Skeleton.jsx"
        } else {
            Write-Log "Skeleton.jsx: No CSS import found" -Level WARNING
        }
    }
    
    # Update Loader.jsx
    $LoaderPath = Join-Path $ProjectRoot "src\components\Loader.jsx"
    if (Test-Path $LoaderPath) {
        Backup-File -FilePath $LoaderPath
        
        $Content = Get-Content -Path $LoaderPath -Raw
        $OriginalContent = $Content
        
        # Remove CSS import
        $Content = $Content -replace 'import\s+[''"]\.\/Loader\.css[''"];?\s*\r?\n', ''
        
        if ($Content -ne $OriginalContent) {
            Set-Content -Path $LoaderPath -Value $Content -NoNewline
            Write-Log "Removed CSS import from Loader.jsx" -Level SUCCESS
            $Updates += "Loader.jsx"
        } else {
            Write-Log "Loader.jsx: No CSS import found" -Level WARNING
        }
    }
    
    return $Updates
}

# ============================================================================
# STEP 3: MIGRATE SKELETON.CSS TO SCSS
# ============================================================================

function Step3-MigrateSkeletonSCSS {
    Write-StepHeader "3" "Migrate Skeleton.css to SCSS"
    
    $SkeletonSCSSPath = Join-Path $ProjectRoot "src\scss\base\_skeleton.scss"
    Test-FileExists -Path $SkeletonSCSSPath
    
    Backup-File -FilePath $SkeletonSCSSPath
    
    $NewContent = @'
/**
 * Partial: _skeleton.scss
 * Purpose: Loading skeleton animation with variables
 * Features: Shimmer effect, responsive sizing
 * Usage: Global loading states
 * Dependencies: Uses variables from _variables.scss
 */
@use '../abstracts/variables' as *;

.skeleton {
  background: linear-gradient(
    90deg,
    $progress-bg 25%,
    lighten($progress-bg, 3%) 50%,
    $progress-bg 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.2s infinite linear;
  border-radius: $radius-lg;  // 8px
  margin-bottom: $margin-sm;  // 8px
  
  &.skeleton-text {
    height: 1em;
    margin-bottom: $margin-xs;  // 4px
  }
  
  &.skeleton-title {
    height: 1.5em;
    margin-bottom: $margin-md;  // 12px
  }
  
  &.skeleton-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  
  &.skeleton-image {
    width: 100%;
    height: 200px;
    border-radius: $radius;  // 4px
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
'@
    
    Set-Content -Path $SkeletonSCSSPath -Value $NewContent -NoNewline
    Write-Log "Updated _skeleton.scss with variables" -Level SUCCESS
    
    return $true
}

# ============================================================================
# STEP 4: CREATE LOADER SCSS
# ============================================================================

function Step4-CreateLoaderSCSS {
    Write-StepHeader "4" "Create Loader SCSS"
    
    $LoaderSCSSPath = Join-Path $ProjectRoot "src\scss\components\_loader.scss"
    
    # Backup if exists
    if (Test-Path $LoaderSCSSPath) {
        Backup-File -FilePath $LoaderSCSSPath
    }
    
    $NewContent = @'
/**
 * Partial: _loader.scss
 * Purpose: Loading spinner and message styles
 * Features: Spinner animation, loader container
 * Usage: Import in style.scss
 * Dependencies: Uses variables from _variables.scss
 */
@use '../abstracts/variables' as *;

.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  width: 100%;
}

.loader-spinner {
  width: 48px;
  height: 48px;
  border: 5px solid $progress-bg;
  border-top: 5px solid $accent-purple;  // Purple spinner
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: $margin-lg;  // 16px
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader-message {
  font-size: 1.1em;
  color: $text-muted;  // #595959
  font-family: $font-alt;
}
'@
    
    Set-Content -Path $LoaderSCSSPath -Value $NewContent -NoNewline
    Write-Log "Created _loader.scss" -Level SUCCESS
    
    # Add import to style.scss
    $StyleSCSSPath = Join-Path $ProjectRoot "src\scss\style.scss"
    Test-FileExists -Path $StyleSCSSPath
    Backup-File -FilePath $StyleSCSSPath
    
    $StyleContent = Get-Content -Path $StyleSCSSPath -Raw
    
    # Check if import already exists
    if ($StyleContent -notmatch "@use 'components/loader'") {
        # Find the components section and add import
        $StyleContent = $StyleContent -replace "(\/\/ Components.*?\r?\n)", "`$1@use 'components/loader';`n"
        Set-Content -Path $StyleSCSSPath -Value $StyleContent -NoNewline
        Write-Log "Added loader import to style.scss" -Level SUCCESS
    } else {
        Write-Log "Loader import already exists in style.scss" -Level WARNING
    }
    
    return $true
}

# ============================================================================
# STEP 5: ADD MISSING VARIABLES
# ============================================================================

function Step5-AddMissingVariables {
    Write-StepHeader "5" "Add Missing Variables"
    
    $VariablesPath = Join-Path $ProjectRoot "src\scss\abstracts\_variables.scss"
    Test-FileExists -Path $VariablesPath
    Backup-File -FilePath $VariablesPath
    
    $Content = Get-Content -Path $VariablesPath -Raw
    
    # Check if $accent-purple exists
    if ($Content -notmatch '\$accent-purple') {
        # Find the accent colors section and add it
        $NewVariable = "`n// Accent Colors`n`$accent-purple: #8e24aa;`n"
        
        # Add after primary colors section
        $Content = $Content -replace "(\`$primary-dark:.*?;)", "`$1$NewVariable"
        
        Set-Content -Path $VariablesPath -Value $Content -NoNewline
        Write-Log "Added `$accent-purple variable" -Level SUCCESS
    } else {
        Write-Log "`$accent-purple already exists" -Level WARNING
    }
    
    return $true
}

# ============================================================================
# STEP 6: UPDATE SKIP-LINK SCSS
# ============================================================================

function Step6-UpdateSkipLinkSCSS {
    Write-StepHeader "6" "Update Skip-Link SCSS"
    
    $SkipLinkPath = Join-Path $ProjectRoot "src\scss\utils\_skip-link.scss"
    
    if (-not (Test-Path $SkipLinkPath)) {
        Write-Log "Skip-link SCSS not found, skipping..." -Level WARNING
        return $false
    }
    
    Backup-File -FilePath $SkipLinkPath
    
    $NewContent = @'
/**
 * Partial: _skip-link.scss
 * Purpose: Accessibility skip-to-main-content link
 * Features: Hidden until focused, smooth transitions
 * Usage: Global header/navigation
 * Dependencies: Uses variables from _variables.scss
 */
@use '../abstracts/variables' as *;

.skip-link {
  position: absolute;
  left: -999px;
  top: 0;
  width: auto;
  min-width: 160px;
  height: auto;
  overflow: hidden;
  z-index: 10000;
  background: $primary;  // #0073aa instead of #2563eb
  color: $text-white;
  padding: $padding-md $padding-xxxl;  // 12px 28px
  border-radius: 0 0 $radius-lg $radius-lg;  // 8px
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.03em;
  box-shadow:
    0 4px 16px rgba($primary, 0.18),
    0 2px 8px rgba(0, 0, 0, 0.08);
  border: none;
  opacity: 0.95;
  transition: left 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s;

  &:focus {
    left: 0;
    opacity: 1;
    box-shadow:
      0 8px 24px rgba($primary, 0.25),
      0 4px 12px rgba(0, 0, 0, 0.12);
  }

  &:hover {
    background: $primary-dark;
  }

  &:active {
    background: darken($primary, 10%);
  }
}
'@
    
    Set-Content -Path $SkipLinkPath -Value $NewContent -NoNewline
    Write-Log "Updated _skip-link.scss with variables" -Level SUCCESS
    
    return $true
}

# ============================================================================
# STEP 7: COMPILE SCSS
# ============================================================================

function Step7-CompileSCSS {
    Write-StepHeader "7" "Compile SCSS"
    
    if (Test-SCSSCompiles) {
        Write-Log "SCSS compilation successful" -Level SUCCESS
        return $true
    } else {
        Write-Log "SCSS compilation failed - check errors above" -Level ERROR
        return $false
    }
}

# ============================================================================
# STEP 8: VALIDATION
# ============================================================================

function Step8-Validation {
    Write-StepHeader "8" "Validation"
    
    $ValidationPassed = $true
    
    # Check deleted files don't exist
    $FilesToDelete = @(
        "src\index.css",
        "src\App.css",
        "src\components\Skeleton.css",
        "src\components\Loader.css"
    )
    
    foreach ($File in $FilesToDelete) {
        $FullPath = Join-Path $ProjectRoot $File
        if (Test-Path $FullPath) {
            Write-Log "FAIL: File still exists: $File" -Level ERROR
            $ValidationPassed = $false
        } else {
            Write-Log "PASS: File deleted: $File" -Level SUCCESS
        }
    }
    
    # Check SCSS files exist
    $RequiredSCSS = @(
        "src\scss\base\_skeleton.scss",
        "src\scss\components\_loader.scss",
        "src\scss\abstracts\_variables.scss"
    )
    
    foreach ($File in $RequiredSCSS) {
        $FullPath = Join-Path $ProjectRoot $File
        if (Test-Path $FullPath) {
            Write-Log "PASS: SCSS exists: $File" -Level SUCCESS
        } else {
            Write-Log "FAIL: SCSS missing: $File" -Level ERROR
            $ValidationPassed = $false
        }
    }
    
    # Check compiled CSS exists
    $CompiledCSS = Join-Path $ProjectRoot "src\css\style.css"
    if (Test-Path $CompiledCSS) {
        Write-Log "PASS: Compiled CSS exists" -Level SUCCESS
    } else {
        Write-Log "FAIL: Compiled CSS missing" -Level ERROR
        $ValidationPassed = $false
    }
    
    # Check for import statements in components
    $SkeletonPath = Join-Path $ProjectRoot "src\components\Skeleton.jsx"
    if (Test-Path $SkeletonPath) {
        $Content = Get-Content -Path $SkeletonPath -Raw
        if ($Content -match 'import.*Skeleton\.css') {
            Write-Log "FAIL: Skeleton.jsx still imports Skeleton.css" -Level ERROR
            $ValidationPassed = $false
        } else {
            Write-Log "PASS: Skeleton.jsx CSS import removed" -Level SUCCESS
        }
    }
    
    $LoaderPath = Join-Path $ProjectRoot "src\components\Loader.jsx"
    if (Test-Path $LoaderPath) {
        $Content = Get-Content -Path $LoaderPath -Raw
        if ($Content -match 'import.*Loader\.css') {
            Write-Log "FAIL: Loader.jsx still imports Loader.css" -Level ERROR
            $ValidationPassed = $false
        } else {
            Write-Log "PASS: Loader.jsx CSS import removed" -Level SUCCESS
        }
    }
    
    return $ValidationPassed
}

# ============================================================================
# STEP 9: GIT COMMIT
# ============================================================================

function Step9-GitCommit {
    Write-StepHeader "9" "Git Commit"
    
    Push-Location $ProjectRoot
    try {
        # Check git status
        $Status = Invoke-GitStatus
        
        if ([string]::IsNullOrWhiteSpace($Status)) {
            Write-Log "No changes to commit" -Level WARNING
            return $false
        }
        
        Write-Host ("{0}Current changes:{1}" -f $Yellow, $Reset)
        Write-Host $Status
        Write-Host ""
        
        # Stage all changes
        git add -A
        Write-Log "Staged all changes" -Level SUCCESS
        
        # Commit
        $CommitMessage = @"
CSS cleanup and migration to SCSS architecture

- Deleted 4 conflicting CSS files (index.css, App.css, Skeleton.css, Loader.css)
- Removed CSS imports from Skeleton.jsx and Loader.jsx
- Migrated Skeleton.css to _skeleton.scss with variables
- Created _loader.scss with $accent-purple variable
- Updated _skip-link.scss to use $primary variable
- Added $accent-purple to _variables.scss
- All styles now use SCSS variable system
- SCSS compilation verified successful
"@
        
        git commit -m $CommitMessage
        Write-Log "Committed changes successfully" -Level SUCCESS
        
        return $true
    }
    finally {
        Pop-Location
    }
}

# ============================================================================
# MAIN EXECUTION
# ============================================================================

function Main {
    Write-Host ""
    Write-Host "$Magenta╔═══════════════════════════════════════════════════════════════╗$Reset"
    Write-Host "$Magenta║                                                               ║$Reset"
    Write-Host "$Magenta║           CSS TO SCSS MIGRATION AUTOMATION SCRIPT             ║$Reset"
    Write-Host "$Magenta║                                                               ║$Reset"
    Write-Host "$Magenta║  This script will execute the CSS cleanup action plan        ║$Reset"
    Write-Host "$Magenta║  from SCSS-AUDIT-REPORT.md Section 14 with zero errors       ║$Reset"
    Write-Host "$Magenta║                                                               ║$Reset"
    Write-Host "$Magenta╚═══════════════════════════════════════════════════════════════╝$Reset"
    Write-Host ""
    
    # Initialize log
    if (Test-Path $LogFile) {
        Remove-Item $LogFile -Force
    }
    
    Write-Log "CSS Migration Started" -Level INFO
    Write-Log "Project Root: $ProjectRoot" -Level INFO
    Write-Log "Backup Directory: $BackupDir" -Level INFO
    
    try {
        # Create backup directory
        New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
        Write-Log "Created backup directory" -Level SUCCESS
        
        # Execute steps
        $Step1Result = Step1-DeleteConflictingCSS
        $Step2Result = Step2-UpdateComponentImports
        $Step3Result = Step3-MigrateSkeletonSCSS
        $Step4Result = Step4-CreateLoaderSCSS
        $Step5Result = Step5-AddMissingVariables
        $Step6Result = Step6-UpdateSkipLinkSCSS
        $Step7Result = Step7-CompileSCSS
        
        if (-not $Step7Result) {
            throw "SCSS compilation failed - migration aborted"
        }
        
        $ValidationResult = Step8-Validation
        
        if (-not $ValidationResult) {
            throw "Validation failed - please review errors above"
        }
        
        $CommitResult = Step9-GitCommit
        
        # Final summary
        Write-Host ""
        Write-Host ("{0}SUCCESS: Migration Completed Successfully{1}" -f $Green, $Reset)
        Write-Host ""
        Write-Log "Migration completed successfully" -Level SUCCESS
        Write-Host ("{0}Backup location: {1}{2}" -f $Cyan, $BackupDir, $Reset)
        Write-Host ("{0}Log file: {1}{2}" -f $Cyan, $LogFile, $Reset)
        Write-Host ""
        
    } catch {
        Write-Host ""
        Write-Host ("{0}ERROR: Migration Failed{1}" -f $Red, $Reset)
        Write-Host ""
        Write-Log "Migration failed: $_" -Level ERROR
        Write-Host ("{0}Backups are available at: {1}{2}" -f $Yellow, $BackupDir, $Reset)
        Write-Host "Review log file: $LogFile" -ForegroundColor Yellow
        Write-Host ""
        exit 1
    }
}

# Run main function
Main
