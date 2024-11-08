import { describe, it, expect } from 'vitest'
import { cleanFloat } from '..'

describe('cleanFloat', () => {
  describe('Default behavior', () => {
    it('should handle basic floating-point precision issues', () => {
      expect(cleanFloat(0.1 + 0.2)).toBe(0.3)
      expect(cleanFloat(0.3 - 0.1)).toBe(0.2)
      expect(cleanFloat(0.2 + 0.4)).toBe(0.6)
    })

    it('should handle repeating decimal patterns and round accordingly', () => {
      expect(cleanFloat(1.1111111)).toBe(1.1)
      expect(cleanFloat(5555.549999999999)).toBe(5555.55)
      expect(cleanFloat(2.3333333)).toBe(2.3)
      expect(cleanFloat(3.5555555)).toBe(3.6)
    })

    it('should handle very small floating-point precision issues', () => {
      expect(cleanFloat(0.0000000000000001 + 0.0000000000000002)).toBe(0.0000000000000003)
    })

    it('should return integers without modification', () => {
      expect(cleanFloat(1)).toBe(1)
      expect(cleanFloat(1000)).toBe(1000)
      expect(cleanFloat(-42)).toBe(-42)
    })

    it('should handle scientific notation (positive and negative)', () => {
      expect(cleanFloat(1.23e-10 + 1.1e-10)).toBe(2.33e-10)
      expect(cleanFloat(1.234e6 + 5.678e-3)).toBe(1234000.005678)
    })

    it('should handle numbers with long decimal places without repeating patterns', () => {
      expect(cleanFloat(1.234567890123456)).toBe(1.234567890123456)
      expect(cleanFloat(2.718281828459045)).toBe(2.718281828459045)
    })

    it('should handle cases with large repeating decimal sequences', () => {
      expect(cleanFloat(0.9999999999999999)).toBe(1)
      expect(cleanFloat(1.0000000000000009)).toBe(1)
    })

    it('should handle very large numbers', () => {
      expect(cleanFloat(9999999999999.1234567)).toBe(9999999999999.123)
      expect(cleanFloat(1234567890123456.789)).toBe(1234567890123456.789)
    })

    it('should handle numbers close to the limits of precision', () => {
      const maxSafeFloat = Number.MAX_SAFE_INTEGER - 0.1
      expect(cleanFloat(maxSafeFloat)).toBe(maxSafeFloat)
    })

    it('should return the number as is if there is no floating-point error', () => {
      expect(cleanFloat(123.456)).toBe(123.456)
      expect(cleanFloat(7890.1234)).toBe(7890.1234)
    })

    it('should handle negative numbers with repeating decimals', () => {
      expect(cleanFloat(-1.3333333)).toBe(-1.3)
      expect(cleanFloat(-2.5555555)).toBe(-2.6)
    })

    it('should handle negative numbers in scientific notation', () => {
      expect(cleanFloat(-1.23e-10 - 1.1e-10)).toBe(-2.33e-10)
    })

    it('should handle very small numbers close to zero', () => {
      expect(cleanFloat(0.0000000000000009, { minPrecision: 5 })).toBeCloseTo(0.0)
      expect(cleanFloat(-0.0000000000000009, { minPrecision: 5 })).toBeCloseTo(0.0)
    })
  })

  describe('With min precision', () => {
    it('should round repeating decimal patterns', () => {
      expect(cleanFloat(1.333333, { minPrecision: 4 })).toBeCloseTo(1.3333)
      expect(cleanFloat(1.555555, { minPrecision: 5 })).toBeCloseTo(1.55556)
    })

    it('should apply minPrecision even without repeating decimal patterns', () => {
      expect(cleanFloat(0.1234, { minPrecision: 5 })).toBeCloseTo(0.1234)
      expect(cleanFloat(0.999999999, { minPrecision: 5 })).toBeCloseTo(1.0)
    })

    it('should handle scientific notation', () => {
      expect(cleanFloat(1.23e-10 + 1.1e-10, { minPrecision: 5 })).toBeCloseTo(2.33e-10)
    })

    it('should handle large numbers', () => {
      expect(cleanFloat(123456789.987654321, { minPrecision: 3 })).toBeCloseTo(123456789.988)
      expect(cleanFloat(123456789.987654321, { minPrecision: 5 })).toBeCloseTo(123456789.98765)
    })

    it('should ignore minPrecision if it is less than the threshold of repeating decimals', () => {
      expect(cleanFloat(1.333333, { minPrecision: 2 })).toBeCloseTo(1.333) // Threshold is 3, minPrecision 2 is ignored
      expect(cleanFloat(1.555555, { minPrecision: 2 })).toBeCloseTo(1.556)
    })

    it('should handle very small numbers close to zero', () => {
      expect(cleanFloat(0.0000000000000009, { minPrecision: 5 })).toBeCloseTo(0.0)
      expect(cleanFloat(-0.0000000000000009, { minPrecision: 5 })).toBeCloseTo(0.0)
    })
  })
})
