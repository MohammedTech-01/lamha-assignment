/**
 * validation.ts - Form validation utilities
 *
 * This module contains validation functions for various form inputs
 * throughout the application. All validators follow a consistent pattern
 * returning a ValidationResult object with isValid flag and optional error message.
 *
 * These validators are used to:
 * - Prevent invalid data from being submitted
 * - Protect against security vulnerabilities (XSS, SQL injection)
 * - Ensure data consistency and business rule compliance
 * - Provide clear user feedback for invalid inputs
 */

/**
 * Standard validation result interface
 * All validation functions return this structure for consistency
 */
export interface ValidationResult {
  isValid: boolean; // Whether the validation passed
  error?: string; // Human-readable error message (only present if invalid)
}

/**
 * Search Query Validation
 *
 * Validates user search input to prevent:
 * - Excessively long queries that could impact performance
 * - XSS attacks through HTML injection
 * - Potential SQL injection attempts
 *
 * @param {string} query - The search query to validate
 * @returns {ValidationResult} - Validation result with error if invalid
 *
 * @example
 * validateSearchQuery("invoice 123") // { isValid: true }
 * validateSearchQuery("<script>alert('xss')</script>") // { isValid: false, error: "Search query contains invalid characters" }
 */
export const validateSearchQuery = (query: string): ValidationResult => {
  // Check length to prevent database/performance issues
  if (query.length > 100) {
    return {
      isValid: false,
      error: "Search query is too long (max 100 characters)",
    };
  }

  // Check for potentially harmful HTML characters to prevent XSS
  // This regex looks for < and > which could indicate HTML/script tags
  const invalidChars = /[<>]/g;
  if (invalidChars.test(query)) {
    return {
      isValid: false,
      error: "Search query contains invalid characters",
    };
  }

  // Additional security checks could be added here:
  // - SQL injection patterns
  // - Script injection patterns
  // - Unicode control characters

  return { isValid: true };
};

/**
 * Date Range Validation
 *
 * Validates date ranges for filtering transactions
 * Ensures:
 * - Correct format (YYYY-MM-DD - YYYY-MM-DD)
 * - Valid dates (not "2024-13-45")
 * - Logical order (start before end)
 * - No future dates (business rule: can't have future transactions)
 *
 * @param {string} range - Date range string in format "YYYY-MM-DD - YYYY-MM-DD"
 * @returns {ValidationResult} - Validation result with specific error message
 *
 * @example
 * validateDateRange("2024-01-01 - 2024-01-31") // { isValid: true }
 * validateDateRange("2024-01-31 - 2024-01-01") // { isValid: false, error: "Start date must be before end date" }
 */
export const validateDateRange = (range: string): ValidationResult => {
  // Empty range is valid (no filter applied)
  if (!range) return { isValid: true };

  // Validate format using regex
  // Accepts: YYYY-MM-DD - YYYY-MM-DD (with optional spaces around dash)
  const match = range.match(/^(\d{4}-\d{2}-\d{2})\s*-\s*(\d{4}-\d{2}-\d{2})$/);
  if (!match) {
    return {
      isValid: false,
      error: "Invalid date format. Use: YYYY-MM-DD - YYYY-MM-DD",
    };
  }

  // Extract start and end date strings
  const [_, startStr, endStr] = match;

  // Parse dates and check validity
  const start = new Date(startStr);
  const end = new Date(endStr);

  // Check if dates are valid (e.g., not Feb 30th)
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { isValid: false, error: "Invalid dates provided" };
  }

  // Ensure logical order
  if (start > end) {
    return { isValid: false, error: "Start date must be before end date" };
  }

  // Business rule: Can't filter for future transactions
  const now = new Date();
  if (end > now) {
    return { isValid: false, error: "End date cannot be in the future" };
  }

  // Additional validations could include:
  // - Maximum date range (e.g., no more than 1 year)
  // - Minimum date (e.g., system inception date)

  return { isValid: true };
};

/**
 * Status Validation
 *
 * Validates transaction status values
 * Prevents invalid status values that could break filtering or display logic
 *
 * @param {string} status - Status value to validate
 * @returns {ValidationResult} - Validation result
 *
 * Valid values:
 * - '' (empty string = no filter)
 * - 'pending' - Transaction awaiting approval
 * - 'approved' - Transaction has been approved
 */
