import { maximum, minimum } from './set';

describe(maximum, () => {
    describe('when given an empty array', () => {
        it('returns null', () => {
            expect(maximum([]))
                .toBeNull();
        });
    });

    describe('when an array has one element', () => {
        it('returns the element', () => {
            expect(maximum([0]))
                .toBe(0);
        });
    });

    describe('when an array contains NaN', () => {
        it('disregards NaN values', () => {
            expect(maximum([0, Number.NaN]))
                .toBe(0);
            expect(maximum([Number.NaN]))
                .toBeNull();
        });
    });

    describe('when an array contains only NaN', () => {
        it('returns null', () => {
            expect(maximum([Number.NaN, Number.NaN]))
                .toBeNull();
        });
    });

    describe('when an array has more than one element', () => {
        it('returns the maximum element', () => {
            expect(maximum([-1, 0, 1]))
                .toBe(1);
        });
    });

    describe('when an array contains Number.POSITIVE_INFINITY', () => {
        it('returns Number.POSITIVE_INFINITY', () => {
            expect(maximum([Number.NaN, 0, Number.MAX_SAFE_INTEGER, Number.MAX_VALUE, Number.POSITIVE_INFINITY]))
                .toStrictEqual(Number.POSITIVE_INFINITY);
        });
    });

    describe('when an array contains Number.MAX_VALUE', () => {
        it('returns Number.MAX_VALUE', () => {
            expect(maximum([Number.NaN, 0, Number.MAX_SAFE_INTEGER, Number.MAX_VALUE]))
                .toStrictEqual(Number.MAX_VALUE);
        });
    });

    describe('when an array contains Number.MAX_SAFE_INTEGER', () => {
        it('returns Number.MAX_SAFE_INTEGER', () => {
            expect(maximum([Number.NaN, 0, Number.MAX_SAFE_INTEGER]))
                .toStrictEqual(Number.MAX_SAFE_INTEGER);
        });
    });
});

describe(minimum, () => {
    describe('when given an empty array', () => {
        it('returns null', () => {
            expect(minimum([]))
                .toBeNull();
        });
    });

    describe('when an array has one element', () => {
        it('returns the element', () => {
            expect(minimum([0]))
                .toBe(0);
        });
    });

    describe('when an array contains NaN', () => {
        it('disregards NaN values', () => {
            expect(minimum([0, Number.NaN]))
                .toBe(0);
            expect(minimum([Number.NaN]))
                .toBeNull();
        });
    });

    describe('when an array contains only NaN', () => {
        it('returns null', () => {
            expect(minimum([Number.NaN, Number.NaN]))
                .toBeNull();
        });
    });

    describe('when an array has more than one element', () => {
        it('returns the minimum element', () => {
            expect(minimum([-1, 0, 1]))
                .toBe(-1);
        });
    });

    describe('when an array contains Number.NEGATIVE_INFINITY', () => {
        it('returns Number.NEGATIVE_INFINITY', () => {
            expect(minimum([Number.NaN, Number.MIN_VALUE, 0, Number.MIN_SAFE_INTEGER, Number.NEGATIVE_INFINITY]))
                .toStrictEqual(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when an array contains Number.MIN_VALUE', () => {
        it('returns Number.MIN_VALUE', () => {
            expect(minimum([Number.NaN, Number.MIN_VALUE, 0, Number.MIN_SAFE_INTEGER]))
                .toStrictEqual(Number.MIN_SAFE_INTEGER);
        });
    });

    describe('when an array contains only Number.MIN_VALUE and 0', () => {
        // Number.MIN_VALUE is 5e-324 (as positive number)
        it('returns 0', () => {
            expect(minimum([Number.MIN_VALUE, 0]))
                .toBe(0);
        });
    });
});
