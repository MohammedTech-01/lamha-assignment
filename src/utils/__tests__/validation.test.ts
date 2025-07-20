import {
  validateSearchQuery,
  validateDateRange,
  validateStatus,
  validateAmount,
  validateInvoiceNumber,
  validateVendorName,
} from '../validation';

describe('Validation Utilities', () => {
  describe('validateSearchQuery', () => {
    test('valid search strings', () => {
      expect(validateSearchQuery('valid')).toEqual({ isValid: true });
      expect(validateSearchQuery('')).toEqual({ isValid: true });
      expect(validateSearchQuery('123')).toEqual({ isValid: true });
    });

    test('too long', () => {
      const long = 'a'.repeat(101);
      expect(validateSearchQuery(long)).toEqual({
        isValid: false,
        error: 'Search query is too long (max 100 characters)',
      });
    });

    test('invalid characters', () => {
      expect(validateSearchQuery('script<script>')).toEqual({
        isValid: false,
        error: 'Search query contains invalid characters',
      });
    });
  });

  describe('validateDateRange', () => {
    test('empty is valid', () => {
      expect(validateDateRange('')).toEqual({ isValid: true });
    });

    test('valid format', () => {
      expect(validateDateRange('2024-01-01 - 2024-01-31')).toEqual({ isValid: true });
    });

    test('invalid format', () => {
      expect(validateDateRange('01-01-2024 to 01-31-2024')).toEqual({
        isValid: false,
        error: 'Invalid date format. Use: YYYY-MM-DD - YYYY-MM-DD',
      });
    });

    test('invalid date values', () => {
      expect(validateDateRange('2024-13-01 - 2024-13-31')).toEqual({
        isValid: false,
        error: 'Invalid dates provided',
      });
    });

    test('start date after end', () => {
      expect(validateDateRange('2024-12-01 - 2024-01-01')).toEqual({
        isValid: false,
        error: 'Start date must be before end date',
      });
    });

    test('end date in future', () => {
      const future = new Date();
      future.setFullYear(future.getFullYear() + 1);
      const futureStr = future.toISOString().split('T')[0];
      expect(validateDateRange(`2024-01-01 - ${futureStr}`)).toEqual({
        isValid: false,
        error: 'End date cannot be in the future',
      });
    });
  });

  describe('validateStatus', () => {
    test('valid statuses', () => {
      expect(validateStatus('')).toEqual({ isValid: true });
      expect(validateStatus('pending')).toEqual({ isValid: true });
      expect(validateStatus('approved')).toEqual({ isValid: true });
      expect(validateStatus('APPROVED')).toEqual({ isValid: true });
    });

    test('invalid status', () => {
      expect(validateStatus('denied')).toEqual({
        isValid: false,
        error: 'Invalid status selected',
      });
    });
  });

  describe('validateAmount', () => {
    test('valid numeric and string values', () => {
      expect(validateAmount(100)).toEqual({ isValid: true });
      expect(validateAmount('500.50')).toEqual({ isValid: true });
    });

    test('negative amount', () => {
      expect(validateAmount(-1)).toEqual({
        isValid: false,
        error: 'Amount cannot be negative',
      });
    });

    test('exceeds limit', () => {
      expect(validateAmount(1000001)).toEqual({
        isValid: false,
        error: 'Amount exceeds maximum limit (1,000,000)',
      });
    });

    test('non-numeric', () => {
      expect(validateAmount('abc')).toEqual({
        isValid: false,
        error: 'Amount must be a valid number',
      });
    });
  });

  describe('validateInvoiceNumber', () => {
    test('valid values', () => {
      expect(validateInvoiceNumber('SA-001')).toEqual({ isValid: true });
      expect(validateInvoiceNumber('SA-20240719')).toEqual({ isValid: true });
    });

    test('empty or blank', () => {
      expect(validateInvoiceNumber('')).toEqual({
        isValid: false,
        error: 'Invoice number is required',
      });
      expect(validateInvoiceNumber('   ')).toEqual({
        isValid: false,
        error: 'Invoice number is required',
      });
    });

    test('too long', () => {
      const long = 'SA-' + '1'.repeat(48); // 51 chars total
      expect(validateInvoiceNumber(long)).toEqual({
        isValid: false,
        error: 'Invoice number is too long (max 50 characters)',
      });
    });

    test('invalid characters or format', () => {
      expect(validateInvoiceNumber('SA_001')).toEqual({
        isValid: false,
        error: 'Invoice number must follow the format SA-{numbers} (e.g., SA-12345)',
      });
      expect(validateInvoiceNumber('SA-001A')).toEqual({
        isValid: false,
        error: 'Invoice number must follow the format SA-{numbers} (e.g., SA-12345)',
      });
      expect(validateInvoiceNumber('SAA-001')).toEqual({
        isValid: false,
        error: 'Invoice number must follow the format SA-{numbers} (e.g., SA-12345)',
      });
    });
  });


  describe('validateVendorName', () => {
    test('valid vendor names', () => {
      expect(validateVendorName('Microsoft')).toEqual({ isValid: true });
      expect(validateVendorName('Adobe Inc.')).toEqual({ isValid: true });
    });

    test('empty or blank', () => {
      expect(validateVendorName('')).toEqual({
        isValid: false,
        error: 'Vendor name is required',
      });
      expect(validateVendorName('   ')).toEqual({
        isValid: false,
        error: 'Vendor name is required',
      });
    });

    test('too short', () => {
      expect(validateVendorName('A')).toEqual({
        isValid: false,
        error: 'Vendor name is too short (min 2 characters)',
      });
    });

    test('too long', () => {
      const long = 'a'.repeat(101);
      expect(validateVendorName(long)).toEqual({
        isValid: false,
        error: 'Vendor name is too long (max 100 characters)',
      });
    });
  });
});
