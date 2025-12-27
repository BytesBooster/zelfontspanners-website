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
    const formData = await request.formData()
    const file = formData.get('file') as File
    const memberName = formData.get('member') as string || formData.get('memberName') as string
    const folder = formData.get('folder') as string
    const title = formData.get('title') as string || ''

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Geen bestand geüpload' },
        { status: 400 }
      )
    }

    // Bepaal folder - gebruik opgegeven folder of portfolio folder
    let uploadFolder = folder
    if (!uploadFolder && memberName) {
      uploadFolder = `zelfontspanners/portfolio/${memberName}`
    } else if (!uploadFolder) {
      uploadFolder = 'zelfontspanners/uploads'
    }

    // Converteer File naar buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload naar Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: uploadFolder,
          resource_type: 'image',
          format: 'jpg',
          quality: 'auto',
          transformation: [
            {
              width: 1920,
              height: 1920,
              crop: 'limit',
              quality: 'auto:good',
              fetch_format: 'auto',
            },
          ],
          // Metadata voor later gebruik
          context: {
            alt: title || file.name,
            caption: title || '',
          },
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    const uploadResult = result as any

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      bytes: uploadResult.bytes,
    })
  } catch (error: any) {
    console.error('Cloudinary upload error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Upload mislukt' },
      { status: 500 }
    )
  }
}

