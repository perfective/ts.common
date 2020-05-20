import {
    isEqualTo,
    isGreaterThan,
    isGreaterThanOrEqualTo,
    isLessThan,
    isLessThanOrEqualTo,
    isNotEqualTo,
} from './comparison';

describe('isEqualTo', () => {
    it('creates a predicate that is true when a variable is equal to the value', () => {
        expect(isEqualTo(0)(0)).toBe(true);
        expect(isEqualTo(Infinity)(Infinity)).toBe(true);
        expect(isEqualTo(Number.MAX_VALUE)(Number.MAX_VALUE)).toBe(true);
        expect(isEqualTo(Number.MIN_VALUE)(Number.MIN_VALUE)).toBe(true);
        expect(isEqualTo(Number.POSITIVE_INFINITY)(Number.POSITIVE_INFINITY)).toBe(true);
        expect(isEqualTo(Number.NEGATIVE_INFINITY)(Number.NEGATIVE_INFINITY)).toBe(true);
        expect(isEqualTo(Number.MAX_SAFE_INTEGER)(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(isEqualTo(Number.MIN_SAFE_INTEGER)(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(isEqualTo(Number.EPSILON)(Number.EPSILON)).toBe(true);
    });

    it('creates a predicate that is false when a variable is not equal to the value', () => {
        expect(isEqualTo(3.14)(2.71)).toBe(false);
        expect(isEqualTo(Number.MIN_VALUE)(Number.MAX_VALUE)).toBe(false);
        expect(isEqualTo(Number.NaN)(Number.NaN)).toBe(false);
    });
});

describe('isNotEqualTo', () => {
    it('creates a predicate that is true when a variable is not equal to the value', () => {
        expect(isNotEqualTo(3.14)(2.71)).toBe(true);
        expect(isNotEqualTo(Number.NaN)(Number.NaN)).toBe(true);
    });

    it('creates a predicate that is false when a variable is equal to the value', () => {
        expect(isNotEqualTo(0)(0)).toBe(false);
    });
});

describe('isGreaterThan', () => {
    it('creates a predicate that is true when a variable is greater than the value', () => {
        expect(isGreaterThan(2.71)(3.14)).toBe(true);
    });

    it('creates a predicate that is false when a variable is equal to the value', () => {
        expect(isGreaterThan(2.71)(2.71)).toBe(false);
    });

    it('creates a predicate that is false when a variable is less than the value', () => {
        expect(isGreaterThan(3.14)(2.71)).toBe(false);
    });
});

describe('isGreaterThanOrEqualTo', () => {
    it('creates a predicate that is true when a variable is greater than the value', () => {
        expect(isGreaterThanOrEqualTo(2.71)(3.14)).toBe(true);
    });

    it('creates a predicate that is true when a variable is equal to the value', () => {
        expect(isGreaterThanOrEqualTo(2.71)(2.71)).toBe(true);
    });

    it('creates a predicate that is false when a variable is less than the value', () => {
        expect(isGreaterThanOrEqualTo(3.14)(2.71)).toBe(false);
    });
});

describe('isLessThan', () => {
    it('creates a predicate that is false when a variable is greater than the value', () => {
        expect(isLessThan(2.71)(3.14)).toBe(false);
    });

    it('creates a predicate that is false when a variable is equal to the value', () => {
        expect(isLessThan(2.71)(2.71)).toBe(false);
    });

    it('creates a predicate that is true when a variable is less than the value', () => {
        expect(isLessThan(3.14)(2.71)).toBe(true);
    });
});

describe('isLessThanOrEqualTo', () => {
    it('creates a predicate that is false when a variable is greater than the value', () => {
        expect(isLessThanOrEqualTo(2.71)(3.14)).toBe(false);
    });

    it('creates a predicate that is true when a variable is equal to the value', () => {
        expect(isLessThanOrEqualTo(2.71)(2.71)).toBe(true);
    });

    it('creates a predicate that is true when a variable is less than the value', () => {
        expect(isLessThanOrEqualTo(3.14)(2.71)).toBe(true);
    });
});
