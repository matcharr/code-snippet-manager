import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    const { id } = await params

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const snippet = await db.snippet.findUnique({
      where: { id },
    })

    if (!snippet) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    if (snippet.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()

    const updatedSnippet = await db.snippet.update({
      where: { id },
      data: {
        title: body.title,
        language: body.language,
        code: body.code,
        description: body.description,
      },
    })

    return NextResponse.json({ data: updatedSnippet })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    const { id } = await params

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const snippet = await db.snippet.findUnique({
      where: { id },
    })

    if (!snippet) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    if (snippet.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await db.snippet.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
