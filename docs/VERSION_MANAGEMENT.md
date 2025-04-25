# Version Management Guide

This document provides guidance on how to manage versions in this project.

## Understanding Semantic Versioning (SemVer)

We use semantic versioning in the format `X.Y.Z` where:
- **X** is the major version (breaking changes)
- **Y** is the minor version (new features)
- **Z** is the patch version (bug fixes)

## Important Commands

### Committing Changes

Instead of using regular git commits, use our commit script which enforces conventional commits format:

```bash
npm run commit
```

This will guide you through creating a properly formatted commit message.

### Creating a New Version

To manually create a new version based on your commits:

```bash
npm run release
```

This analyzes your commits and bumps the version accordingly.

### Changing to a Specific Version

To manually set a specific version:

```bash
npm version 1.0.0 --no-git-tag-version
```

Note: This command changes the version without creating a git tag.

## Important Version Behaviors

1. **Development Phase (0.y.z)**
   - During the 0.x.x phase, all commits (including feature commits) only bump the patch (Z) version
   - This is the standard behavior while the API is considered unstable

2. **Stable Phase (≥1.0.0)**
   - Once you reach version 1.0.0, semantic versioning rules are fully applied:
   - `fix:` commits bump the patch version (Z)
   - `feat:` commits bump the minor version (Y)
   - `BREAKING CHANGE:` commits or `feat!:` bump the major version (X)

## GitHub Actions Integration

A GitHub Actions workflow automatically runs `npm run release` when you push to the main branch. This:
1. Updates the version based on your commits
2. Updates CHANGELOG.md with your commit messages
3. Updates the version badge in README.md
4. Updates the version.ts file for display in the UI
5. Creates a GitHub release with the changelog

## Manual Updates

If you need to modify any files to reflect the new version, the `scripts/update-version.js` script can help:

```bash
node scripts/update-version.js
```

This updates the client/src/version.ts file based on the current version in package.json.