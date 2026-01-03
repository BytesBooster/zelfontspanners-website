#!/bin/bash
# Script om portfolio afbeeldingen te verwijderen (nu alles base64 in database staat)

echo "=========================================="
echo "Verwijderen Portfolio Afbeeldingen"
echo "=========================================="
echo ""
echo "⚠️  WAARSCHUWING: Dit verwijdert alle portfolio afbeeldingen!"
echo "   Zorg dat alle foto's als base64 in de database staan!"
echo ""
read -p "Doorgaan? (j/n): " confirm

if [ "$confirm" != "j" ]; then
    echo "Geannuleerd."
    exit 0
fi

# Verwijder portfolio images folder
if [ -d "public/images/portfolio" ]; then
    echo "🗑️  Verwijderen public/images/portfolio..."
    rm -rf public/images/portfolio
    echo "✅ public/images/portfolio verwijderd"
else
    echo "⚠️  public/images/portfolio bestaat niet"
fi

# Verwijder ook uit build output als die bestaat
if [ -d ".next/static/images/portfolio" ]; then
    echo "🗑️  Verwijderen .next/static/images/portfolio..."
    rm -rf .next/static/images/portfolio
    echo "✅ .next/static/images/portfolio verwijderd"
fi

if [ -d ".next/standalone/public/images/portfolio" ]; then
    echo "🗑️  Verwijderen .next/standalone/public/images/portfolio..."
    rm -rf .next/standalone/public/images/portfolio
    echo "✅ .next/standalone/public/images/portfolio verwijderd"
fi

echo ""
echo "✅ Klaar! Portfolio afbeeldingen verwijderd."
echo ""
echo "💡 Tip: Voeg toe aan .gitignore om te voorkomen dat ze terugkomen:"
echo "   public/images/portfolio/"

