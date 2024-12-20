'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface OptimizedOutputProps {
  title: string
  content: string
  showPDF?: boolean
}

export default function OptimizedOutput({ title, content, showPDF = false }: OptimizedOutputProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const generatePDF = async () => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setPdfUrl(url)
      } else {
        console.error('Failed to generate PDF')
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="border rounded p-2 overflow-auto h-64 mb-2">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      {showPDF && (
        <div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={generatePDF}
          >
            Generate PDF
          </button>
          {pdfUrl && (
            <div className="mt-4">
              <a
                href={pdfUrl}
                download={`${title.toLowerCase().replace(' ', '_')}.pdf`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Download PDF
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

