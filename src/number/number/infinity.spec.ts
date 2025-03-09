import { describe, expect, it } from '@jest/globals';

import { assertIsFinite, isFinite, isInfinity } from './infinity';

describe(isInfinity, () => {
    describe('when given a positive infinity', () => {
        it('returns true', () => {
            // eslint-disable-next-line unicorn/prefer-number-properties -- test value
            expect(isInfinity(Infinity)).toBe(true);
            expect(isInfinity(Number.POSITIVE_INFINITY)).toBe(true);
        });
    });

    describe('when given a negative infinity', () => {
        it('returns true', () => {
            // eslint-disable-next-line unicorn/prefer-number-properties -- test value
            expect(isInfinity(-Infinity)).toBe(true);
            expect(isInfinity(Number.NEGATIVE_INFINITY)).toBe(true);
        });
    });

    describe('when given NaN', () => {
        it('returns true', () => {
            expect(isInfinity(Number.NaN)).toBe(false);
        });
    });

    describe('when given a number', () => {
        it('returns false', () => {
            expect(isInfinity(3.14)).toBe(false);
        });
    });
});

describe(isFinite, () => {
    describe('when given a positive infinity', () => {
        it('returns false', () => {
            // eslint-disable-next-line unicorn/prefer-number-properties -- test value
            expect(isFinite(Infinity)).toBe(false);
            expect(isFinite(Number.POSITIVE_INFINITY)).toBe(false);
        });
    });

    describe('when given a negative infinity', () => {
        it('returns false', () => {
            // eslint-disable-next-line unicorn/prefer-number-properties -- test value
            expect(isFinite(-Infinity)).toBe(false);
            expect(isFinite(Number.NEGATIVE_INFINITY)).toBe(false);
        });
    });

    describe('when given NaN', () => {
        it('returns true', () => {
            expect(isFinite(Number.NaN)).toBe(false);
        });
    });

    describe('when given a finite number', () => {
        it('returns true', () => {
            expect(isFinite(3.14)).toBe(true);
        });
    });
});

describe(assertIsFinite, () => {
    describe('assertIsFinite(value)', () => {
        describe('when given a positive infinity', () => {
            it('throws an exception', () => {
                expect(() => assertIsFinite(Number.POSITIVE_INFINITY))
                    .toThrow('`value` must be `FiniteNumber`, but was `Infinity`');
                // eslint-disable-next-line unicorn/prefer-number-properties -- test value
                expect(() => assertIsFinite(Infinity))
                    .toThrow('`value` must be `FiniteNumber`, but was `Infinity`');
            });
        });

        describe('when given a negative infinity', () => {
            it('throws an exception', () => {
                expect(() => assertIsFinite(Number.NEGATIVE_INFINITY))
                    .toThrow('`value` must be `FiniteNumber`, but was `-Infinity`');
                // eslint-disable-next-line unicorn/prefer-number-properties -- test value
                expect(() => assertIsFinite(-Infinity))
                    .toThrow('`value` must be `FiniteNumber`, but was `-Infinity`');
            });
        });

        describe('when given NaN', () => {
            it('throws an exception', () => {
                expect(() => assertIsFinite(Number.NaN))
                    .toThrow('`value` must be `FiniteNumber`, but was `NaN`');
            });
        });

        describe('when given a finite number', () => {
            it('does not throw', () => {
                expect(() => assertIsFinite(3.14)).not.toThrow();
                expect(() => assertIsFinite(0)).not.toThrow();
                expect(() => assertIsFinite(-42)).not.toThrow();
            });
        });
    });

    describe('assertIsFinite(name, value)', () => {
        describe('when given a positive infinity', () => {
            it('throws an exception', () => {
                expect(() => assertIsFinite('x', Number.POSITIVE_INFINITY))
                    .toThrow('`x` must be `FiniteNumber`, but was `Infinity`');
                // eslint-disable-next-line unicorn/prefer-number-properties -- test value
                expect(() => assertIsFinite('x', Infinity))
                    .toThrow('`x` must be `FiniteNumber`, but was `Infinity`');
            });
        });

        describe('when given a negative infinity', () => {
            it('throws an exception', () => {
                expect(() => assertIsFinite('x', Number.NEGATIVE_INFINITY))
                    .toThrow('`x` must be `FiniteNumber`, but was `-Infinity`');
                // eslint-disable-next-line unicorn/prefer-number-properties -- test value
                expect(() => assertIsFinite('x', -Infinity))
                    .toThrow('`x` must be `FiniteNumber`, but was `-Infinity`');
            });
        });

        describe('when given NaN', () => {
            it('throws an exception', () => {
                expect(() => assertIsFinite('x', Number.NaN))
                    .toThrow('`x` must be `FiniteNumber`, but was `NaN`');
            });
        });

        describe('when given a finite number', () => {
            it('does not throw', () => {
                expect(() => assertIsFinite('x', 3.14)).not.toThrow();
                expect(() => assertIsFinite('x', 0)).not.toThrow();
                expect(() => assertIsFinite('x', -42)).not.toThrow();
            });
        });
    });
});
