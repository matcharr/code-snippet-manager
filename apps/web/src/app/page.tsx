import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { SnippetCard } from '@/components/snippets/snippet-card'

interface Snippet {
  id: string
  title: string
  description?: string | null
  language: string
  code: string
  createdAt: Date
}

export default async function Home() {
  const { userId } = await auth()

  const snippets = await db.snippet.findMany({
    where: {
      userId: userId!,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Code Snippets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {snippets.map((snippet: Snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
    </main>
  )
}
