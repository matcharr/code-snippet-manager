import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'

export default [
  js.configs.recommended,
  {
    files: ['apps/web/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
    },
    rules: {
      'react/jsx-key': 'error',
      'react/jsx-no-undef': 'error',
      'no-unused-vars': 'error',
    },
  },
]
