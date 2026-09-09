<#
.SYNOPSIS
    NyayaDraft - Windows 11 PowerShell Local Launcher
.DESCRIPTION
    Checks Node.js environment, installs dependencies if missing,
    ensures .env file is present, and starts the local server.
#>

$ErrorActionPreference = "Stop"

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "      NyayaDraft - AI Legal Drafting for Chambers        " -ForegroundColor Cyan
Write-Host "             Windows 11 PowerShell Launcher             " -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check Node.js
try {
    $nodeVer = & node -v
    Write-Host "[*] Detected Node.js: $nodeVer" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js is not found in PATH." -ForegroundColor Red
    Write-Host "Please install Node.js (v20 or v22 LTS) from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit..."
    exit 1
}

# 2. Check npm
try {
    $npmVer = & npm -v
    Write-Host "[*] Detected npm: $npmVer" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] npm is not found in PATH." -ForegroundColor Red
    Read-Host "Press Enter to exit..."
    exit 1
}

# 3. Handle .env configuration
if (-not (Test-Path ".env")) {
    if (Test-Path ".env.example") {
        Write-Host "[*] Creating .env from .env.example..." -ForegroundColor Yellow
        Copy-Item ".env.example" ".env"
        Write-Host "[*] .env file created. You can edit it to insert your GEMINI_API_KEY." -ForegroundColor Green
    }
}

# 4. Install dependencies if node_modules missing
if (-not (Test-Path "node_modules")) {
    Write-Host "[*] Installing project dependencies (first run)..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] npm install encountered an error." -ForegroundColor Red
        Read-Host "Press Enter to exit..."
        exit 1
    }
}

# 5. Start dev server and launch browser
Write-Host ""
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "[*] Starting local server at http://localhost:3000" -ForegroundColor Green
Write-Host "[*] Press Ctrl+C to stop the server." -ForegroundColor Yellow
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""

# Open default browser after a brief delay
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:3000"
} | Out-Null

# Start server
npm run dev
