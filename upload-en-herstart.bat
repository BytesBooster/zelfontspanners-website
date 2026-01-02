@echo off
REM Upload en Herstart Script voor De Zelfontspanners Website
REM Dit script uploadt de code naar de server en herstart de applicatie

echo ========================================
echo De Zelfontspanners - Upload en Herstart
echo ========================================
echo.

REM Configuratie - Pas deze aan naar jouw server instellingen
set SERVER_HOST=185.255.131.147
set SERVER_USER=root
set SERVER_PATH=/var/www/vhosts/zelfontspanners.nl/nodejs
set SSH_KEY_PATH=

REM Kleuren voor output
set GREEN=[92m
set RED=[91m
set YELLOW=[93m
set RESET=[0m

echo %YELLOW%Stap 1: Controleren of Git is geconfigureerd...%RESET%
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo %RED%Git is niet geïnitialiseerd. Initialiseer eerst Git.%RESET%
    pause
    exit /b 1
)

echo %GREEN%Git is geconfigureerd.%RESET%
echo.

echo %YELLOW%Stap 2: Wijzigingen committen...%RESET%
git add .
set /p COMMIT_MSG="Voer commit bericht in (of druk Enter voor standaard): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Update - %date% %time%
git commit -m "%COMMIT_MSG%"
if %errorlevel% neq 0 (
    echo %YELLOW%Geen nieuwe wijzigingen om te committen.%RESET%
)
echo.

echo %YELLOW%Stap 3: Push naar Git repository...%RESET%
git push
if %errorlevel% neq 0 (
    echo %RED%Push gefaald. Controleer je Git configuratie.%RESET%
    pause
    exit /b 1
)
echo %GREEN%Code gepusht naar Git repository.%RESET%
echo.

echo %YELLOW%Stap 4: Verbinden met server en deployen...%RESET%
echo.

REM Check of SSH beschikbaar is voor automatische deploy
set SSH_AVAILABLE=0
if exist "C:\Program Files\PuTTY\plink.exe" set SSH_AVAILABLE=1
where ssh >nul 2>&1
if %errorlevel% equ 0 set SSH_AVAILABLE=1

if %SSH_AVAILABLE% equ 1 (
    echo %YELLOW%SSH client gevonden. Automatisch deployen...%RESET%
    echo.
    
    REM Gebruik OpenSSH als beschikbaar
    where ssh >nul 2>&1
    if %errorlevel% equ 0 (
        echo Verbinden met server en deployen...
        ssh %SERVER_USER%@%SERVER_HOST% "cd %SERVER_PATH% && git pull && chmod +x deploy.sh && ./deploy.sh"
        if %errorlevel% equ 0 (
            echo %GREEN%Deploy succesvol!%RESET%
            goto :end
        )
    )
    
    REM Of gebruik PuTTY plink
    if exist "C:\Program Files\PuTTY\plink.exe" (
        echo Verbinden met server via PuTTY...
        echo cd %SERVER_PATH% > deploy-temp.txt
        echo git pull >> deploy-temp.txt
        echo chmod +x deploy.sh >> deploy-temp.txt
        echo ./deploy.sh >> deploy-temp.txt
        "C:\Program Files\PuTTY\plink.exe" -ssh %SERVER_USER%@%SERVER_HOST% -m deploy-temp.txt
        del deploy-temp.txt
        if %errorlevel% equ 0 (
            echo %GREEN%Deploy succesvol!%RESET%
            goto :end
        )
    )
)

REM Optie 1: Via SSH (als je SSH toegang hebt)
echo %YELLOW%Optie A: Via SSH (handmatig)%RESET%
echo.
echo Je kunt nu handmatig via SSH verbinden:
echo   ssh %SERVER_USER%@%SERVER_HOST%
echo   cd %SERVER_PATH%
echo   git pull
echo   ./deploy.sh
echo.

REM Optie 2: Via WinSCP (als je WinSCP hebt geïnstalleerd)
echo %YELLOW%Optie B: Via WinSCP Script%RESET%
echo.
if exist "C:\Program Files\WinSCP\WinSCP.com" (
    echo WinSCP gevonden. Uploaden via WinSCP...
    "C:\Program Files\WinSCP\WinSCP.com" /script=winscp-upload.txt
    if %errorlevel% equ 0 (
        echo %GREEN%Upload succesvol!%RESET%
    ) else (
        echo %RED%Upload gefaald.%RESET%
    )
) else (
    echo WinSCP niet gevonden. Installeer WinSCP of gebruik SSH.
)
echo.

REM Optie 3: Via Plesk Git (als je Plesk Git hebt geconfigureerd)
echo %YELLOW%Optie C: Via Plesk Git%RESET%
echo.
echo Als je Plesk Git hebt geconfigureerd:
echo 1. Log in op Plesk
echo 2. Ga naar Websites ^& Domains
echo 3. Selecteer zelfontspanners.nl
echo 4. Klik op Git
echo 5. Klik op "Pull now"
echo.

echo ========================================
echo %GREEN%Lokale wijzigingen zijn gepusht naar Git!%RESET%
echo ========================================
echo.
echo %YELLOW%Volgende stappen:%RESET%
echo 1. Log in op je server via SSH
echo 2. Ga naar: %SERVER_PATH%
echo 3. Voer uit: git pull
echo 4. Voer uit: ./deploy.sh
echo.
echo Of gebruik Plesk Git om automatisch te deployen.
echo.

:end
echo.
pause

