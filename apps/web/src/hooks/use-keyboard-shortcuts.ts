import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type ShortcutHandlers = {
  onCreateSnippet?: () => void
}

export function useKeyboardShortcuts({ onCreateSnippet }: ShortcutHandlers) {
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'k':
            e.preventDefault()
            // We'll handle this in the component
            break
          case 'h':
            e.preventDefault()
            router.push('/')
            break
          case 'f':
            e.preventDefault()
            router.push('/search')
            break
          case 'i':
            e.preventDefault()
            onCreateSnippet?.()
            break
          case ',':
            e.preventDefault()
            router.push('/settings')
            break
        }
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [router, onCreateSnippet])
}
