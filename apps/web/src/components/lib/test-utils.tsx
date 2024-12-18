import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { ClerkProvider } from '@clerk/nextjs'

function render(ui: React.ReactElement, options = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => <ClerkProvider>{children}</ClerkProvider>,
    ...options,
  })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }
