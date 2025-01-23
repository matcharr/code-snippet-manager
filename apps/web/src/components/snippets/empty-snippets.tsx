'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import {
  CreateSnippetDialog,
  useCreateSnippetContext,
} from '@/components/snippets/create-snippet-dialog'

export function EmptySnippets() {
  const { onOpen } = useCreateSnippetContext()

  return (
    <div className="text-center py-10 space-y-4">
      <p className="text-muted-foreground">
        No snippets found. Create your first one!
      </p>
      <Button onClick={onOpen}>
        <PlusIcon className="w-4 h-4 mr-2" />
        Create Snippet
      </Button>
      <CreateSnippetDialog />
    </div>
  )
}
