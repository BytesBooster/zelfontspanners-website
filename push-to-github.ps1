# Script om code naar GitHub te pushen
# Vervang de URL hieronder met jouw GitHub repository URL

$githubUrl = Read-Host "Voer je GitHub repository URL in (bijv. https://github.com/jouwgebruikersnaam/zelfontspanners-website.git)"

if ([string]::IsNullOrWhiteSpace($githubUrl)) {
    Write-Host "Geen URL ingevoerd. Script gestopt." -ForegroundColor Red
    exit
}

Write-Host "`n🔄 GitHub repository koppelen..." -ForegroundColor Cyan

# Voeg remote toe
git remote add origin $githubUrl

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote toegevoegd" -ForegroundColor Green
} else {
    Write-Host "⚠️  Remote bestaat mogelijk al, probeer te updaten..." -ForegroundColor Yellow
    git remote set-url origin $githubUrl
}

Write-Host "`n📤 Code naar GitHub pushen..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Succesvol naar GitHub gepusht!" -ForegroundColor Green
    Write-Host "`nJe kunt nu je code bekijken op: $githubUrl" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Er ging iets mis bij het pushen." -ForegroundColor Red
    Write-Host "Controleer of:" -ForegroundColor Yellow
    Write-Host "  - De GitHub URL correct is" -ForegroundColor Yellow
    Write-Host "  - Je ingelogd bent op GitHub (git credential manager)" -ForegroundColor Yellow
    Write-Host "  - Je toegang hebt tot de repository" -ForegroundColor Yellow
}
