'use client'

import { useUser } from '@clerk/nextjs'

export default function Home() {
  const { user } = useUser()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Code Snippets</h1>
      <p>
        Welcome{user?.username ? `, ${user.username}` : ''}! Let's manage your
        code snippets.
      </p>
    </main>
  )
}
