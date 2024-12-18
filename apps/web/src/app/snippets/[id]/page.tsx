import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { SnippetView } from '@/components/snippets/snippet-view'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function SnippetPage({ params }: PageProps) {
  const { id } = await params

  if (!id) {
    notFound()
  }

  const snippet = await db.snippet.findUnique({
    where: {
      id: id,
    },
  })

  if (!snippet) {
    notFound()
  }

  return <SnippetView snippet={snippet} />
}

export const dynamic = 'force-dynamic'
