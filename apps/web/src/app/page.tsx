import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { SnippetSkeleton } from '@/components/snippets/snippet-skeleton'
import { Suspense } from 'react'
import { SearchSnippets } from '@/components/search/search-snippets'
import { SortSnippets } from '@/components/snippets/sort-snippets'
import { SnippetGrid } from '@/components/snippets/snippet-grid'
import { Snippet } from '@/types/snippet'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>
}) {
  const { userId } = await auth()
  const params = await searchParams
  const query = params.q
  const sort = params.sort ?? 'newest'

  if (!userId) {
    return null
  }

  const snippets = (await db.snippet.findMany({
    where: {
      userId,
      OR: query
        ? [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { code: { contains: query, mode: 'insensitive' } },
          ]
        : undefined,
    },
    orderBy: {
      ...(sort === 'newest' && { createdAt: 'desc' }),
      ...(sort === 'oldest' && { createdAt: 'asc' }),
      ...(sort === 'title' && { title: 'asc' }),
      ...(sort === 'language' && { language: 'asc' }),
    },
    include: {
      tags: true,
    },
  })) satisfies Snippet[]

  return (
    <main className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">My Code Snippets</h1>
        <div className="flex items-center gap-4">
          <SortSnippets />
          <SearchSnippets />
        </div>
      </div>
      <Suspense fallback={<SnippetSkeleton />}>
        <SnippetGrid snippets={snippets} />
      </Suspense>
    </main>
  )
}
