# PowerShell Script om Portfolio Afbeeldingen te Downloaden van Server
# Dit download alle portfolio afbeeldingen zodat je lokaal kunt testen

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Download Portfolio Afbeeldingen" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$serverPath = "root@185.255.131.147:/var/www/vhosts/zelfontspanners.nl/nodejs/public/images/portfolio"
$localPath = "public/images/portfolio"

Write-Host "[INFO] Downloaden van portfolio afbeeldingen..." -ForegroundColor Green
Write-Host "Van: $serverPath" -ForegroundColor Yellow
Write-Host "Naar: $localPath" -ForegroundColor Yellow
Write-Host ""

# Check of scp beschikbaar is (meestal via Git Bash of WSL)
if (Get-Command scp -ErrorAction SilentlyContinue) {
    Write-Host "[INFO] Gebruik scp om afbeeldingen te downloaden..." -ForegroundColor Green
    
    # Maak lokale directory aan als deze niet bestaat
    if (-not (Test-Path $localPath)) {
        New-Item -ItemType Directory -Path $localPath -Force | Out-Null
        Write-Host "[OK] Directory aangemaakt: $localPath" -ForegroundColor Green
    }
    
    # Download met scp
    scp -r "$serverPath/*" "$localPath/"
    
    Write-Host ""
    Write-Host "[OK] Download voltooid!" -ForegroundColor Green
} else {
    Write-Host "[WAARSCHUWING] scp niet gevonden!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Opties:" -ForegroundColor Cyan
    Write-Host "1. Gebruik Git Bash (scp is daar beschikbaar)" -ForegroundColor White
    Write-Host "2. Gebruik een SFTP client zoals FileZilla" -ForegroundColor White
    Write-Host "3. Gebruik WSL (Windows Subsystem for Linux)" -ForegroundColor White
    Write-Host ""
    Write-Host "Of accepteer dat afbeeldingen 404 geven tijdens development" -ForegroundColor Yellow
    Write-Host "(functionaliteit werkt nog steeds zonder afbeeldingen)" -ForegroundColor Yellow
}

Write-Host ""

