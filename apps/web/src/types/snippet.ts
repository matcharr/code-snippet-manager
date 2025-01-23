import { Snippet as PrismaSnippet, Tag as PrismaTag } from '@prisma/client'

export interface Tag extends PrismaTag {}

export interface Snippet extends PrismaSnippet {
  tags: Tag[]
}
