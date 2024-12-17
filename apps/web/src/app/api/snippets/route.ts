import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { title, language, code } = body

    const snippet = await db.snippet.create({
      data: {
        title,
        language,
        code,
        userId,
      },
    })

    return NextResponse.json(snippet)
  } catch (error) {
    console.error('[SNIPPETS_POST]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
