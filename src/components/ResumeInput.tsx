import InstructionCollapsible from './InstructionCollapsible'

interface ResumeInputProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
}

export default function ResumeInput({ value, onChange, onNext }: ResumeInputProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Step 1: Enter Your Resume (Markdown)</h2>
      <InstructionCollapsible title="How to use this step">
        <p>
          1. Enter your resume in the text area below using Markdown format.<br/>
          2. Include sections such as contact information, work experience, education, and skills.<br/>
          3. Use Markdown syntax for formatting (e.g., # for headers, * for bullet points).<br/>
          4. Click &ldquo;Next&rdquo; when you&apos;re done to proceed to the next step.
        </p>
      </InstructionCollapsible>
      <textarea
        className="w-full h-64 p-2 border rounded mb-4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your resume in Markdown format"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onNext}
        disabled={!value.trim()}
      >
        Next
      </button>
    </div>
  )
}

