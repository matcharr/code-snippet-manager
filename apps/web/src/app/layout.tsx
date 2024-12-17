'use client'

import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { usePathname } from 'next/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith('/sign-')
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={
            isAuthPage ? 'flex min-h-screen items-center justify-center' : ''
          }
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
