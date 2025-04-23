# Code Generation Guidelines

## IMPORTANT: ALWAYS WRITE IN ENGLISH - DO NOT USE ANY OTHER LANGUAGE

All code, comments, documentation, and variable names should be in English only.

## Documentation Requirements

- Every function, class, interface, or type must have JSDoc comments
- Include a clear description of the purpose 
- Document all parameters with @param
- Document return values with @return
- Use @async tag for async functions
- Document exceptions with @throws when applicable
- Include @example where helpful

## Function Documentation Template

```typescript
/**
 * Brief description of what the function does
 * 
 * @param {type} paramName - Description of the parameter
 * @param {type} [optionalParam] - Description of optional parameter
 * @returns {returnType} Description of the return value
 * @throws {ErrorType} Description of when this error is thrown
 * @example
 * // Example usage:
 * const result = myFunction('example');
 */
```

## Class Documentation Template

```typescript
/**
 * Brief description of the class's purpose
 * 
 * @class
 * @example
 * const instance = new MyClass();
 * instance.doSomething();
 */
```

## Interface Documentation Template

```typescript
/**
 * Brief description of what this interface represents
 * 
 * @interface
 * @property {type} propertyName - Description of the property
 * @property {type} [optionalProperty] - Description of optional property
 */
```

## Code Style Guidelines

- Use camelCase for variables and functions
- Use PascalCase for classes, interfaces, and types
- Use descriptive and meaningful names
- Keep functions focused on a single responsibility
- Limit function complexity and length
- Use strong typing (avoid 'any' when possible)
- Include proper error handling

## Example of Well-Documented Function

```typescript
/**
 * Authenticates a user with the provided credentials
 * 
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @param {boolean} [rememberMe=false] - Whether to extend the session duration
 * @returns {Promise<User>} The authenticated user object
 * @throws {AuthenticationError} If credentials are invalid
 * @throws {ValidationError} If inputs fail validation
 * @example
 * // Login a user
 * try {
 *   const user = await authenticateUser('user@example.com', 'password123');
 *   console.log(`Logged in as ${user.name}`);
 * } catch (error) {
 *   console.error('Authentication failed:', error.message);
 * }
 */
async function authenticateUser(
  email: string,
  password: string,
  rememberMe: boolean = false
): Promise<User> {
  // Implementation details...
}
```