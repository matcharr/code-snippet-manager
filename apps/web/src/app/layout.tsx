'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/header'
import './globals.css'

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
          {!isAuthPage && <Header />}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
