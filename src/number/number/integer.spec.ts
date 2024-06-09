import { describe, expect, it } from '@jest/globals';

import {
    isInteger,
    isNegativeInteger,
    isNonNegativeInteger,
    isNonPositiveInteger,
    isPositiveInteger,
    isSafeInteger,
} from './integer';

describe(isInteger, () => {
    describe('when the value is an integer', () => {
        it('returns true', () => {
            expect(isInteger(0)).toBe(true);
            expect(isInteger(1)).toBe(true);
            expect(isInteger(-1)).toBe(true);
            expect(isInteger(Number.MIN_SAFE_INTEGER)).toBe(true);
            expect(isInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
        });
    });

    describe('when the value is MAX_VALUE', () => {
        it('returns true', () => {
            expect(isInteger(Number.MAX_VALUE)).toBe(true);
        });
    });

    describe('when the value is not an integer', () => {
        it('returns false', () => {
            expect(isInteger(3.14)).toBe(false);
            expect(isInteger(-2.71)).toBe(false);
            expect(isInteger(Number.EPSILON)).toBe(false);
        });
    });

    describe('when the value is MIN_VALUE', () => {
        it('returns false', () => {
            expect(isInteger(Number.MIN_VALUE)).toBe(false);
        });
    });

    describe('when the value is NaN', () => {
        it('returns false', () => {
            expect(isInteger(Number.NaN)).toBe(false);
        });
    });

    describe('when the value is Infinity', () => {
        it('returns false', () => {
            expect(isInteger(Number.NEGATIVE_INFINITY)).toBe(false);
            expect(isInteger(Number.POSITIVE_INFINITY)).toBe(false);
        });
    });
});

describe(isSafeInteger, () => {
    describe('when value is an integer that is less than 2^53-1 and greater than -(2^53 - 1)', () => {
        it('returns true', () => {
            expect(isSafeInteger(0)).toBe(true);
            expect(isSafeInteger(0.0)).toBe(true);
        });
    });

    describe('when value is an integer that is equal to 2^53-1', () => {
        it('returns true', () => {
            expect(isSafeInteger(2 ** 53 - 1)).toBe(true);
        });
    });

    describe('when value is an integer that is equal to -(2^53-1)', () => {
        it('returns true', () => {
            expect(isSafeInteger(-(2 ** 53 - 1))).toBe(true);
        });
    });

    describe('when value is an integer that is greater than 2^53-1', () => {
        it('returns false', () => {
            expect(isSafeInteger((2 ** 53 - 1) + 1)).toBe(false);
        });
    });

    describe('when value is an integer that is less than -(2^53-1)', () => {
        it('returns false', () => {
            expect(isSafeInteger(-(2 ** 53 - 1) - 1)).toBe(false);
        });
    });

    describe('when value is float', () => {
        it('returns false', () => {
            expect(isSafeInteger(3.1)).toBe(false);
        });
    });

    describe('when value is NaN', () => {
        it('returns false', () => {
            expect(isSafeInteger(Number.NaN)).toBe(false);
        });
    });

    describe('when value is Infinity', () => {
        it('returns false', () => {
            expect(isSafeInteger(Number.NEGATIVE_INFINITY)).toBe(false);
            expect(isSafeInteger(Number.POSITIVE_INFINITY)).toBe(false);
        });
    });
});

describe(isNonNegativeInteger, () => {
    describe('when value is a positive integer', () => {
        it('returns true', () => {
            expect(isNonNegativeInteger(1)).toBe(true);
        });
    });

    describe('when value is zero', () => {
        it('returns true', () => {
            expect(isNonNegativeInteger(0)).toBe(true);
        });
    });

    describe('when value is a negative integer', () => {
        it('returns false', () => {
            expect(isNonNegativeInteger(-1)).toBe(false);
        });
    });

    describe('when value is a positive float', () => {
        it('returns false', () => {
            expect(isNonNegativeInteger(3.14)).toBe(false);
        });
    });

    describe('when value is a negative float', () => {
        it('returns false', () => {
            expect(isNonNegativeInteger(-2.71)).toBe(false);
        });
    });
});

describe(isPositiveInteger, () => {
    describe('when value is a positive integer', () => {
        it('returns true', () => {
            expect(isPositiveInteger(1)).toBe(true);
        });
    });

    describe('when value is zero', () => {
        it('returns false', () => {
            expect(isPositiveInteger(0)).toBe(false);
        });
    });

    describe('when value is a negative integer', () => {
        it('returns false', () => {
            expect(isPositiveInteger(-1)).toBe(false);
        });
    });

    describe('when value is a positive float', () => {
        it('returns false', () => {
            expect(isPositiveInteger(3.14)).toBe(false);
        });
    });

    describe('when value is a negative float', () => {
        it('returns false', () => {
            expect(isPositiveInteger(-2.71)).toBe(false);
        });
    });
});

describe(isNonPositiveInteger, () => {
    describe('when value is a positive integer', () => {
        it('returns false', () => {
            expect(isNonPositiveInteger(1)).toBe(false);
        });
    });

    describe('when value is zero', () => {
        it('returns true', () => {
            expect(isNonPositiveInteger(0)).toBe(true);
        });
    });

    describe('when value is a negative integer', () => {
        it('returns true', () => {
            expect(isNonPositiveInteger(-1)).toBe(true);
        });
    });

    describe('when value is a positive float', () => {
        it('returns false', () => {
            expect(isNonPositiveInteger(3.14)).toBe(false);
        });
    });

    describe('when value is a negative float', () => {
        it('returns false', () => {
            expect(isNonPositiveInteger(-2.71)).toBe(false);
        });
    });
});

describe(isNegativeInteger, () => {
    describe('when value is a positive integer', () => {
        it('returns false', () => {
            expect(isNegativeInteger(1)).toBe(false);
        });
    });

    describe('when value is zero', () => {
        it('returns false', () => {
            expect(isNegativeInteger(0)).toBe(false);
        });
    });

    describe('when value is a negative integer', () => {
        it('returns true', () => {
            expect(isNegativeInteger(-1)).toBe(true);
        });
    });

    describe('when value is a positive float', () => {
        it('returns false', () => {
            expect(isNegativeInteger(3.14)).toBe(false);
        });
    });

    describe('when value is a negative float', () => {
        it('returns false', () => {
            expect(isNegativeInteger(-2.71)).toBe(false);
        });
    });
});
