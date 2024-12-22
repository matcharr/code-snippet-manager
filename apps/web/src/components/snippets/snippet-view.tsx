'use client'

import { formatDistanceToNow } from 'date-fns'
import { CodeBlock } from '@/components/ui/code-block'

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
    <div className="container mx-auto p-4 min-h-[calc(100vh-4rem)]">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold">{snippet.title}</h1>
            {snippet.description && (
              <p className="text-muted-foreground mt-2">
                {snippet.description}
              </p>
            )}
          </div>
          <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-md self-start">
            {snippet.language}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Created {formatDistanceToNow(new Date(snippet.createdAt))} ago
        </p>
      </div>
      <div className="overflow-auto rounded-lg">
        <div className="min-w-full bg-secondary/50 p-4">
          <CodeBlock code={snippet.code} language={snippet.language} />
        </div>
      </div>
    </div>
  )
}
