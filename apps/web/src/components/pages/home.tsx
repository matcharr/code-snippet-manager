'use client'

import { useState } from 'react'
import { SnippetCard } from '@/components/snippets/snippet-card'

interface Snippet {
  id: string
  title: string
  description?: string | null
  language: string
  code: string
  createdAt: Date
}

export function HomePage({ initialSnippets }: { initialSnippets: Snippet[] }) {
  const [snippets, setSnippets] = useState(initialSnippets)

  const handleDelete = (deletedId: string) => {
    setSnippets(snippets.filter((snippet) => snippet.id !== deletedId))
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Code Snippets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {snippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onDelete={() => handleDelete(snippet.id)}
          />
        ))}
      </div>
    </main>
  )
}
