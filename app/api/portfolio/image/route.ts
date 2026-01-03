import { NextRequest, NextResponse } from 'next/server'
import { getDbClient, TABLES } from '@/lib/db'
import fs from 'fs'
import path from 'path'

// GET /api/portfolio/image?src=... - Serve portfolio images
// This endpoint serves images from the server's public folder or returns base64 images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imageSrc = searchParams.get('src')

    if (!imageSrc) {
      return NextResponse.json({ error: 'src parameter is required' }, { status: 400 })
    }

    // If it's base64, return it directly (but we can't serve it via API, so return error)
    if (imageSrc.startsWith('data:image')) {
      return NextResponse.json({ error: 'Base64 images should be used directly in img src' }, { status: 400 })
    }

    // If it's a full URL, redirect to it
    if (imageSrc.startsWith('http')) {
      return NextResponse.redirect(imageSrc)
    }

    // If it's a relative path, try to serve from public folder
    const cleanPath = imageSrc.startsWith('/') ? imageSrc.substring(1) : imageSrc
    const filePath = path.join(process.cwd(), 'public', cleanPath)

    // Check if file exists
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath)
      const ext = path.extname(filePath).toLowerCase()
      
      let contentType = 'image/jpeg'
      if (ext === '.png') contentType = 'image/png'
      if (ext === '.gif') contentType = 'image/gif'
      if (ext === '.webp') contentType = 'image/webp'

      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }

    // File not found
    return NextResponse.json({ error: 'Image not found' }, { status: 404 })
  } catch (error: any) {
    console.error('Error serving portfolio image:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

