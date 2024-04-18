import { isNotNil } from '@/infrastructure/helpers/guards';

describe('isNotNil', () => {
  it('should return true when value is not null or undefined', () => {
    expect(isNotNil(0)).toBe(true);
    expect(isNotNil('')).toBe(true);
    expect(isNotNil(false)).toBe(true);
    expect(isNotNil({})).toBe(true);
    expect(isNotNil([])).toBe(true);
  });

  it('should return false when value is null or undefined', () => {
    expect(isNotNil(null)).toBe(false);
    expect(isNotNil(undefined)).toBe(false);
  });
});