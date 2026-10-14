@echo off
REM Start app.cmd: double-click this file to download the latest code and start the app.
REM Then scan the QR code with Expo Go on the phone. Close this window to stop the app.
cd /d "%~dp0"

echo === 1/3 Getting the latest version from GitHub...
REM npm sometimes rewrites this file on Windows; throw that away so the download never clashes.
git checkout -- package-lock.json
git pull
if errorlevel 1 (
  echo.
  echo Could not download updates. Copy the text above and send it to Claude.
  pause
  exit /b 1
)

echo === 2/3 Installing building blocks (quick unless something changed)...
call npm install --no-audit --no-fund

echo === 3/3 Starting the app. Scan the QR code with Expo Go.
call npx expo start --tunnel
pause
