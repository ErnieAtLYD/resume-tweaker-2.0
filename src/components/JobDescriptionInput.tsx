import InstructionCollapsible from './InstructionCollapsible'

interface JobDescriptionInputProps {
  value: string
  onChange: (value: string) => void
  onBack: () => void
  onNext: () => void
}

export default function JobDescriptionInput({ value, onChange, onBack, onNext }: JobDescriptionInputProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Step 2: Enter Target Job Description (Markdown)</h2>
      <InstructionCollapsible title="How to use this step">
        <p>
          1. Copy and paste the job description of the position you&apos;re applying for into the text area below.<br/>
          2. The job description can be in Markdown or plain text format.<br/> 
          3. Make sure to include all sections from the original posting (e.g., responsibilities, requirements, qualifications).<br/>
          4. Click &ldquo;Optimize&rdquo; when you&apos;re done to generate your optimized resume and cover letter.
        </p>
      </InstructionCollapsible>
      <textarea
        className="w-full h-64 p-2 border rounded mb-4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter the ideal job description in Markdown format"
      />
      <div>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onNext}
          disabled={!value.trim()}
        >
          Optimize
        </button>
      </div>
    </div>
  )
}

