import { describe, expect, it } from '@jest/globals';

import { constant } from '../../function/function/nullary';

import { isFalse, isTrue, negated } from './proposition';

describe(isTrue, () => {
    describe('when a given value is true', () => {
        it('returns true', () => {
            expect(isTrue(true)).toBe(true);
        });
    });

    describe('when a given function returns true', () => {
        it('returns true', () => {
            expect(isTrue(constant(true))).toBe(true);
        });
    });

    describe('when a given value is false', () => {
        it('returns false', () => {
            expect(isTrue(false)).toBe(false);
        });
    });

    describe('when a given function returns false', () => {
        it('returns false', () => {
            expect(isTrue(constant(false))).toBe(false);
        });
    });
});

describe(isFalse, () => {
    describe('when a given value is true', () => {
        it('returns false', () => {
            expect(isFalse(true)).toBe(false);
        });
    });

    describe('when a given function returns true', () => {
        it('returns false', () => {
            expect(isFalse(constant(true))).toBe(false);
        });
    });

    describe('when a given value is false', () => {
        it('returns true', () => {
            expect(isFalse(false)).toBe(true);
        });
    });

    describe('when a given function returns false', () => {
        it('returns true', () => {
            expect(isFalse(constant(false))).toBe(true);
        });
    });
});

describe(negated, () => {
    describe('when a given value is true', () => {
        it('returns false', () => {
            expect(negated(true)).toBe(false);
        });
    });

    describe('when a given function returns true', () => {
        it('returns false', () => {
            expect(negated(constant(true))).toBe(false);
        });
    });

    describe('when a given value is false', () => {
        it('returns true', () => {
            expect(negated(false)).toBe(true);
        });
    });

    describe('when a given function returns false', () => {
        it('returns true', () => {
            expect(negated(constant(false))).toBe(true);
        });
    });
});
