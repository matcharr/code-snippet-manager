'use client'

import { Check, Copy } from 'lucide-react'
import { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language: string
  theme?: 'dark' | 'light'
}

export function CodeBlock({ code, language, theme = 'dark' }: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load and highlight the code
  useEffect(() => {
    async function highlight() {
      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: theme === 'dark' ? 'github-dark' : 'github-light',
        })
        setHighlightedCode(html)
      } catch (error) {
        console.error('Failed to highlight code:', error)
        setHighlightedCode(`<pre><code>${code}</code></pre>`)
      } finally {
        setIsLoading(false)
      }
    }

    highlight()
  }, [code, language, theme])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group w-full">
      {isLoading ? (
        <div className="animate-pulse h-32 bg-muted rounded-lg" />
      ) : (
        <div
          className={cn(
            'w-full overflow-x-auto rounded-lg',
            '[&_pre]:p-4 [&_pre]:m-0 [&_pre]:min-w-fit',
            '[&_code]:block [&_code]:leading-6',
            'bg-[var(--shiki-bg)]'
          )}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      )}
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={copyToClipboard}
        disabled={isLoading}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}
