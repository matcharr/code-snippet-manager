import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { SnippetView } from '@/components/snippets/snippet-view'

interface PageProps {
  params: {
    id: string
  }
}

export default async function SnippetPage({ params }: PageProps) {
  const snippet = await db.snippet.findUnique({
    where: { id: params.id },
  })

  if (!snippet) {
    notFound()
  }

  return <SnippetView snippet={snippet} />
}
