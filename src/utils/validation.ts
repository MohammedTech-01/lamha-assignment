// validation.ts - Form validation utilities

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

// Search query validation
export const validateSearchQuery = (query: string): ValidationResult => {
  if (query.length > 100) {
    return {
      isValid: false,
      error: 'Search query is too long (max 100 characters)'
    };
  }

  // Check for potentially harmful characters
  const invalidChars = /[<>]/g;
  if (invalidChars.test(query)) {
    return {
      isValid: false,
      error: 'Search query contains invalid characters'
    };
  }

  return { isValid: true };
};

// Date range validation
export function validateDateRange(range: string): { isValid: boolean; error?: string } {
  if (!range) return { isValid: true };
  // Accept format: YYYY-MM-DD - YYYY-MM-DD
  const match = range.match(/^(\d{4}-\d{2}-\d{2})\s*-\s*(\d{4}-\d{2}-\d{2})$/);
  if (!match) {
    return { isValid: false, error: 'Invalid date format. Use: YYYY-MM-DD - YYYY-MM-DD' };
  }
  const [_, startStr, endStr] = match;
  const start = new Date(startStr);
  const end = new Date(endStr);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { isValid: false, error: 'Invalid dates provided' };
  }
  if (start > end) {
    return { isValid: false, error: 'Start date must be before end date' };
  }
  const now = new Date();
  if (end > now) {
    return { isValid: false, error: 'End date cannot be in the future' };
  }
  return { isValid: true };
}

// Status validation
export const validateStatus = (status: string): ValidationResult => {
  const validStatuses = ['', 'pending', 'approved'];
  
  if (!validStatuses.includes(status.toLowerCase())) {
    return {
      isValid: false,
      error: 'Invalid status selected'
    };
  }

  return { isValid: true };
};

// Amount validation for transaction forms
export const validateAmount = (amount: string | number): ValidationResult => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    return {
      isValid: false,
      error: 'Amount must be a valid number'
    };
  }

  if (numAmount < 0) {
    return {
      isValid: false,
      error: 'Amount cannot be negative'
    };
  }

  if (numAmount > 1000000) {
    return {
      isValid: false,
      error: 'Amount exceeds maximum limit (1,000,000)'
    };
  }

  return { isValid: true };
};

// Invoice number validation
export const validateInvoiceNumber = (invoiceNumber: string): ValidationResult => {
  if (!invoiceNumber || invoiceNumber.trim() === '') {
    return {
      isValid: false,
      error: 'Invoice number is required'
    };
  }

  if (invoiceNumber.length > 50) {
    return {
      isValid: false,
      error: 'Invoice number is too long (max 50 characters)'
    };
  }

  // Basic alphanumeric with dashes and underscores
  const invoiceRegex = /^[A-Za-z0-9\-_]+$/;
  if (!invoiceRegex.test(invoiceNumber)) {
    return {
      isValid: false,
      error: 'Invoice number can only contain letters, numbers, dashes, and underscores'
    };
  }

  return { isValid: true };
};

// Vendor name validation
export const validateVendorName = (vendor: string): ValidationResult => {
  if (!vendor || vendor.trim() === '') {
    return {
      isValid: false,
      error: 'Vendor name is required'
    };
  }

  if (vendor.length < 2) {
    return {
      isValid: false,
      error: 'Vendor name is too short (min 2 characters)'
    };
  }

  if (vendor.length > 100) {
    return {
      isValid: false,
      error: 'Vendor name is too long (max 100 characters)'
    };
  }

  return { isValid: true };
};