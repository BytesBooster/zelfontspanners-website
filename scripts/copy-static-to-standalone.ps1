# Script om static bestanden naar standalone build te kopiëren
# Dit moet worden uitgevoerd na elke build

Write-Host "📦 Kopieer static bestanden naar standalone build..."

$source = ".next\static"
$dest = ".next\standalone\.next\static"

if (-not (Test-Path $source)) {
    Write-Host "❌ Source directory niet gevonden: $source"
    exit 1
}

# Maak destination directory aan als deze niet bestaat
if (-not (Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest -Force | Out-Null
    Write-Host "✅ Destination directory aangemaakt: $dest"
}

# Kopieer alle bestanden
Copy-Item -Path "$source\*" -Destination $dest -Recurse -Force

Write-Host "✅ Static bestanden gekopieerd naar standalone build"
Write-Host "📁 Bestanden gekopieerd naar: $dest"


