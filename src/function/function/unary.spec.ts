import { describe, expect, it } from '@jest/globals';

import { isUnary, same } from './unary';

describe(isUnary, () => {
    describe('when a given function accepts one argument', () => {
        it('returns true', () => {
            expect(isUnary((a: number): number => a))
                .toBe(true);
        });
    });

    describe('when a given function accept one argument and a variadic argument', () => {
        it('returns true', () => {
            expect(isUnary((a: number, ...b: number[]): number => a + b.length))
                .toBe(true);
        });
    });

    describe('when the first argument is variadic argument', () => {
        it('returns false', () => {
            expect(isUnary((...a: number[]): number[] => a))
                .toBe(false);
        });
    });

    describe('when the given function accepts less than one argument', () => {
        it('returns false', () => {
            expect(isUnary(() => null))
                .toBe(false);
        });
    });

    describe('when the given function accepts more than one argument', () => {
        it('returns false', () => {
            expect(isUnary((a: number, b: number): number => a + b))
                .toBe(false);
        });
    });
});

describe(same, () => {
    it('returns a given input', () => {
        expect(same(0)).toBe(0);
    });
});
