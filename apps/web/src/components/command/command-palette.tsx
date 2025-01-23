'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useEffect, useState } from 'react'
import { useCreateSnippetContext } from '../snippets/create-snippet-dialog'
import { SearchIcon } from 'lucide-react'
import { DialogTitle } from '@/components/ui/dialog'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const { onOpen: openCreateDialog } = useCreateSnippetContext()
  const router = useRouter()
  const searchParams = useSearchParams()

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

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }
    router.push(`/?${params.toString()}`)
    setOpen(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Command Menu</DialogTitle>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(openCreateDialog)}>
            Create new snippet
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/'))}>
            View all snippets
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Search">
          <CommandItem
            onSelect={() => handleSearch(searchParams.get('q') || '')}
          >
            <SearchIcon className="mr-2 h-4 w-4" />
            Search snippets
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
