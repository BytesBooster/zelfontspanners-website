@echo off
REM Eenvoudig Deploy Script
REM Push naar Git en geeft SSH commando's om handmatig uit te voeren

echo ========================================
echo Eenvoudig Deploy Script
echo ========================================
echo.

REM Lokaal committen en pushen
echo [1/2] Lokaal committen en pushen...
git add .
set COMMIT_MSG=Deploy - %date% %time%
git commit -m "%COMMIT_MSG%" 2>nul
git push

if %errorlevel% neq 0 (
    echo.
    echo Fout bij Git push!
    pause
    exit /b 1
)

echo OK - Code gepusht naar Git
echo.

REM SSH commando's tonen
echo [2/2] Kopieer en plak deze commando's in je SSH terminal:
echo.
echo ========================================
echo ssh root@185.255.131.147
echo cd /var/www/vhosts/zelfontspanners.nl/nodejs
echo git pull
echo chmod +x deploy.sh
echo ./deploy.sh
echo ========================================
echo.

REM Optioneel: automatisch SSH openen (als PuTTY geïnstalleerd is)
if exist "C:\Program Files\PuTTY\putty.exe" (
    set /p OPEN_SSH="Wil je PuTTY automatisch openen? (j/n): "
    if /i "%OPEN_SSH%"=="j" (
        "C:\Program Files\PuTTY\putty.exe" -ssh root@185.255.131.147
    )
)

pause


