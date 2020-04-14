import {
    isInteger, isNegativeInteger,
    isNonNegativeInteger,
    isNonPositiveInteger,
    isPositiveInteger,
} from './integer';

describe('isInteger', () => {
    it('returns true when value is an integer', () => {
        expect(isInteger(0)).toBe(true);
        expect(isInteger(1)).toBe(true);
        expect(isInteger(-1)).toBe(true);
        expect(isInteger(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(isInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(isInteger(Number.MAX_VALUE)).toBe(true);
    });

    it('returns false when value is not an integer', () => {
        expect(isInteger(3.14)).toBe(false);
        expect(isInteger(-2.71)).toBe(false);
        expect(isInteger(Infinity)).toBe(false);
        expect(isInteger(Number.NaN)).toBe(false);
        expect(isInteger(Number.NEGATIVE_INFINITY)).toBe(false);
        expect(isInteger(Number.POSITIVE_INFINITY)).toBe(false);
        expect(isInteger(Number.MIN_VALUE)).toBe(false);
        expect(isInteger(Number.EPSILON)).toBe(false);
    });
});

describe('isNonNegativeInteger', () => {
    it('returns true when value is a positive integer', () => {
        expect(isNonNegativeInteger(1)).toBe(true);
    });

    it('returns true when value is zero', () => {
        expect(isNonNegativeInteger(0)).toBe(true);
    });

    it('returns false when value is a negative integer', () => {
        expect(isNonNegativeInteger(-1)).toBe(false);
    });

    it('returns false when value is a positive fraction', () => {
        expect(isNonNegativeInteger(3.14)).toBe(false);
    });

    it('returns false when value is a negative fraction', () => {
        expect(isNonNegativeInteger(-2.71)).toBe(false);
    });
});

describe('isPositiveInteger', () => {
    it('returns true when value is a positive integer', () => {
        expect(isPositiveInteger(1)).toBe(true);
    });

    it('returns false when value is zero', () => {
        expect(isPositiveInteger(0)).toBe(false);
    });

    it('returns false when value is a negative integer', () => {
        expect(isPositiveInteger(-1)).toBe(false);
    });

    it('returns false when value is a positive fraction', () => {
        expect(isPositiveInteger(3.14)).toBe(false);
    });

    it('returns false when value is a negative fraction', () => {
        expect(isPositiveInteger(-2.71)).toBe(false);
    });
});

describe('isNonPositiveInteger', () => {
    it('returns false when value is a positive integer', () => {
        expect(isNonPositiveInteger(1)).toBe(false);
    });

    it('returns true when value is zero', () => {
        expect(isNonPositiveInteger(0)).toBe(true);
    });

    it('returns true when value is a negative integer', () => {
        expect(isNonPositiveInteger(-1)).toBe(true);
    });

    it('returns false when value is a positive fraction', () => {
        expect(isNonPositiveInteger(3.14)).toBe(false);
    });

    it('returns false when value is a negative fraction', () => {
        expect(isNonPositiveInteger(-2.71)).toBe(false);
    });
});

describe('isNegativeInteger', () => {
    it('returns false when value is a positive integer', () => {
        expect(isNegativeInteger(1)).toBe(false);
    });

    it('returns false when value is zero', () => {
        expect(isNegativeInteger(0)).toBe(false);
    });

    it('returns true when value is a negative integer', () => {
        expect(isNegativeInteger(-1)).toBe(true);
    });

    it('returns false when value is a positive fraction', () => {
        expect(isNegativeInteger(3.14)).toBe(false);
    });

    it('returns false when value is a negative fraction', () => {
        expect(isNegativeInteger(-2.71)).toBe(false);
    });
});
