/**
 * Script om alle statische portfolio foto's te kopiëren naar een map op het bureaublad
 * 
 * Gebruik:
 * npx tsx scripts/move-static-photos.ts
 * 
 * Optioneel: verwijder originele foto's na kopiëren
 * npx tsx scripts/move-static-photos.ts --delete
 */

import { readFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync, unlinkSync } from 'fs'
import { join } from 'path'
import * as path from 'path'

const desktopPath = join(process.env.USERPROFILE || '', 'Desktop')
const targetFolder = join(desktopPath, 'zelfontspanners-statische-fotos')

console.log('🚀 Start kopiëren van statische portfolio foto\'s...\n')
console.log(`📁 Doelmap: ${targetFolder}\n`)

// Lees portfolio-data.js om alle statische foto's te vinden
const portfolioDataPath = join(process.cwd(), 'public', 'portfolio-data.js')
const portfolioDataContent = readFileSync(portfolioDataPath, 'utf-8')

const startIndex = portfolioDataContent.indexOf('const STATIC_PORTFOLIO_DATA')
if (startIndex === -1) {
  console.error('❌ Kon STATIC_PORTFOLIO_DATA niet vinden')
  process.exit(1)
}

const objectStart = portfolioDataContent.indexOf('{', startIndex)
if (objectStart === -1) {
  console.error('❌ Kon object start niet vinden')
  process.exit(1)
}

let bracketCount = 0
let objectEnd = objectStart
for (let i = objectStart; i < portfolioDataContent.length; i++) {
  const char = portfolioDataContent[i]
  if (char === '{') bracketCount++
  if (char === '}') bracketCount--
  if (bracketCount === 0) {
    objectEnd = i + 1
    break
  }
}

const staticDataString = portfolioDataContent.substring(objectStart, objectEnd)
let staticData: any

try {
  const func = new Function(`return ${staticDataString}`)
  staticData = func()
} catch (evalError: any) {
  console.error('❌ Fout bij parsen van portfolio data:', evalError.message)
  process.exit(1)
}

// Maak doelmap aan
if (!existsSync(targetFolder)) {
  mkdirSync(targetFolder, { recursive: true })
  console.log(`✅ Doelmap aangemaakt: ${targetFolder}\n`)
}

let totalCopied = 0
let totalErrors = 0
const errors: string[] = []

// Eerst: kopieer alle foto's uit de portfolio folders (volledige backup)
const portfolioBasePath = join(process.cwd(), 'public', 'images', 'portfolio')
console.log('📁 Kopieer alle foto\'s uit portfolio folders...\n')

if (existsSync(portfolioBasePath)) {
  const memberFolders = readdirSync(portfolioBasePath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  for (const memberFolderName of memberFolders) {
    const sourceMemberFolder = join(portfolioBasePath, memberFolderName)
    const targetMemberFolder = join(targetFolder, memberFolderName)

    // Maak map voor dit lid aan
    if (!existsSync(targetMemberFolder)) {
      mkdirSync(targetMemberFolder, { recursive: true })
    }

    // Kopieer alle bestanden uit deze folder
    try {
      const files = readdirSync(sourceMemberFolder)
      const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file)
      )

      if (imageFiles.length > 0) {
        console.log(`📸 ${memberFolderName}: ${imageFiles.length} foto's`)
        
        for (const file of imageFiles) {
          try {
            const sourcePath = join(sourceMemberFolder, file)
            const targetPath = join(targetMemberFolder, file)
            
            if (existsSync(sourcePath)) {
              copyFileSync(sourcePath, targetPath)
              totalCopied++
            }
          } catch (error: any) {
            errors.push(`${memberFolderName}/${file}: ${error.message}`)
            totalErrors++
          }
        }
      }
    } catch (error: any) {
      errors.push(`${memberFolderName}: ${error.message}`)
      totalErrors++
    }
  }
}

console.log('\n' + '='.repeat(60))
console.log('📊 Resultaten:')
console.log(`  ✅ Succesvol gekopieerd: ${totalCopied}`)
console.log(`  ❌ Fouten: ${totalErrors}`)

console.log('\n' + '='.repeat(60))
console.log('📊 Resultaten:')
console.log(`  ✅ Succesvol gekopieerd: ${totalCopied}`)
console.log(`  ❌ Fouten: ${totalErrors}`)

if (errors.length > 0) {
  console.log('\n⚠️  Eerste 10 fouten:')
  errors.slice(0, 10).forEach(error => console.log(`  - ${error}`))
  if (errors.length > 10) {
    console.log(`  ... en ${errors.length - 10} meer fouten`)
  }
}

console.log(`\n✨ Foto's gekopieerd naar: ${targetFolder}`)

// Optioneel: verwijder originele foto's
const shouldDelete = process.argv.includes('--delete')
if (shouldDelete) {
  console.log('\n🗑️  Verwijder originele foto\'s...')
  let deletedCount = 0
  
  if (existsSync(portfolioBasePath)) {
    const memberFolders = readdirSync(portfolioBasePath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    for (const memberFolderName of memberFolders) {
      const sourceMemberFolder = join(portfolioBasePath, memberFolderName)
      
      try {
        const files = readdirSync(sourceMemberFolder)
        const imageFiles = files.filter(file => 
          /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file)
        )
        
        for (const file of imageFiles) {
          try {
            const filePath = join(sourceMemberFolder, file)
            if (existsSync(filePath)) {
              unlinkSync(filePath)
              deletedCount++
            }
          } catch (error: any) {
            console.error(`  ❌ Fout bij verwijderen ${memberFolderName}/${file}: ${error.message}`)
          }
        }
      } catch (error: any) {
        console.error(`  ❌ Fout bij lezen ${memberFolderName}: ${error.message}`)
      }
    }
  }
  
  console.log(`\n✅ ${deletedCount} originele foto's verwijderd`)
} else {
  console.log('\n💡 Tip: Voeg --delete toe om originele foto\'s te verwijderen na kopiëren')
  console.log('   Voorbeeld: npx tsx scripts/move-static-photos.ts --delete')
}

