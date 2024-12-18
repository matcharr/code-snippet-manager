import { render, screen } from '@/components/lib/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { Header } from '../index'

// Mock the clerk component
vi.mock('@clerk/nextjs', () => ({
  UserButton: () => <div data-testid="user-button">User Button</div>,
  ClerkProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

// Mock the create snippet dialog
vi.mock('@/components/snippets/create-snippet-dialog', () => ({
  CreateSnippetDialog: () => (
    <div data-testid="create-snippet-dialog">Create Snippet</div>
  ),
}))

describe('Header', () => {
  it('renders the site title', () => {
    render(<Header />)
    expect(screen.getByText('Snippet Manager')).toBeInTheDocument()
  })

  it('renders the user button', () => {
    render(<Header />)
    expect(screen.getByTestId('user-button')).toBeInTheDocument()
  })

  it('renders the create snippet dialog', () => {
    render(<Header />)
    expect(screen.getByTestId('create-snippet-dialog')).toBeInTheDocument()
  })

  it('has a working home link', () => {
    render(<Header />)
    const homeLink = screen.getByText('Snippet Manager')
    expect(homeLink.tagName).toBe('A')
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
