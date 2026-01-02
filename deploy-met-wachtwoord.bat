@echo off
REM Deploy Script met Wachtwoord Prompt
REM Vraagt om SSH wachtwoord en voert deployment uit

echo ========================================
echo Deploy met Wachtwoord - De Zelfontspanners
echo ========================================
echo.

set SERVER_HOST=185.255.131.147
set SERVER_USER=root
set SERVER_PATH=/var/www/vhosts/zelfontspanners.nl/nodejs

REM Stap 1: Lokaal pushen
echo [1/3] Lokaal committen en pushen...
git add . >nul 2>&1
set COMMIT_MSG=Deploy - %date% %time%
git commit -m "%COMMIT_MSG%" >nul 2>&1
git push
if %errorlevel% neq 0 (
    echo Fout bij Git push!
    pause
    exit /b 1
)
echo OK - Code gepusht
echo.

REM Stap 2: Wachtwoord vragen
echo [2/3] SSH verbinding maken...
set /p SSH_PASSWORD="Voer SSH wachtwoord in voor %SERVER_USER%@%SERVER_HOST%: "

REM Stap 3: SSH commando's uitvoeren met wachtwoord
echo [3/3] Deployen op server...

REM Gebruik plink met wachtwoord (als PuTTY geïnstalleerd is)
if exist "C:\Program Files\PuTTY\plink.exe" (
    echo cd %SERVER_PATH% > deploy-commands.txt
    echo git pull >> deploy-commands.txt
    echo chmod +x deploy.sh >> deploy-commands.txt
    echo ./deploy.sh >> deploy-commands.txt
    
    "C:\Program Files\PuTTY\plink.exe" -ssh %SERVER_USER%@%SERVER_HOST% -pw %SSH_PASSWORD% -m deploy-commands.txt
    
    del deploy-commands.txt
) else (
    REM Gebruik sshpass (moet geïnstalleerd zijn) of expect script
    echo SSH client gevonden, maar wachtwoord automatisch doorgeven werkt alleen met PuTTY plink.
    echo.
    echo Voer handmatig uit:
    echo   ssh %SERVER_USER%@%SERVER_HOST%
    echo   cd %SERVER_PATH%
    echo   git pull
    echo   ./deploy.sh
)

echo.
echo Deploy voltooid!
pause

