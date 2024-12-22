'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Home, Search, Settings } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { useCreateSnippetContext } from '@/components/snippets/create-snippet-dialog'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'
import { DialogTitle } from '@/components/ui/dialog'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { onOpen: openCreateDialog } = useCreateSnippetContext()

  useKeyboardShortcuts({
    onCreateSnippet: openCreateDialog,
  })

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Command Menu</DialogTitle>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => {
              router.push('/')
              setOpen(false)
            }}
          >
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              router.push('/search')
              setOpen(false)
            }}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Search Snippets</span>
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => {
              openCreateDialog()
              setOpen(false)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>New Snippet</span>
            <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              router.push('/settings')
              setOpen(false)
            }}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
