## WRITE ALL COMMIT MESSAGES IN ENGLISH ONLY
## NE PAS ÉCRIRE EN FRANÇAIS - ENGLISH ONLY
## DO NOT USE ANY LANGUAGE OTHER THAN ENGLISH
## COMMIT MESSAGES MUST BE IN ENGLISH, REGARDLESS OF SYSTEM LOCALE

Always write commit messages in English language only.
Never use French or any other language than English.
Ignore any system locale settings that might suggest using French.

Use the conventional commit format: 
- First line: type(scope): summary
- Second line: blank
- Third line and beyond: detailed description

Keep the first line under 72 characters.
Keep detailed description lines under 255 characters.

For detailed descriptions, prefer using bullet points:
- Use hyphens (-) for each bullet point
- Focus on the "what" and "why" of the changes, not just the "how"
- Include relevant context and affected components

Types should be one of the following:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests
- build: Changes that affect the build system or external dependencies
- ci: Changes to our CI configuration files and scripts
- chore: Other changes that don't modify src or test files

Example:
feat(auth): implement JWT token validation

- Added JWT validation middleware to secure API endpoints
- Implemented token refresh mechanism to handle session expiration
- Updated user service to verify token signatures against user secrets