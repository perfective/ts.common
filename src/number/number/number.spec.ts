import { describe, expect, it } from '@jest/globals';

import { isNotNumber, isNumber, negative, sign } from './number';

describe(isNumber, () => {
    describe('when value is a number', () => {
        it('returns true', () => {
            expect(isNumber(3.14)).toBe(true);
        });
    });

    describe('when value is Infinity', () => {
        it('returns true', () => {
            /* eslint-disable @typescript-eslint/no-unnecessary-condition -- type guard testing */
            expect(isNumber(Number.POSITIVE_INFINITY)).toBe(true);
            expect(isNumber(Number.NEGATIVE_INFINITY)).toBe(true);
            /* eslint-enable @typescript-eslint/no-unnecessary-condition */
        });
    });

    describe('when value is NaN', () => {
        it('returns false', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNumber(Number.NaN)).toBe(false);
        });
    });

    describe('when value is not a number', () => {
        it('returns false', () => {
            expect(isNumber('3.14')).toBe(false);
            expect(isNumber(true)).toBe(false);
        });
    });
});

describe(isNotNumber, () => {
    describe('when value is a number', () => {
        it('returns false', () => {
            expect(isNotNumber(3.14)).toBe(false);
        });
    });

    describe('when value is Infinity', () => {
        it('returns false', () => {
            /* eslint-disable @typescript-eslint/no-unnecessary-condition -- type guard testing */
            expect(isNotNumber(Number.POSITIVE_INFINITY)).toBe(false);
            expect(isNotNumber(Number.NEGATIVE_INFINITY)).toBe(false);
            /* eslint-enable @typescript-eslint/no-unnecessary-condition */
        });
    });

    describe('when value is NaN', () => {
        it('returns true', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNotNumber(Number.NaN)).toBe(true);
        });
    });

    describe('when value is not a number', () => {
        it('returns true', () => {
            expect(isNotNumber('3.14')).toBe(true);
            expect(isNotNumber(false)).toBe(true);
        });
    });
});

describe(negative, () => {
    describe('when given a zero', () => {
        it('returns 0', () => {
            expect(negative(0)).toBe(0);
            expect(negative(-0)).toBe(0);
        });
    });

    describe('when given a positive value', () => {
        it('returns a negative value', () => {
            expect(negative(3.14)).toBe(-3.14);
            expect(negative(-42)).toBe(42);
        });
    });

    describe('when given a negative value', () => {
        it('returns a positive value', () => {
            expect(negative(-42)).toBe(42);
        });
    });

    describe('when given an NEGATIVE_INFINITY', () => {
        it('returns POSITIVE_INFINITY', () => {
            expect(negative(Number.NEGATIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when given an POSITIVE_INFINITY', () => {
        it('returns NEGATIVE_INFINITY', () => {
            expect(negative(Number.POSITIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when given NaN', () => {
        it('returns NaN', () => {
            expect(negative(Number.NaN)).toBe(Number.NaN);
        });
    });
});

describe(sign, () => {
    describe('when input is a positive number', () => {
        it('returns 1', () => {
            expect(sign(3.14)).toBe(1);
        });
    });

    describe('when input is a negative number', () => {
        it('returns -1', () => {
            expect(sign(-3.14)).toBe(-1);
        });
    });

    describe('when input is zero', () => {
        it('returns 0', () => {
            expect(sign(0)).toBeNull();
            expect(sign(-0)).toBeNull();
        });
    });

    describe('when input is Infinity', () => {
        it('returns 1', () => {
            expect(sign(Number.POSITIVE_INFINITY)).toBe(1);
        });
    });

    describe('when input is -Infinity', () => {
        it('returns -1', () => {
            expect(sign(Number.NEGATIVE_INFINITY)).toBe(-1);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => sign(Number.NaN))
                .toThrow('Argument `value` must be `number`, but was `NaN`');
        });
    });
});