export const validateStatus = (status: string): ValidationResult => {
  // Define allowed status values
  // Empty string is valid (represents "no filter")
  const validStatuses = ["", "pending", "approved"];

  // Case-insensitive comparison for better UX
  if (!validStatuses.includes(status.toLowerCase())) {
    return {
      isValid: false,
      error: "Invalid status selected",
    };
  }

  return { isValid: true };
};

/**
 * Amount Validation
 *
 * Validates monetary amounts for transactions
 * Ensures amounts are:
 * - Valid numbers
 * - Non-negative (no negative transactions in this system)
 * - Within reasonable limits (prevents data entry errors)
 *
 * @param {string | number} amount - Amount to validate (accepts both string and number)
 * @returns {ValidationResult} - Validation result with specific error
 *
 * @example
 * validateAmount("100.50") // { isValid: true }
 * validateAmount(-50) // { isValid: false, error: "Amount cannot be negative" }
 * validateAmount("abc") // { isValid: false, error: "Amount must be a valid number" }
 */
export const validateAmount = (amount: string | number): ValidationResult => {
  // Convert to number if string
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  // Check if conversion resulted in valid number
  if (isNaN(numAmount)) {
    return {
      isValid: false,
      error: "Amount must be a valid number",
    };
  }

  // Business rule: No negative amounts
  if (numAmount < 0) {
    return {
      isValid: false,
      error: "Amount cannot be negative",
    };
  }

  // Sanity check: Prevent unreasonably large amounts
  // This helps catch data entry errors (e.g., extra zeros)
  if (numAmount > 1000000) {
    return {
      isValid: false,
      error: "Amount exceeds maximum limit (1,000,000)",
    };
  }

  // Additional validations could include:
  // - Decimal place limits (e.g., max 2 decimal places for currency)
  // - Minimum amount threshold
  // - Currency-specific validation

  return { isValid: true };
};

/**
 * Invoice Number Validation
 *
 * Validates invoice reference numbers
 * Invoice numbers are critical for accounting and must follow strict rules:
 * - Required field (can't be empty)
 * - Length limits for database storage
 * - Character restrictions for system compatibility
 *
 * @param {string} invoiceNumber - Invoice number to validate
 * @returns {ValidationResult} - Validation result
 *
 * @example
 * validateInvoiceNumber("INV-2024-001") // { isValid: true }
 * validateInvoiceNumber("INV#2024") // { isValid: false, error: "Invoice number can only contain..." }
 */
export const validateInvoiceNumber = (
  invoiceNumber: string,
): ValidationResult => {
  // Check for empty/whitespace
  if (!invoiceNumber || invoiceNumber.trim() === "") {
    return {
      isValid: false,
      error: "Invoice number is required",
    };
  }

  // Length validation
  if (invoiceNumber.length > 50) {
    return {
      isValid: false,
      error: "Invoice number is too long (max 50 characters)",
    };
  }

  // Enforce format: SA-{numbers}
  const invoiceRegex = /^SA-\d+$/;
  if (!invoiceRegex.test(invoiceNumber)) {
    return {
      isValid: false,
      error:
        "Invoice number must follow the format SA-{numbers} (e.g., SA-12345)",
    };
  }

  return { isValid: true };
};

/**
 * Vendor Name Validation
 *
 * Validates vendor/supplier names
 * Ensures vendor names are:
 * - Not empty (required field)
 * - Meaningful length (not just initials)
 * - Within database limits
 *
 * Note: Allows special characters and spaces since vendor names
 * can include various punctuation (e.g., "Smith & Co.", "ABC Inc.")
 *
 * @param {string} vendor - Vendor name to validate
 * @returns {ValidationResult} - Validation result
 *
 * @example
 * validateVendorName("ABC Corporation") // { isValid: true }
 * validateVendorName("A") // { isValid: false, error: "Vendor name is too short..." }
 */
export const validateVendorName = (vendor: string): ValidationResult => {
  // Check for empty/whitespace
  if (!vendor || vendor.trim() === "") {
    return {
      isValid: false,
      error: "Vendor name is required",
    };
  }

  // Minimum length to ensure meaningful names
  if (vendor.length < 2) {
    return {
      isValid: false,
      error: "Vendor name is too short (min 2 characters)",
    };
  }

  // Maximum length for database constraints
  if (vendor.length > 100) {
    return {
      isValid: false,
      error: "Vendor name is too long (max 100 characters)",
    };
  }

  // Additional validations could include:
  // - Profanity filter
  // - Duplicate vendor check (would require database access)
  // - Special character limits if needed

  return { isValid: true };
};
