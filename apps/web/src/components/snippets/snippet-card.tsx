'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { EditSnippetDialog } from '@/components/snippets/edit-snippet-dialog'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CodeBlock } from '@/components/ui/code-block'

interface SnippetCardProps {
  snippet: {
    id: string
    title: string
    description?: string | null
    language: string
    code: string
    createdAt: Date
  }
  onDelete?: () => void
}

export function SnippetCard({ snippet, onDelete }: SnippetCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation()
    try {
      const response = await fetch(`/api/snippets/${snippet.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete snippet')
      }

      toast({
        title: 'Success',
        description: 'Snippet deleted successfully',
      })

      router.refresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete snippet',
        variant: 'destructive',
      })
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (
      window.getSelection()?.toString() ||
      e.target instanceof HTMLButtonElement ||
      (e.target as HTMLElement).closest('[role="menuitem"]')
    ) {
      return
    }
    router.push(`/snippets/${snippet.id}`)
  }

  return (
    <>
      <Card
        className="transition-shadow hover:shadow-md cursor-pointer"
        onClick={handleClick}
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold select-text">
              {snippet.title}
            </CardTitle>
            <div
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                {snippet.language}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex gap-2">
                    <Pencil className="h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex gap-2 text-destructive focus:text-destructive"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {snippet.description && (
            <p className="text-sm text-muted-foreground mt-1 select-text">
              {snippet.description}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="bg-secondary/50 rounded-md">
            <pre className="p-3 text-xs font-mono overflow-hidden">
              <code>{snippet.code.split('\n')[0]}</code>
            </pre>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>{snippet.language}</span>
            <span>{formatDistanceToNow(new Date(snippet.createdAt))} ago</span>
          </div>
        </CardContent>
      </Card>
      <EditSnippetDialog
        snippet={snippet}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  )
}
