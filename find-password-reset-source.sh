#!/bin/bash
# Find where PasswordResetModal is coming from in the build

cd /var/www/vhosts/zelfontspanners.nl/nodejs || exit 1

echo "=== FINDING PASSWORD RESET MODAL SOURCE ==="
echo ""

echo "🔍 Searching for PasswordResetModal in build..."
grep -r "PasswordResetModal" .next 2>/dev/null | head -10

echo ""
echo "🔍 Searching for PasswordResetGuard in build..."
grep -r "PasswordResetGuard" .next 2>/dev/null | head -10

echo ""
echo "🔍 Checking which files contain these strings..."
echo "Files containing PasswordResetModal:"
grep -rl "PasswordResetModal" .next 2>/dev/null | head -5

echo ""
echo "🔍 Checking source files..."
echo "Searching in app/ directory:"
grep -r "PasswordResetModal" app/ 2>/dev/null || echo "Not found in app/"

echo ""
echo "Searching in components/ directory:"
grep -r "PasswordResetModal" components/ 2>/dev/null || echo "Not found in components/"

echo ""
echo "Searching in lib/ directory:"
grep -r "PasswordResetModal" lib/ 2>/dev/null || echo "Not found in lib/"

echo ""
echo "🔍 Checking for old JS files in public/ or root:"
find . -maxdepth 2 -name "*.js" -type f | grep -v node_modules | grep -v ".next" | head -10

echo ""
echo "🔍 Checking for old HTML files:"
find . -maxdepth 2 -name "*.html" -type f | grep -v node_modules | grep -v ".next" | head -10

