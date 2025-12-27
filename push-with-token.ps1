# Script om te pushen met Personal Access Token
# Dit script gebruikt de token direct in de URL

$token = "YOUR_GITHUB_TOKEN_HERE"
$repo = "BytesBooster/zelfontspanners-website"

Write-Host "🔄 Remote URL instellen met token..." -ForegroundColor Cyan

# Stel remote URL in met token
git remote set-url origin "https://$token@github.com/$repo.git"

Write-Host "✅ Remote URL ingesteld" -ForegroundColor Green
Write-Host "`n📤 Code naar GitHub pushen..." -ForegroundColor Cyan

# Push naar GitHub
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Succesvol naar GitHub gepusht!" -ForegroundColor Green
    Write-Host "`n🔄 Remote URL terugzetten naar normale URL..." -ForegroundColor Cyan
    git remote set-url origin "https://github.com/$repo.git"
    Write-Host "✅ Klaar!" -ForegroundColor Green
    Write-Host "`nJe repository staat op: https://github.com/$repo" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Push mislukt. Mogelijke oorzaken:" -ForegroundColor Red
    Write-Host "  - Token heeft geen toegang tot de repository" -ForegroundColor Yellow
    Write-Host "  - Repository bestaat niet of je hebt geen toegang" -ForegroundColor Yellow
    Write-Host "  - Token is verlopen of ongeldig" -ForegroundColor Yellow
    
    # Zet remote URL terug
    git remote set-url origin "https://github.com/$repo.git"
}
