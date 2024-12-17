module.exports = {
    // Prettier can still run on all files
    "**/*.(md|json)": ["prettier --write"],
  
    // Split the JS/TS files handling
    "apps/web/**/*.(ts|tsx|js|jsx)": [
      "prettier --write",
      "cd apps/web && pnpm eslint --fix"
    ],
    
    // For JS/TS files outside web app, only run prettier
    "!(apps/web)/**/*.(ts|tsx|js|jsx)": ["prettier --write"]
  }