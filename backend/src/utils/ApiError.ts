// backend/src/utils/ApiError.ts

/**
 * @class ApiError
 * @extends Error
 * @description A custom Error class for handling API-specific errors.
 * It standardizes the error response structure across the application.
 */
class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  errors: any[]; // Can be used for validation errors array
  data: any; // Can hold any additional data about the error

  /**
   * @constructor
   * @param {number} statusCode - The HTTP status code for the error.
   * @param {string} message - The error message.
   * @param {any[]} errors - An optional array of validation or other specific errors.
   * @param {string} stack - An optional stack trace.
   */
  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: any[] = [],
    stack = ""
  ) {
    // Call the parent constructor with the message
    super(message);

    // Assign properties
    this.statusCode = statusCode;
    this.data = null; // Standard practice to have data as null in error responses
    this.message = message;
    this.isOperational = true; // Differentiates our errors from unexpected system errors
    this.errors = errors;

    // Capture stack trace if provided, otherwise create a new one
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
