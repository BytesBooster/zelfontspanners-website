@echo off
REM Automatisch Deploy Script
REM Logt in op SSH, voert git pull uit en herstart de server

echo ========================================
echo Automatisch Deploy - De Zelfontspanners
echo ========================================
echo.

REM Configuratie
set SERVER_HOST=185.255.131.147
set SERVER_USER=root
set SERVER_PATH=/var/www/vhosts/zelfontspanners.nl/nodejs
set PM2_APP_NAME=zelfontspanners

REM Kleuren
set GREEN=[92m
set RED=[91m
set YELLOW=[93m
set RESET=[0m

echo %YELLOW%Stap 1: Lokaal committen en pushen...%RESET%

REM Git status checken
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo %RED%Git is niet geïnitialiseerd!%RESET%
    pause
    exit /b 1
)

REM Wijzigingen toevoegen
git add .
if %errorlevel% neq 0 (
    echo %RED%Git add gefaald!%RESET%
    pause
    exit /b 1
)

REM Commit (met standaard bericht als geen input)
set COMMIT_MSG=Deploy - %date% %time%
git commit -m "%COMMIT_MSG%" 2>nul
if %errorlevel% neq 0 (
    echo %YELLOW%Geen nieuwe wijzigingen om te committen.%RESET%
) else (
    echo %GREEN%Wijzigingen gecommit.%RESET%
)

REM Push naar Git
echo %YELLOW%Pushen naar Git repository...%RESET%
git push
if %errorlevel% neq 0 (
    echo %RED%Push gefaald! Controleer je Git configuratie.%RESET%
    pause
    exit /b 1
)
echo %GREEN%Code gepusht naar Git.%RESET%
echo.

echo %YELLOW%Stap 2: Verbinden met server en deployen...%RESET%
echo.

REM Check welke SSH client beschikbaar is
set SSH_CMD=
set USE_PLINK=0

REM Check voor PuTTY plink
if exist "C:\Program Files\PuTTY\plink.exe" (
    set SSH_CMD="C:\Program Files\PuTTY\plink.exe"
    set USE_PLINK=1
    echo %GREEN%PuTTY gevonden.%RESET%
    goto :deploy
)

REM Check voor OpenSSH (Windows 10+)
where ssh >nul 2>&1
if %errorlevel% equ 0 (
    set SSH_CMD=ssh
    set USE_PLINK=0
    echo %GREEN%OpenSSH gevonden.%RESET%
    goto :deploy
)

REM Geen SSH client gevonden
echo %RED%Geen SSH client gevonden!%RESET%
echo.
echo Installeer een van de volgende:
echo - PuTTY: https://www.putty.org/
echo - OpenSSH (Windows 10+): Installeer via Windows Features
echo.
pause
exit /b 1

:deploy
echo.
echo %YELLOW%Verbinding maken met %SERVER_USER%@%SERVER_HOST%...%RESET%
echo.

REM SSH commando's die uitgevoerd moeten worden
set SSH_COMMANDS=cd %SERVER_PATH% ^&^& git pull ^&^& chmod +x deploy.sh ^&^& ./deploy.sh

if %USE_PLINK% equ 1 (
    REM PuTTY plink gebruiken
    echo %YELLOW%Gebruik PuTTY plink. Je wordt gevraagd om wachtwoord.%RESET%
    echo.
    %SSH_CMD% -ssh %SERVER_USER%@%SERVER_HOST% -pw -m - "%SSH_COMMANDS%"
    
    REM Alternatief met interactieve login
    echo.
    echo %YELLOW%Als bovenstaande niet werkt, gebruik dan deze commando's handmatig:%RESET%
    echo %SSH_CMD% -ssh %SERVER_USER%@%SERVER_HOST%
    echo cd %SERVER_PATH%
    echo git pull
    echo chmod +x deploy.sh
    echo ./deploy.sh
) else (
    REM OpenSSH gebruiken
    echo %YELLOW%Gebruik OpenSSH. Je wordt gevraagd om wachtwoord.%RESET%
    echo.
    %SSH_CMD% %SERVER_USER%@%SERVER_HOST% "cd %SERVER_PATH% && git pull && chmod +x deploy.sh && ./deploy.sh"
)

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo %GREEN%Deploy succesvol voltooid!%RESET%
    echo ========================================
    echo.
    echo De applicatie is geüpdatet en herstart.
    echo Check de status met: pm2 status
) else (
    echo.
    echo ========================================
    echo %RED%Deploy gefaald!%RESET%
    echo ========================================
    echo.
    echo Mogelijke oorzaken:
    echo - SSH verbinding gefaald
    echo - Wachtwoord incorrect
    echo - Git pull gefaald
    echo - Deploy script heeft errors
    echo.
    echo Probeer handmatig:
    echo   ssh %SERVER_USER%@%SERVER_HOST%
    echo   cd %SERVER_PATH%
    echo   git pull
    echo   ./deploy.sh
)

echo.
pause

