'use client'

import Editor from '@monaco-editor/react'
import { formatDistanceToNow } from 'date-fns'

interface SnippetViewProps {
  snippet: {
    id: string
    title: string
    description?: string | null
    language: string
    code: string
    createdAt: Date
  }
}

export function SnippetView({ snippet }: SnippetViewProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{snippet.title}</h1>
            {snippet.description && (
              <p className="text-muted-foreground mt-2">
                {snippet.description}
              </p>
            )}
          </div>
          <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-md">
            {snippet.language}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Created {formatDistanceToNow(new Date(snippet.createdAt))} ago
        </p>
      </div>
      <Editor
        height="500px"
        language={snippet.language}
        value={snippet.code}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
        }}
      />
    </div>
  )
}
