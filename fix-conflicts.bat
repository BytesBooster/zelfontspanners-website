@echo off
REM Fix Git Conflicts Script
REM Lost automatisch merge conflicts op op de server

echo ========================================
echo Git Conflicts Oplossen op Server
echo ========================================
echo.

set SERVER_HOST=185.255.131.147
set SERVER_USER=root
set SERVER_PATH=/var/www/vhosts/zelfontspanners.nl/nodejs

REM Check welke SSH client beschikbaar is
set SSH_CMD=
if exist "C:\Program Files\PuTTY\plink.exe" (
    set SSH_CMD="C:\Program Files\PuTTY\plink.exe"
    goto :fix
)

where ssh >nul 2>&1
if %errorlevel% equ 0 (
    set SSH_CMD=ssh
    goto :fix
)

echo Geen SSH client gevonden!
pause
exit /b 1

:fix
echo Uploaden fix-conflicts script naar server...
echo.

REM Upload het fix script
if exist "C:\Program Files\PuTTY\pscp.exe" (
    "C:\Program Files\PuTTY\pscp.exe" deploy-fix-conflicts.sh %SERVER_USER%@%SERVER_HOST%:%SERVER_PATH%/deploy-fix-conflicts.sh
) else (
    echo PSCP niet gevonden. Upload handmatig deploy-fix-conflicts.sh naar server.
    echo.
)

echo Uitvoeren fix script op server...
echo Let op: Je wordt gevraagd om SSH wachtwoord.
echo.

%SSH_CMD% %SERVER_USER%@%SERVER_HOST% "cd %SERVER_PATH% && chmod +x deploy-fix-conflicts.sh && ./deploy-fix-conflicts.sh"

echo.
echo Conflicts opgelost! Je kunt nu deploy-via-ssh.bat opnieuw uitvoeren.
pause


