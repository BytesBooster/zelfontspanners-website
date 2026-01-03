# PowerShell Script om portfolio afbeeldingen te verwijderen
# Nu alles base64 in database staat, zijn deze bestanden niet meer nodig

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Verwijderen Portfolio Afbeeldingen" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "[WAARSCHUWING] Dit verwijdert alle portfolio afbeeldingen!" -ForegroundColor Yellow
Write-Host "   Zorg dat alle foto's als base64 in de database staan!" -ForegroundColor Yellow
Write-Host ""
$confirm = Read-Host "Doorgaan? (j/n)"

if ($confirm -ne "j") {
    Write-Host "[INFO] Geannuleerd." -ForegroundColor Red
    exit
}

# Verwijder portfolio images folder
if (Test-Path "public\images\portfolio") {
    Write-Host "[INFO] Verwijderen public\images\portfolio..." -ForegroundColor Green
    Remove-Item -Recurse -Force "public\images\portfolio"
    Write-Host "[OK] public\images\portfolio verwijderd" -ForegroundColor Green
} else {
    Write-Host "[WAARSCHUWING] public\images\portfolio bestaat niet" -ForegroundColor Yellow
}

# Verwijder ook uit build output als die bestaat
if (Test-Path ".next\static\images\portfolio") {
    Write-Host "[INFO] Verwijderen .next\static\images\portfolio..." -ForegroundColor Green
    Remove-Item -Recurse -Force ".next\static\images\portfolio"
    Write-Host "[OK] .next\static\images\portfolio verwijderd" -ForegroundColor Green
}

if (Test-Path ".next\standalone\public\images\portfolio") {
    Write-Host "[INFO] Verwijderen .next\standalone\public\images\portfolio..." -ForegroundColor Green
    Remove-Item -Recurse -Force ".next\standalone\public\images\portfolio"
    Write-Host "[OK] .next\standalone\public\images\portfolio verwijderd" -ForegroundColor Green
}

Write-Host ""
Write-Host "[OK] Klaar! Portfolio afbeeldingen verwijderd." -ForegroundColor Green
Write-Host ""
Write-Host "[TIP] Voeg toe aan .gitignore om te voorkomen dat ze terugkomen:" -ForegroundColor Cyan
Write-Host "   public/images/portfolio/" -ForegroundColor White

