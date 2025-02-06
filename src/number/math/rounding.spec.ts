import { describe, expect, it } from '@jest/globals';

import { ceil, floatRound, floor, round } from './rounding';

describe(ceil, () => {
    describe('when input is a valid number', () => {
        it('returns the smallest integer greater than or equal to the given value', () => {
            expect(ceil(0)).toBe(0);
            expect(ceil(1.1)).toBe(2);
            expect(ceil(-1.1)).toBe(-1);
            expect(ceil(2.5)).toBe(3);
            expect(ceil(-2.5)).toBe(-2);
        });
    });

    describe('when input is Infinity', () => {
        it('returns Infinity', () => {
            expect(ceil(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is -Infinity', () => {
        it('returns -Infinity', () => {
            expect(ceil(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => ceil(Number.NaN))
                .toThrow('Argument `value` must be `number`, but was `NaN`');
        });
    });
});

describe(floor, () => {
    describe('when input is a valid number', () => {
        it('returns the largest integer less than or equal to the given value', () => {
            expect(floor(0)).toBe(0);
            expect(floor(1.1)).toBe(1);
            expect(floor(-1.1)).toBe(-2);
            expect(floor(2.5)).toBe(2);
            expect(floor(-2.5)).toBe(-3);
        });
    });

    describe('when input is Infinity', () => {
        it('returns Infinity', () => {
            expect(floor(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
        });
    });

    describe('when input is -Infinity', () => {
        it('returns -Infinity', () => {
            expect(floor(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when input is NaN', () => {
        it('throws an exception', () => {
            expect(() => floor(Number.NaN))
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
