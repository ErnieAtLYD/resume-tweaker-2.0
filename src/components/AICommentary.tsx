interface AICommentaryProps {
  commentary: string
}

export default function AICommentary({ commentary }: AICommentaryProps) {
  if (!commentary) return null

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">AI Commentary</h2>
      <div className="border rounded p-2 bg-gray-100">
        <p>{commentary}</p>
      </div>
    </div>
  )
}

