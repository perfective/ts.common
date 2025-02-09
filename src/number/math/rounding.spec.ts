import { describe, expect, it } from '@jest/globals';

import { floatRound, round, roundedDown, roundedUp, truncated } from './rounding';

describe(roundedDown, () => {
    describe('when input is a valid number', () => {
        it('returns the largest integer less than or equal to the given value', () => {
            expect(roundedDown(0)).toBe(0);
            expect(roundedDown(1.1)).toBe(1);
            expect(roundedDown(-1.1)).toBe(-2);
            expect(roundedDown(2.5)).toBe(2);
            expect(roundedDown(-2.5)).toBe(-3);
        });
    });

    describe('when input is Infinity', () => {
        it('returns Infinity', () => {
            expect(roundedDown(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is -Infinity', () => {
        it('returns -Infinity', () => {
            expect(roundedDown(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => roundedDown(Number.NaN))
                .toThrow('Argument `value` must be `number`, but was `NaN`');
        });
    });
});

describe(roundedUp, () => {
    describe('when input is a valid number', () => {
        it('returns the smallest integer greater than or equal to the given value', () => {
            expect(roundedUp(0)).toBe(0);
            expect(roundedUp(1.1)).toBe(2);
            expect(roundedUp(-1.1)).toBe(-1);
            expect(roundedUp(2.5)).toBe(3);
            expect(roundedUp(-2.5)).toBe(-2);
        });
    });

    describe('when input is Infinity', () => {
        it('returns Infinity', () => {
            expect(roundedUp(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is -Infinity', () => {
        it('returns -Infinity', () => {
            expect(roundedUp(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => roundedUp(Number.NaN))
                .toThrow('Argument `value` must be `number`, but was `NaN`');
        });
    });
});

describe(round, () => {
    describe('when input is a valid number', () => {
        it('returns the nearest integer to the given value', () => {
            expect(round(0)).toBe(0);
            expect(round(1.49)).toBe(1);
            expect(round(1.50)).toBe(2);
            expect(round(-1.50)).toBe(-1);
            expect(round(-1.51)).toBe(-2);
        });
    });

    describe('when input is Infinity', () => {
        it('returns Infinity', () => {
            expect(round(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is -Infinity', () => {
        it('returns -Infinity', () => {
            expect(round(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => round(Number.NaN))
                .toThrow('Argument `value` must be `number`, but was `NaN`');
        });
    });
});

describe(floatRound, () => {
    describe('when input is a valid number', () => {
        it('returns the nearest 32-bit single precision float representation of the given value', () => {
            expect(floatRound(0)).toBe(0);
            expect(floatRound(1.3)).toBe(1.299_999_952_316_284_2);
            expect(floatRound(Math.PI)).toBe(3.141_592_741_012_573_2);
            expect(floatRound(Math.E)).toBe(2.718_281_745_910_644_5);
        });
    });

    describe('when input is Infinity', () => {
        it('returns Infinity', () => {
            expect(floatRound(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is -Infinity', () => {
        it('returns -Infinity', () => {
            expect(floatRound(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => floatRound(Number.NaN))
                .toThrow('Argument `value` must be `number`, but was `NaN`');
        });
    });
});

describe(truncated, () => {
    describe('when input is a valid number', () => {
        it('returns the integer part of the given value', () => {
            expect(truncated(0)).toBe(0);
            expect(truncated(1.9)).toBe(1);
            expect(truncated(-1.9)).toBe(-1);
            expect(truncated(2.5)).toBe(2);
            expect(truncated(-2.5)).toBe(-2);
        });
    });

    describe('when input is Infinity', () => {
        it('returns Infinity', () => {
            expect(truncated(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is -Infinity', () => {
        it('returns -Infinity', () => {
            expect(truncated(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => truncated(Number.NaN))
                .toThrow('Argument `value` must be `number`, but was `NaN`');
        });
    });
});
