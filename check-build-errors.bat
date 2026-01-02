@echo off
REM Check Build Errors Script
REM Test de build lokaal om errors te vinden

echo ========================================
echo Build Errors Checken
echo ========================================
echo.

echo [1/3] Dependencies installeren...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install gefaald!
    pause
    exit /b 1
)
echo OK
echo.

echo [2/3] TypeScript checken...
call npm run lint
if %errorlevel% neq 0 (
    echo WARNING: Lint errors gevonden (maar build kan nog steeds werken)
)
echo.

echo [3/3] Build testen...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo BUILD GEFAALD!
    echo ========================================
    echo.
    echo Controleer de errors hierboven.
    echo Veelvoorkomende oorzaken:
    echo - TypeScript errors
    echo - Missing imports
    echo - Syntax errors
    echo - Missing dependencies
    echo.
    pause
    exit /b 1
) else (
    echo.
    echo ========================================
    echo BUILD SUCCESVOL!
    echo ========================================
    echo.
    echo De build werkt lokaal. Het probleem ligt waarschijnlijk op de server.
    echo.
)

pause


