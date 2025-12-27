import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configureer Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { publicId } = body

    if (!publicId) {
      return NextResponse.json(
        { success: false, error: 'Public ID ontbreekt' },
        { status: 400 }
      )
    }

    // Verwijder foto van Cloudinary
    const result = await cloudinary.uploader.destroy(publicId)

    if (result.result === 'ok' || result.result === 'not found') {
      return NextResponse.json({
        success: true,
        message: 'Foto verwijderd',
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Verwijderen mislukt' },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Cloudinary delete error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Verwijderen mislukt' },
      { status: 500 }
    )
  }
}



