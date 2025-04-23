/**
 * @file utils/responses/format.response.ts
 * @description HTTP response formatting utilities
 * @author Samad Hatsijev
 */

/**
 * Format an error response object.
 * @param message - The error message to include in the response.
 * @param status - The HTTP status code (default is 500).
 * @returns {object} - The formatted error response object.
 */
export function formatError(message: string, status: number = 500): object {
  return {
    error: {
      message,
      status
    }
  };
}

/**
 * Format a success response object.
 * @param data - The data to include in the response.
 * @param message - Optional success message to include in the response.
 * @param status - The HTTP status code (default is 200).
 * @returns {object} - The formatted success response object.
 */
export function formatSuccess(data: any, message?: string, status: number = 200): object {
  return {
    data,
    message,
    status
  };
}

/**
 * Format a pagination response object.
 * @param data - The data array to include in the response.
 * @param page - Current page number.
 * @param limit - Items per page.
 * @param total - Total number of items.
 * @param status - The HTTP status code (default is 200).
 * @returns {object} - The formatted pagination response object.
 */
export function formatPagination(
  data: any[], 
  page: number, 
  limit: number, 
  total: number, 
  status: number = 200
): object {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    },
    status
  };
}

export default {
  formatError,
  formatSuccess,
  formatPagination
};