import { isValidURL } from './validators';

describe('isValidURL', () => {
  it('should return true for a valid URL', () => {
    const validURL = 'https://example.com';
    expect(isValidURL(validURL)).toBe(true);
  });

  it('should return true for a valid URL object', () => {
    const validURL = new URL('https://example.com');
    expect(isValidURL(validURL)).toBe(true);
  });

  it('should return false for an invalid URL', () => {
    const invalidURL = 'example.com';
    expect(isValidURL(invalidURL)).toBe(false);
  });

  it('should return false for an invalid URL object', () => {
    const invalidURL = new URL('example.com');
    expect(isValidURL(invalidURL)).toBe(false);
  });
});