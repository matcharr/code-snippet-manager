import { Snippet } from '@/types/snippet'
import { EmptySnippets } from './empty-snippets'
import { SnippetCard } from './snippet-card'

export function SnippetGrid({ snippets }: { snippets: Snippet[] }) {
  if (snippets.length === 0) {
    return <EmptySnippets />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  )
}
