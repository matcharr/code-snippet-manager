'use client'

import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { Dialog } from '@/components/ui/dialog'
import { Plus, Home, Search, Settings } from 'lucide-react'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Command className="rounded-lg border shadow-md">
        <Command.Input placeholder="Type a command..." />
        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Group heading="Navigation">
            <Command.Item
              onSelect={() => {
                router.push('/')
                setOpen(false)
              }}
              className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent"
            >
              <Home className="h-4 w-4" />
              Go to Home
            </Command.Item>
            <Command.Item
              onSelect={() => {
                router.push('/search')
                setOpen(false)
              }}
              className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent"
            >
              <Search className="h-4 w-4" />
              Search Snippets
            </Command.Item>
          </Command.Group>
          <Command.Group heading="Actions">
            <Command.Item
              onSelect={() => {
                router.push('/new')
                setOpen(false)
              }}
              className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent"
            >
              <Plus className="h-4 w-4" />
              Create New Snippet
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </Dialog>
  )
}
