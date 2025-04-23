/**
 * @file utils/validation/email.validator.ts
 * @description Email validation utilities
 * @author Samad Hatsijev
 */

/**
 * Validates if a string is in a valid email format
 * @param email - Email address to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Checks if an email is from a common disposable email provider
 * @param email - Email address to check
 * @returns {boolean} - True if email is from a disposable provider
 */
function isDisposableEmail(email: string): boolean {
  const disposableDomains = [
    'tempmail.com',
    'throwawaymail.com',
    'mailinator.com',
    'guerrillamail.com',
    'yopmail.com',
    // Add more domains as needed
  ];
  
  const domain = email.split('@')[1]?.toLowerCase();
  return disposableDomains.includes(domain);
}

export {
    isValidEmail,
    isDisposableEmail
}