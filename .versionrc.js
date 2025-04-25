const fs = require('fs');
const { execSync } = require('child_process');

module.exports = {
  // Types that will appear in the changelog
  types: [
    { type: "feat", section: "Features" },
    { type: "fix", section: "Bug Fixes" },
    { type: "docs", section: "Documentation" },
    { type: "style", section: "Styling" },
    { type: "refactor", section: "Refactors" },
    { type: "perf", section: "Performance" },
    { type: "test", section: "Tests" },
    { type: "chore", hidden: true }
  ],
  // Files to be versioned
  bumpFiles: [
    {
      filename: 'package.json',
      type: 'json'
    }
  ],
  // Files containing the version number
  packageFiles: [
    {
      filename: 'package.json',
      type: 'json'
    }
  ],
  // Scripts to run during the versioning process
  scripts: {
    // Instead of using a function directly, we need to provide a path to a script
    postbump: "node scripts/update-version-files.js"
  }
};