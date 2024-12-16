module.exports = {
  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js|jsx)': (filenames) => [
    `pnpm prettier --write ${filenames.join(' ')}`,
    `pnpm eslint ${filenames.join(' ')} --fix`,
  ],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': (filenames) => [
    `pnpm prettier --write ${filenames.join(' ')}`,
  ],
}
