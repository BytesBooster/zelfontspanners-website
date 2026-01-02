import { NextRequest, NextResponse } from 'next/server'
import { getDbClient, TABLES } from '@/lib/db'

/**
 * API route om portfolio's van portfolio-data.js naar database te migreren
 * 
 * POST /api/migrate-portfolios
 * 
 * Vereist admin rechten
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin rights
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // For now, we'll use a simple admin check
    // In production, use proper JWT verification
    const adminPassword = authHeader.replace('Bearer ', '')
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // This endpoint would need to read portfolio-data.js
    // For security reasons, we'll create a separate script instead
    return NextResponse.json({ 
      message: 'Gebruik het migratiescript: npx tsx scripts/migrate-portfolios-to-db.ts',
      note: 'Dit endpoint is niet geïmplementeerd voor veiligheidsredenen'
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

