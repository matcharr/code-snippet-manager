'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'

interface SnippetCardProps {
  snippet: {
    id: string
    title: string
    description?: string | null
    language: string
    code: string
    createdAt: Date
  }
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">
            {snippet.title}
          </CardTitle>
          <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-md">
            {snippet.language}
          </span>
        </div>
        {snippet.description && (
          <p className="text-sm text-muted-foreground mt-1">
            {snippet.description}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto">
          <code className="text-sm font-mono">{snippet.code}</code>
        </pre>
        <p className="text-xs text-muted-foreground mt-4">
          Created {formatDistanceToNow(new Date(snippet.createdAt))} ago
        </p>
      </CardContent>
    </Card>
  )
}
