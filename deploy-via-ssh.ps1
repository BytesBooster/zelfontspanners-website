# Deploy via SSH Script voor Windows PowerShell
# Vereist: SSH toegang tot server

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Deploy naar Live Server via SSH" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Server configuratie (pas aan indien nodig)
$SERVER_HOST = "185.255.131.147"
$SERVER_USER = "root"
$SERVER_PATH = "/var/www/vhosts/zelfontspanners.nl/nodejs"

Write-Host "Server: $SERVER_USER@$SERVER_HOST" -ForegroundColor Yellow
Write-Host "Path: $SERVER_PATH" -ForegroundColor Yellow
Write-Host ""

# Check of SSH beschikbaar is
$sshAvailable = Get-Command ssh -ErrorAction SilentlyContinue
if (-not $sshAvailable) {
    Write-Host "❌ SSH niet gevonden!" -ForegroundColor Red
    Write-Host "Installeer OpenSSH of gebruik PuTTY." -ForegroundColor Red
    pause
    exit 1
}

Write-Host "✅ SSH gevonden" -ForegroundColor Green
Write-Host ""

# Stap 1: Pull laatste wijzigingen op server
Write-Host "Stap 1: Pull laatste wijzigingen op server..." -ForegroundColor Cyan
ssh "${SERVER_USER}@${SERVER_HOST}" "cd $SERVER_PATH && git pull origin main"

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Git pull had problemen, maar we gaan door..." -ForegroundColor Yellow
}

Write-Host ""

# Stap 2: Run deployment script
Write-Host "Stap 2: Uitvoeren deployment script..." -ForegroundColor Cyan
Write-Host "Dit kan even duren (build proces)..." -ForegroundColor Yellow
Write-Host ""

# Ask user which script to use
Write-Host "Welk script wil je gebruiken?" -ForegroundColor Yellow
Write-Host "1. deploy.sh (normale deployment)" -ForegroundColor Cyan
Write-Host "2. force-clean-rebuild-deploy.sh (force clean rebuild - verwijdert ALLE oude files)" -ForegroundColor Cyan
$scriptChoice = Read-Host "Kies (1 of 2)"

if ($scriptChoice -eq "2") {
    $scriptName = "force-clean-rebuild-deploy.sh"
    Write-Host "⚠️  Force clean rebuild gekozen - dit verwijdert ALLE oude build files!" -ForegroundColor Yellow
} else {
    $scriptName = "deploy.sh"
}

ssh "${SERVER_USER}@${SERVER_HOST}" "cd $SERVER_PATH && chmod +x $scriptName && bash $scriptName"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✅ Deployment succesvol!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Test de website: https://zelfontspanners.nl" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "❌ Deployment gefaald!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Check de foutmelding hierboven." -ForegroundColor Yellow
    Write-Host "Je kunt ook handmatig inloggen:" -ForegroundColor Yellow
    Write-Host "  ssh ${SERVER_USER}@${SERVER_HOST}" -ForegroundColor Cyan
    Write-Host "  cd $SERVER_PATH" -ForegroundColor Cyan
    Write-Host "  bash deploy.sh" -ForegroundColor Cyan
}

Write-Host ""
pause

