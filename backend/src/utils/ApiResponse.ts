// backend/src/utils/ApiResponse.ts

/**
 * @class ApiResponse
 * @description A standardized class for API success responses.
 * This ensures a consistent response format for all successful API calls.
 */
class ApiResponse {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;

  /**
   * @constructor
   * @param {number} statusCode - The HTTP status code for the response.
   * @param {any} data - The data payload to be sent in the response.
   * @param {string} message - A descriptive message for the response.
   */
  constructor(statusCode: number, data: any, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; // Success is true if statusCode is in the 2xx or 3xx range
  }
}

export { ApiResponse };
