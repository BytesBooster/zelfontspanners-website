import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials niet gevonden')
}

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: 'Supabase niet geconfigureerd' },
        { status: 500 }
      )
    }

    // Lees portfolio-data.js om te zien hoeveel statische foto's er zijn
    const portfolioDataPath = join(process.cwd(), 'public', 'portfolio-data.js')
    const portfolioDataContent = readFileSync(portfolioDataPath, 'utf-8')

    const startIndex = portfolioDataContent.indexOf('const STATIC_PORTFOLIO_DATA')
    if (startIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Kon STATIC_PORTFOLIO_DATA niet vinden' },
        { status: 500 }
      )
    }

    const objectStart = portfolioDataContent.indexOf('{', startIndex)
    if (objectStart === -1) {
      return NextResponse.json(
        { success: false, error: 'Kon object start niet vinden' },
        { status: 500 }
      )
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
      return NextResponse.json(
        { success: false, error: `Fout bij parsen: ${evalError.message}` },
        { status: 500 }
      )
    }

    // Tel statische foto's
    let totalStaticPhotos = 0
    const staticPhotosByMember: Record<string, number> = {}
    
    for (const [memberName, memberData] of Object.entries(staticData as any)) {
      const data = memberData as { photos?: any[] }
      if (data && data.photos && Array.isArray(data.photos)) {
        const count = data.photos.length
        staticPhotosByMember[memberName] = count
        totalStaticPhotos += count
      }
    }

    // Normaliseer functie voor URL vergelijking (zelfde als in POST)
    // BELANGRIJK: In de database staan URLs met leading slash (/images/...)
    // We normaliseren door leading slash te verwijderen voor vergelijking
    const normalizeFullUrl = (url: string): string => {
      if (!url) return ''
      // Verwijder protocol en domain als aanwezig
      let normalized = url.replace(/^https?:\/\/[^\/]+/, '')
      // Normaliseer leading/trailing slashes - verwijder alle leading slashes
      normalized = normalized.replace(/^\/+/, '').replace(/\/+$/, '')
      // Lowercase voor case-insensitive vergelijking
      return normalized.toLowerCase()
    }

    // Haal ALLE foto's op uit Supabase (zonder limiet)
    // Supabase heeft standaard een limiet van 1000, dus we moeten pagineren
    let allPhotos: any[] = []
    let from = 0
    const pageSize = 1000
    let hasMore = true
    
    while (hasMore) {
      const { data: photos, error } = await supabase
        .from('portfolio_photos')
        .select('member_name, cloudinary_url, cloudinary_public_id')
        .order('member_name')
        .range(from, from + pageSize - 1)
      
      if (error) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        )
      }
      
      if (photos && photos.length > 0) {
        allPhotos = allPhotos.concat(photos)
        from += pageSize
        hasMore = photos.length === pageSize
      } else {
        hasMore = false
      }
    }

    // Maak een set van alle statische foto URLs (genormaliseerd) voor snelle lookup
    // Voeg beide varianten toe (met en zonder leading slash) voor betere matching
    const staticPhotoUrls = new Set<string>()
    for (const [memberName, memberData] of Object.entries(staticData as any)) {
      const data = memberData as { photos?: any[] }
      if (data && data.photos && Array.isArray(data.photos)) {
        data.photos.forEach((photo: any) => {
          const normalized = normalizeFullUrl(photo.src)
          staticPhotoUrls.add(normalized)
          // Voeg ook variant met leading slash toe (zoals in database)
          if (!normalized.startsWith('/')) {
            staticPhotoUrls.add('/' + normalized)
          }
        })
      }
    }

    // Tel alleen gemigreerde STATISCHE foto's (niet Cloudinary uploads)
    // Een foto is statisch als:
    // 1. De URL NIET begint met "http" (dus lokale URLs zoals /images/portfolio/...)
    //    Dit zijn altijd statische foto's, ongeacht de public_id
    // 2. OF de public_id begint met "static/" (gemigreerde statische foto)
    // 3. OF de URL matcht met een statische foto URL (voor het geval er verschillen zijn)
    const migratedByMember: Record<string, number> = {}
    let totalMigrated = 0
    let totalInDatabase = allPhotos?.length || 0
    let debugInfo: string[] = []

    allPhotos?.forEach((photo) => {
      const cloudinaryUrl = photo.cloudinary_url || ''
      const publicId = photo.cloudinary_public_id || ''
      const normalizedUrl = normalizeFullUrl(cloudinaryUrl)
      
      // Een foto is statisch als:
      // - De URL is lokaal (geen http/https) - dit zijn altijd statische foto's
      //   Dit is de belangrijkste check omdat alle statische foto's lokale URLs hebben
      // - OF de public_id begint met "static/" (gemigreerde statische foto)
      // - OF de URL matcht met een statische foto URL (fallback)
      const isLocalUrl = !cloudinaryUrl.startsWith('http')
      const hasStaticPublicId = publicId.startsWith('static/')
      const matchesStaticUrl = staticPhotoUrls.has(normalizedUrl)
      
      // Prioriteit: lokale URL is het belangrijkste criterium
      const isStaticPhoto = isLocalUrl || hasStaticPublicId || matchesStaticUrl
      
      if (isStaticPhoto) {
        if (!migratedByMember[photo.member_name]) {
          migratedByMember[photo.member_name] = 0
        }
        migratedByMember[photo.member_name]++
        totalMigrated++
      }
    })
    
    // Debug: tel hoeveel foto's van elk type
    let localUrlCount = 0
    let staticPublicIdCount = 0
    let matchesUrlCount = 0
    let cloudinaryUrlCount = 0
    
    allPhotos?.forEach((photo) => {
      const cloudinaryUrl = photo.cloudinary_url || ''
      const publicId = photo.cloudinary_public_id || ''
      const normalizedUrl = normalizeFullUrl(cloudinaryUrl)
      
      if (!cloudinaryUrl.startsWith('http')) localUrlCount++
      if (publicId.startsWith('static/')) staticPublicIdCount++
      if (staticPhotoUrls.has(normalizedUrl)) matchesUrlCount++
      if (cloudinaryUrl.startsWith('http')) cloudinaryUrlCount++
    })
    
    debugInfo.push(`Totaal foto's in database: ${totalInDatabase}`)
    debugInfo.push(`Foto's met lokale URL: ${localUrlCount}`)
    debugInfo.push(`Foto's met static/ public_id: ${staticPublicIdCount}`)
    debugInfo.push(`Foto's die matchen met statische URLs: ${matchesUrlCount}`)
    debugInfo.push(`Foto's met Cloudinary URL: ${cloudinaryUrlCount}`)

    // Bereken voortgang per lid
    const memberProgress = Object.keys(staticPhotosByMember).map(memberName => ({
      memberName,
      staticCount: staticPhotosByMember[memberName],
      migratedCount: migratedByMember[memberName] || 0,
      percentage: Math.round(((migratedByMember[memberName] || 0) / staticPhotosByMember[memberName]) * 100),
    }))

    return NextResponse.json({
      success: true,
      summary: {
        totalStatic: totalStaticPhotos,
        totalMigrated: totalMigrated,
        totalMembers: Object.keys(staticPhotosByMember).length,
        membersMigrated: Object.keys(migratedByMember).length,
        percentage: Math.round((totalMigrated / totalStaticPhotos) * 100),
        debug: {
          totalInDatabase: totalInDatabase,
          localUrlCount: localUrlCount,
          staticPublicIdCount: staticPublicIdCount,
          matchesUrlCount: matchesUrlCount,
          debugInfo: debugInfo,
        },
      },
      members: memberProgress.sort((a, b) => a.memberName.localeCompare(b.memberName)),
    })
  } catch (error: any) {
    console.error('Status error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: 'Supabase niet geconfigureerd' },
        { status: 500 }
      )
    }

    // Lees portfolio-data.js bestand
    const portfolioDataPath = join(process.cwd(), 'public', 'portfolio-data.js')
    const portfolioDataContent = readFileSync(portfolioDataPath, 'utf-8')

    // Extract STATIC_PORTFOLIO_DATA uit het JavaScript bestand
    // Vind het begin van het object
    const startIndex = portfolioDataContent.indexOf('const STATIC_PORTFOLIO_DATA')
    if (startIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Kon STATIC_PORTFOLIO_DATA niet vinden in portfolio-data.js' },
        { status: 500 }
      )
    }

    // Vind het begin van het object (eerste { na STATIC_PORTFOLIO_DATA)
    const objectStart = portfolioDataContent.indexOf('{', startIndex)
    if (objectStart === -1) {
      return NextResponse.json(
        { success: false, error: 'Kon object start niet vinden' },
        { status: 500 }
      )
    }

    // Vind het einde van het object door brackets te tellen
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

    if (bracketCount !== 0) {
      return NextResponse.json(
        { success: false, error: `Kon object einde niet vinden (onbalans: ${bracketCount} brackets)` },
        { status: 500 }
      )
    }

    const staticDataString = portfolioDataContent.substring(objectStart, objectEnd)
    let staticData: any
    
    try {
      // Gebruik Function constructor voor veiligere eval
      const func = new Function(`return ${staticDataString}`)
      staticData = func()
    } catch (evalError: any) {
      console.error('Eval error:', evalError)
      return NextResponse.json(
        { success: false, error: `Fout bij parsen van portfolio data: ${evalError.message}` },
        { status: 500 }
      )
    }

    let totalMigrated = 0
    let totalSkipped = 0
    let totalErrors = 0
    let totalNeedsMigration = 0 // Totaal aantal foto's dat migratie nodig heeft
    const errors: string[] = []
    const skipped: string[] = []
    const debugInfo: string[] = [] // Voor debugging

    // Loop door alle leden
    for (const [memberName, memberData] of Object.entries(staticData as any)) {
      const data = memberData as { photos?: Array<{ src: string; title: string; category?: string }> }
      if (!data || !data.photos || !Array.isArray(data.photos)) {
        continue
      }

      const photos = data.photos

      // Check eerst of er al foto's zijn voor deze lid
      const { data: existingPhotos } = await supabase
        .from('portfolio_photos')
        .select('cloudinary_url, cloudinary_public_id')
        .eq('member_name', memberName)

      // Normaliseer functie voor volledige URL vergelijking
      // We vergelijken het volledige pad omdat verschillende leden dezelfde bestandsnamen kunnen hebben
      // BELANGRIJK: In de database staan URLs met leading slash (/images/...)
      // We moeten beide formaten vergelijken (met en zonder leading slash)
      const normalizeFullUrl = (url: string): string => {
        if (!url) return ''
        // Verwijder protocol en domain als aanwezig
        let normalized = url.replace(/^https?:\/\/[^\/]+/, '')
        // Normaliseer leading slashes - verwijder alle leading slashes voor consistentie
        normalized = normalized.replace(/^\/+/, '').replace(/\/+$/, '')
        // Lowercase voor case-insensitive vergelijking
        return normalized.toLowerCase()
      }
      
      // Maak set van genormaliseerde URLs voor deze specifieke lid
      // Alleen foto's van deze lid worden vergeleken
      // Voeg beide varianten toe (met en zonder leading slash) voor betere matching
      const existingUrls = new Set<string>()
      existingPhotos?.forEach(p => {
        const url = p.cloudinary_url || ''
        const normalized = normalizeFullUrl(url)
        existingUrls.add(normalized)
        // Voeg ook variant met leading slash toe als die niet al bestaat
        if (!normalized.startsWith('/')) {
          existingUrls.add('/' + normalized)
        }
      })
      
      // Debug: toon info voor alle leden
      const existingCount = existingPhotos?.length || 0
      const staticCount = photos.length
      const needsMigration = staticCount - existingCount
      
      // Toon ALTIJD leden die migratie nodig hebben (geen limiet)
      // En toon eerste 30 volledig gemigreerde leden
      if (needsMigration > 0) {
        debugInfo.push(`⚠️ ${memberName}: ${existingCount}/${staticCount} foto's bestaan, ${needsMigration} moeten worden gemigreerd`)
      } else {
        // Tel alleen volledig gemigreerde leden voor de eerste 30
        const completedCount = debugInfo.filter(d => d.startsWith('✅')).length
        if (completedCount < 30) {
          debugInfo.push(`✅ ${memberName}: ${existingCount}/${staticCount} foto's bestaan, 0 moeten worden gemigreerd`)
        }
      }
      
      // Tel op hoeveel foto's er totaal moeten worden gemigreerd
      if (needsMigration > 0) {
        totalNeedsMigration += needsMigration
      }
      
      const existingPublicIds = new Set(existingPhotos?.map(p => p.cloudinary_public_id) || [])

      // Migreer elke foto
      for (let index = 0; index < photos.length; index++) {
        const photo = photos[index]
        
        // Normaliseer statische foto URL voor vergelijking
        const normalizedStaticUrl = normalizeFullUrl(photo.src)
        
        // Check of URL al bestaat voor deze lid (genormaliseerd)
        // Check beide varianten: met en zonder leading slash
        const urlExists = existingUrls.has(normalizedStaticUrl) || 
                         existingUrls.has('/' + normalizedStaticUrl) ||
                         existingUrls.has(normalizedStaticUrl.replace(/^\//, ''))
        
        if (urlExists) {
          totalSkipped++
          if (skipped.length < 10) {
            skipped.push(`${memberName}: "${photo.title}" - URL "${normalizedStaticUrl}" al bestaat`)
          }
          continue
        }
        
        // Deze foto bestaat nog niet - migreer het!
        // Debug: toon eerste paar nieuwe foto's die worden gemigreerd
        if (debugInfo.length < 20 && totalMigrated < 10) {
          debugInfo.push(`✅ ${memberName}: Migreer "${photo.title}" - URL "${normalizedStaticUrl}"`)
        }
        
        // Maak finale URL voor opslag (met leading slash voor relatieve paden)
        const photoUrl = photo.src.startsWith('http') 
          ? photo.src 
          : `/${photo.src.replace(/^\//, '')}`

        try {
          // Voor statische foto's gebruiken we de huidige URL als cloudinary_url
          // en genereren een fake public_id (we kunnen deze later vervangen)
          const fileName = photo.src.split('/').pop() || 'photo.jpg'
          const sanitizedMemberName = memberName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
          // Maak unieke public_id met index om duplicaten te voorkomen
          const fakePublicId = `static/${sanitizedMemberName}/${sanitizedMemberName}-${index}-${fileName.replace(/[^a-z0-9.-]/gi, '_')}`
          
          // Check of public_id al bestaat (skip als het bestaat)
          if (existingPublicIds.has(fakePublicId)) {
            totalSkipped++
            if (skipped.length < 5) {
              skipped.push(`${memberName}: "${photo.title}" - Public ID al bestaat`)
            }
            continue
          }

          const { error } = await supabase
            .from('portfolio_photos')
            .insert([{
              member_name: memberName,
              cloudinary_url: photoUrl,
              cloudinary_public_id: fakePublicId,
              title: photo.title || 'Foto',
              display_order: index,
            }])

          if (error) {
            // Skip duplicate errors
            if (!error.message.includes('duplicate') && !error.message.includes('unique')) {
              errors.push(`${memberName}: ${photo.title} - ${error.message}`)
              totalErrors++
            }
          } else {
            totalMigrated++
          }
        } catch (error: any) {
          errors.push(`${memberName}: ${photo.title} - ${error.message}`)
          totalErrors++
        }
      }
    }

    // Voeg samenvatting toe aan debug info
    debugInfo.push('')
    debugInfo.push(`📊 SAMENVATTING:`)
    const totalStaticCount = Object.values(staticData as any).reduce((sum: number, m: any) => {
      const data = m as { photos?: any[] }
      return sum + (data?.photos?.length || 0)
    }, 0)
    debugInfo.push(`   Totaal statische foto's: ${totalStaticCount}`)
    debugInfo.push(`   Foto's die migratie nodig hebben: ${totalNeedsMigration}`)
    debugInfo.push(`   Foto's gemigreerd deze run: ${totalMigrated}`)
    debugInfo.push(`   Foto's overgeslagen deze run: ${totalSkipped}`)
    
    return NextResponse.json({
      success: true,
      migrated: totalMigrated,
      skipped: totalSkipped,
      errors: totalErrors,
      errorDetails: errors.slice(0, 10), // Eerste 10 errors
      skippedDetails: skipped, // Eerste 5 skipped items voor debugging
      debugInfo: debugInfo, // Debug informatie
      summary: {
        totalNeedsMigration: totalNeedsMigration,
      },
    })
  } catch (error: any) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

