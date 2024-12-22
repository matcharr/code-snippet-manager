'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/header'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { CommandPalette } from '@/components/command/command-palette'
import {
  CreateSnippetProvider,
  CreateSnippetDialog,
} from '@/components/snippets/create-snippet-dialog'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith('/sign-')

  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={
            isAuthPage ? 'flex min-h-screen items-center justify-center' : ''
          }
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CreateSnippetProvider>
              {!isAuthPage && <Header />}
              {children}
              <CreateSnippetDialog />
              <CommandPalette />
            </CreateSnippetProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
