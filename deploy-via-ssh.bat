@echo off
REM Deploy via SSH Script
REM Vereist: SSH toegang en plink.exe (van PuTTY) of OpenSSH

echo ========================================
echo Deploy via SSH
echo ========================================
echo.

set SERVER_HOST=185.255.131.147
set SERVER_USER=root
set SERVER_PATH=/var/www/vhosts/zelfontspanners.nl/nodejs

REM Check of plink bestaat (PuTTY)
if exist "C:\Program Files\PuTTY\plink.exe" (
    set SSH_CMD="C:\Program Files\PuTTY\plink.exe"
    goto :deploy
)

REM Check of OpenSSH bestaat (Windows 10+)
where ssh >nul 2>&1
if %errorlevel% equ 0 (
    set SSH_CMD=ssh
    goto :deploy
)

echo Geen SSH client gevonden!
echo Installeer PuTTY of gebruik Windows OpenSSH.
pause
exit /b 1

:deploy
echo Verbinden met server...
echo.

REM Eerst Git push (lokaal)
echo Stap 1: Push naar Git...
git add .
git commit -m "Deploy - %date% %time%" 2>nul
git push
echo.

REM SSH commando's uitvoeren
echo Stap 2: Deployen op server...
echo.
echo Let op: Je wordt gevraagd om SSH wachtwoord.
echo.

REM Eerst conflicts oplossen, dan deployen
echo Oplossen van mogelijke Git conflicts...
%SSH_CMD% %SERVER_USER%@%SERVER_HOST% "cd %SERVER_PATH% && git stash push -m 'Auto-stash before deploy' 2>/dev/null; git fetch origin; git reset --hard origin/main 2>/dev/null || git reset --hard origin/master 2>/dev/null; git pull origin main 2>/dev/null || git pull origin master 2>/dev/null"

echo.
echo Uitvoeren deploy script...
%SSH_CMD% %SERVER_USER%@%SERVER_HOST% "cd %SERVER_PATH% && chmod +x deploy.sh && ./deploy.sh"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Deploy succesvol!
    echo ========================================
) else (
    echo.
    echo ========================================
    echo Deploy gefaald. Controleer de foutmelding hierboven.
    echo ========================================
)

pause

