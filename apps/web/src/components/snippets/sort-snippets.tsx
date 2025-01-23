'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation'

export function SortSnippets() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', value)
    router.push(`/?${params.toString()}`)
  }

  return (
    <Select
      defaultValue={searchParams.get('sort') ?? 'newest'}
      onValueChange={handleSort}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest first</SelectItem>
        <SelectItem value="oldest">Oldest first</SelectItem>
        <SelectItem value="title">Title A-Z</SelectItem>
        <SelectItem value="language">Language</SelectItem>
      </SelectContent>
    </Select>
  )
}
