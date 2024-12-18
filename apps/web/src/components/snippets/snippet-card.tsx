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

  function handleCardClick() {
    router.push(`/snippets/${snippet.id}`)
  }

  return (
    <>
      <Card
        className="transition-shadow hover:shadow-md cursor-pointer"
        onClick={handleCardClick}
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">
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
                  <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={handleDelete}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
      <EditSnippetDialog
        snippet={snippet}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  )
}
