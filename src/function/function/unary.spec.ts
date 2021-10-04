import { isUnary, same } from './unary';

describe('isUnary', () => {
    it('returns true when the given function accepts one argument', () => {
        expect(isUnary((a: number): number => a))
            .toBe(true);
    });

    it('returns true when the given function accept one argument and a variadic argument', () => {
        expect(isUnary((a: number, ...b: number[]): number => a + b.length))
            .toBe(true);
    });

    it('returns false when the given function accepts a variadic argument', () => {
        expect(isUnary((...a: number[]): number[] => a))
            .toBe(false);
    });

    it('returns false when the given function accepts less than one argument', () => {
        expect(isUnary(() => null))
            .toBe(false);
    });

    it('returns false when the given function accepts more than one argument', () => {
        expect(isUnary((a: number, b: number): number => a + b))
            .toBe(false);
    });
});

describe('same', () => {
    it('creates a function that returns the passed value', () => {
        expect(same()(3.14)).toBe(3.14);
    });
});
