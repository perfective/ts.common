import { maximum, minimum } from './set';

describe('maximum', () => {
    it('returns null for an empty array', () => {
        expect(maximum([]))
            .toBeNull();
    });

    it('returns the only element when an array has one element', () => {
        expect(maximum([0]))
            .toBe(0);
    });

    it('disregards NaN values', () => {
        expect(maximum([0, Number.NaN]))
            .toBe(0);
        expect(maximum([Number.NaN]))
            .toBeNull();
    });

    it('returns the maximum element when an array has more than one element', () => {
        expect(maximum([-1, 0, 1]))
            .toBe(1);
        expect(maximum([Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]))
            .toStrictEqual(Number.POSITIVE_INFINITY);
        expect(maximum([Number.MIN_VALUE, Number.MAX_VALUE]))
            .toStrictEqual(Number.MAX_VALUE);
        expect(maximum([Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]))
            .toStrictEqual(Number.MAX_SAFE_INTEGER);
        expect(maximum([Number.MAX_VALUE, Number.MAX_SAFE_INTEGER]))
            .toStrictEqual(Number.MAX_VALUE);
        // eslint-disable-next-line jest/max-expects -- check that +Infinity is the maximum
        expect(maximum([Number.POSITIVE_INFINITY, Number.MAX_VALUE, Number.MAX_SAFE_INTEGER]))
            .toStrictEqual(Number.POSITIVE_INFINITY);
    });
});

describe('minimum', () => {
    it('returns null for an empty array', () => {
        expect(minimum([]))
            .toBeNull();
    });

    it('returns the only element when an array has one element', () => {
        expect(minimum([0]))
            .toBe(0);
    });

    it('disregards NaN values', () => {
        expect(minimum([0, Number.NaN]))
            .toBe(0);
        expect(minimum([Number.NaN]))
            .toBeNull();
    });

    it('returns the minimum element when an array has more than one element', () => {
        expect(minimum([-1, 0, 1]))
            .toBe(-1);
        expect(minimum([Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]))
            .toStrictEqual(Number.NEGATIVE_INFINITY);
        expect(minimum([Number.MIN_VALUE, Number.MAX_VALUE]))
            .toStrictEqual(Number.MIN_VALUE);
        expect(minimum([Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]))
            .toStrictEqual(Number.MIN_SAFE_INTEGER);
        expect(minimum([Number.MIN_VALUE, Number.MIN_SAFE_INTEGER]))
            .toStrictEqual(Number.MIN_SAFE_INTEGER);
        // eslint-disable-next-line jest/max-expects -- check that -Infinity is the minimum
        expect(minimum([Number.NEGATIVE_INFINITY, Number.MIN_VALUE, Number.MIN_SAFE_INTEGER]))
            .toStrictEqual(Number.NEGATIVE_INFINITY);
    });
});
