@echo off
REM Script om deploy.sh te uploaden en te fixen op de server
REM Dit script uploadt deploy.sh naar de server en geeft het execute permissies

echo ========================================
echo Fix Deploy Script op Server
echo ========================================
echo.

REM Configuratie
set SERVER_HOST=185.255.131.147
set SERVER_USER=root
set SERVER_PATH=/var/www/vhosts/zelfontspanners.nl/nodejs

REM Check of deploy.sh lokaal bestaat
if not exist "deploy.sh" (
    echo ERROR: deploy.sh bestaat niet lokaal!
    echo Maak eerst het deploy.sh script aan.
    pause
    exit /b 1
)

echo [1/3] Controleren Git status...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is niet geïnitialiseerd!
    pause
    exit /b 1
)

echo [2/3] deploy.sh toevoegen aan Git...
git add deploy.sh
git commit -m "Fix deploy.sh script" 2>nul
if %errorlevel% neq 0 (
    echo Geen nieuwe wijzigingen om te committen.
)

echo [3/3] Pushen naar Git...
git push
if %errorlevel% neq 0 (
    echo ERROR: Git push gefaald!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Git Push Compleet
echo ========================================
echo.
echo Nu moet je op de server uitvoeren:
echo   ssh %SERVER_USER%@%SERVER_HOST%
echo   cd %SERVER_PATH%
echo   git pull
echo   chmod +x deploy.sh
echo   bash check-deploy-script.sh
echo.
echo Of voer handmatig uit op de server:
echo   cd %SERVER_PATH%
echo   git pull
echo   chmod +x deploy.sh
echo   ./deploy.sh
echo.

pause


