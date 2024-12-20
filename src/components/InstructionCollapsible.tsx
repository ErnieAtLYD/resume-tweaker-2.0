'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface InstructionCollapsibleProps {
  title: string
  children: React.ReactNode
}

export default function InstructionCollapsible({ title, children }: InstructionCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4 border rounded">
      <button
        className="flex justify-between items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && <div className="p-2">{children}</div>}
    </div>
  )
}

