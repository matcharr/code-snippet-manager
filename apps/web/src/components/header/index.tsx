'use client'

import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CreateSnippetDialog } from '@/components/snippets/create-snippet-dialog'

export function Header() {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          Snippet Manager
        </Link>

        <div className="flex items-center gap-4">
          <CreateSnippetDialog />
          <UserButton />
        </div>
      </nav>
    </header>
  )
}
