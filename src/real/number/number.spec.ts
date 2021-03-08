import { isNotNumber, isNumber, negative } from './number';

describe('isNumber', () => {
    it('returns true when value is a number', () => {
        expect(isNumber(3.14)).toBe(true);
    });

    it('returns false when value is not a number', () => {
        expect(isNumber(Number.NaN)).toBe(false);
        expect(isNumber('3.14')).toBe(false);
        expect(isNumber(true)).toBe(false);
    });
});

describe('isNotNumber', () => {
    it('returns false when value is a number', () => {
        expect(isNotNumber(3.14)).toBe(false);
    });

    it('returns true when value is not a number', () => {
        expect(isNotNumber(Number.NaN)).toBe(true);
        expect(isNotNumber('3.14')).toBe(true);
        expect(isNotNumber(false)).toBe(true);
    });
});

describe('negative', () => {
    it('returns 0 when given  0', () => {
        expect(negative(0)).toBe(0);
        expect(negative(-0)).toBe(0);
    });

    it('returns negative value for the given value', () => {
        expect(negative(3.14)).toBe(-3.14);
        expect(negative(-42)).toBe(42);
    });

    it('returns negative for infinity', () => {
        expect(negative(Number.POSITIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        expect(negative(Number.NEGATIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
    });

    it('returns NaN when given NaN', () => {
        expect(negative(Number.NaN)).toBe(Number.NaN);
    });
});
