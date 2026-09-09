@echo off
title NyayaDraft - Local Server (Windows 11)

REM Ensure we run inside the directory where this batch file is located
cd /d "%~dp0"

echo =========================================================
echo       NyayaDraft - AI Legal Drafting for Chambers
echo              Windows 11 Local Launcher
echo =========================================================
echo.

REM Check if user is running directly from an unextracted ZIP file
if not exist "package.json" (
    echo.
    echo =========================================================
    echo [ERROR] package.json not found in this folder!
    echo =========================================================
    echo.
    echo You may have opened start-windows.bat directly from inside a ZIP file.
    echo.
    echo SOLUTION:
    echo 1. Close this window.
    echo 2. Right-click the downloaded ZIP file in Windows Explorer.
    echo 3. Click "Extract All..." and extract to a normal folder (e.g. Desktop).
    echo 4. Open the extracted folder and double-click start-windows.bat.
    echo.
    pause
    exit /b 1
)

REM Check common Node.js install paths if not in PATH yet
where node >nul 2>nul
if %errorlevel% neq 0 (
    if exist "C:\Program Files\nodejs\node.exe" (
        set "PATH=C:\Program Files\nodejs;%PATH%"
    ) else if exist "C:\Program Files (x86)\nodejs\node.exe" (
        set "PATH=C:\Program Files (x86)\nodejs;%PATH%"
    ) else if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" (
        set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"
    )
)

REM Verify Node.js is available
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo =========================================================
    echo [ERROR] Node.js is not found on your Windows laptop!
    echo =========================================================
    echo.
    echo To run NyayaDraft, you need Node.js installed.
    echo 1. Download the LTS version from: https://nodejs.org/
    echo 2. Run the installer (keep default options checked).
    echo 3. Double-click start-windows.bat again.
    echo.
    echo Opening https://nodejs.org in your browser...
    start https://nodejs.org/
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node -v') do set NODE_VERSION=%%v
echo [*] Node.js detected: %NODE_VERSION%

for /f "tokens=*" %%m in ('npm -v') do set NPM_VERSION=%%m
echo [*] npm detected:     %NPM_VERSION%
echo.

REM Create .env from .env.example if missing
if not exist ".env" (
    if exist ".env.example" (
        echo [*] Creating .env configuration file...
        copy /y ".env.example" ".env" >nul
        echo [*] .env file created!
    )
)

REM Install dependencies if node_modules does not exist
if not exist "node_modules" (
    echo [*] First-time setup: Installing dependencies...
    echo [*] This takes about 1-2 minutes, please wait...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] npm install encountered an error.
        pause
        exit /b 1
    )
    echo [*] Dependencies installed successfully!
    echo.
)

echo =========================================================
echo [*] Launching NyayaDraft server on http://localhost:3000
echo [*] Opening browser...
echo [*] (Keep this window open while using the app)
echo =========================================================
echo.

REM Launch browser and server
start http://localhost:3000

call npm run dev:win

if %errorlevel% neq 0 (
    echo.
    echo [NOTE] Trying direct vite runner...
    call npx vite dev --host localhost --port 3000 --open
)

echo.
echo Server has stopped.
pause
