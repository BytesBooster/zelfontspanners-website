# Push naar GitHub met Personal Access Token
$token = "YOUR_GITHUB_TOKEN_HERE"
$repo = "BytesBooster/zelfontspanners-website"

Write-Host "🔄 Code naar GitHub pushen..." -ForegroundColor Cyan

# Set remote URL met token
git remote set-url origin "https://$token@github.com/$repo.git"

# Push
Write-Host "📤 Pushing to origin/main..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Succesvol naar GitHub gepusht!" -ForegroundColor Green
    Write-Host "`nRepository: https://github.com/$repo" -ForegroundColor Cyan
    
    # Reset remote URL (zonder token voor veiligheid)
    git remote set-url origin https://github.com/$repo.git
    Write-Host "`n✅ Remote URL gereset (token verwijderd)" -ForegroundColor Green
} else {
    Write-Host "`n❌ Push mislukt. Foutcode: $LASTEXITCODE" -ForegroundColor Red
    Write-Host "`nMogelijke oorzaken:" -ForegroundColor Yellow
    Write-Host "  - Token heeft geen toegang tot repository" -ForegroundColor Yellow
    Write-Host "  - Repository bestaat niet of is privé" -ForegroundColor Yellow
    Write-Host "  - Netwerkprobleem" -ForegroundColor Yellow
    
    # Reset remote URL
    git remote set-url origin "https://github.com/$repo.git"
}
