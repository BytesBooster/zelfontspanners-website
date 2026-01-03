# PowerShell Script om Lokale Development Omgeving op te zetten
# Voer uit: .\setup-local-dev.ps1

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Lokale Development Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check of .env.local al bestaat
if (Test-Path ".env.local") {
    Write-Host "[WAARSCHUWING] .env.local bestaat al!" -ForegroundColor Yellow
    $overwrite = Read-Host "Overschrijven? (j/n)"
    if ($overwrite -ne "j") {
        Write-Host "[ERROR] Setup geannuleerd" -ForegroundColor Red
        exit
    }
}

# Maak .env.local bestand
Write-Host "[INFO] Maken van .env.local bestand..." -ForegroundColor Green

$envContent = @"
# Environment Variables voor Lokale Development
# Automatisch gegenereerd door setup-local-dev.ps1

# Supabase Database (gebruik dezelfde als productie voor testing)
NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds

# Cloudinary (optioneel voor image uploads)
CLOUDINARY_CLOUD_NAME=dp9lcxbfu
CLOUDINARY_API_KEY=877964424671325
CLOUDINARY_API_SECRET=jEZWkfFP9CTxvcqHdbuBgaL9tS0

# Development port (standaard 3000)
PORT=3000
"@

$envContent | Set-Content -Path ".env.local" -Encoding UTF8
Write-Host "[OK] .env.local aangemaakt" -ForegroundColor Green

# Vind IP adres
Write-Host ""
Write-Host "[INFO] Zoeken naar IP-adres..." -ForegroundColor Green
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.254.*"}).IPAddress | Select-Object -First 1

if ($ipAddress) {
    Write-Host "[OK] IP-adres gevonden: $ipAddress" -ForegroundColor Green
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "Setup Voltooid!" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Start development server met:" -ForegroundColor Yellow
    Write-Host "  npm run dev:network" -ForegroundColor White
    Write-Host ""
    Write-Host "Toegankelijk op:" -ForegroundColor Yellow
    Write-Host "  - Lokaal: http://localhost:3000" -ForegroundColor White
    Write-Host ("  - Netwerk: http://" + $ipAddress + ":3000") -ForegroundColor White
    Write-Host ""
    Write-Host "Voor meer informatie, zie LOCAL-DEVELOPMENT-SETUP.md" -ForegroundColor Cyan
} else {
    Write-Host "[WAARSCHUWING] Kon IP-adres niet vinden" -ForegroundColor Yellow
    Write-Host "Start development server met: npm run dev:network" -ForegroundColor Yellow
    Write-Host "Check je IP-adres met: ipconfig" -ForegroundColor Yellow
}

Write-Host ""

