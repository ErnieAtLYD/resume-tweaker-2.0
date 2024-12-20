import { NextRequest, NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'

export async function POST(req: NextRequest) {
  const { content } = await req.json()

  const pdfBuffer = await new Promise<Buffer>((resolve) => {
    const doc = new PDFDocument()
    const chunks: Buffer[] = []

    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))

    doc.fontSize(12).text(content, 50, 50)
    doc.end()
  })

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=document.pdf',
    },
  })
}

