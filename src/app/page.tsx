'use client'

import { useState } from 'react'
import ResumeInput from '@/components/ResumeInput'
import JobDescriptionInput from '@/components/JobDescriptionInput'
import OptimizedOutput from '@/components/OptimizedOutput'
import AICommentary from '@/components/AICommentary'
import InstructionCollapsible from '@/components/InstructionCollapsible'
import { optimizeResume, optimizeCoverLetter } from '@/lib/utils/optimization'

export default function ResumePage() {
  const [step, setStep] = useState(1)
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [optimizedResume, setOptimizedResume] = useState('')
  const [optimizedCoverLetter, setOptimizedCoverLetter] = useState('')
  const [aiCommentary, setAiCommentary] = useState('')

  const handleOptimize = async () => {
    try {
      const optimizedResume = await optimizeResume(resume, jobDescription);
      const optimizedCoverLetter = await optimizeCoverLetter(resume, jobDescription);

      setOptimizedResume(optimizedResume);
      setOptimizedCoverLetter(optimizedCoverLetter);
      setAiCommentary('AI commentary here'); // Update this if needed
      setStep(3);
    } catch (error) {
      console.error("Error optimizing resume and cover letter:", error);
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full max-w-2xl mx-auto">
            <ResumeInput value={resume} onChange={setResume} onNext={() => setStep(2)} />
          </div>
        )
      case 2:
        return (
          <div className="w-full max-w-2xl mx-auto">
            <JobDescriptionInput value={jobDescription} onChange={setJobDescription} onBack={() => setStep(1)} onNext={handleOptimize} />
          </div>
        )
      case 3:
        return (
          <div className="w-full max-w-4xl mx-auto">
            <InstructionCollapsible title="How to use this step">
              <p>
                1. Review your optimized resume and cover letter.<br/>
                2. Read the AI commentary for insights on the optimization process.<br/>
                3. Click &ldquo;Generate PDFs&rdquo; to create downloadable versions of your documents.<br/>
                4. If you want to make changes, click &ldquo;Start Over&rdquo; to begin the process again.
              </p>
            </InstructionCollapsible>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <OptimizedOutput title="Optimized Resume" content={optimizedResume} />
              <OptimizedOutput title="Optimized Cover Letter" content={optimizedCoverLetter} />
            </div>
            <AICommentary commentary={aiCommentary} />
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => setStep(4)}
              >
                Generate PDFs
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setStep(1)}
              >
                Start Over
              </button>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="w-full max-w-4xl mx-auto">
            <InstructionCollapsible title="How to use this step">
              <p>
                1. Click the &ldquo;Generate PDF&rdquo; button for each document you want to download.<br/> 
                2. Once generated, click the &ldquo;Download PDF&rdquo; button to save the file to your device.<br/>
                3. Use the &ldquo;Back to Review&rdquo; button if you want to make changes.<br/>
                4. Click &ldquo;Start Over&rdquo; if you want to begin the entire process again with a new resume and job description.
              </p>
            </InstructionCollapsible>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <OptimizedOutput title="Optimized Resume" content={optimizedResume} showPDF={true} />
              <OptimizedOutput title="Optimized Cover Letter" content={optimizedCoverLetter} showPDF={true} />
            </div>
            <div className="mt-4">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => setStep(3)}
              >
                Back to Review
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setStep(1)}
              >
                Start Over
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Resume Optimizer Wizard</h1>
      <div className="mb-4">
        <div className="flex items-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  step >= i ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {i}
              </div>
              {i < 4 && <div className={`h-1 w-12 ${step > i ? 'bg-blue-500' : 'bg-gray-300'}`} />}
            </div>
          ))}
        </div>
      </div>
      {renderStep()}
    </div>
  )
}

