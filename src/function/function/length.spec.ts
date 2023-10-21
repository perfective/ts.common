import { hasLength, isEmpty, isNotEmpty, Length, length, toLongest, toShortest } from './length';

describe(isEmpty, () => {
    describe('when a given value length is less or equal to 0', () => {
        it('returns true', () => {
            expect(isEmpty({ length: 0 } as Length))
                .toBe(true);
            expect(isEmpty(() => null))
                .toBe(true);
        });
    });

    describe('when a given value length is greater than 0', () => {
        it('returns false', () => {
            expect(isEmpty({ length: 1 } as Length))
                .toBe(false);
            expect(isEmpty((value: number) => value))
                .toBe(false);
        });
    });
});

describe(isNotEmpty, () => {
    describe('when a given value length is greater than 0', () => {
        it('returns true', () => {
            expect(isNotEmpty({ length: 1 } as Length))
                .toBe(true);
            expect(isNotEmpty((value: number) => value))
                .toBe(true);
        });
    });

    describe('when a given value length is less or equal to 0', () => {
        it('returns false', () => {
            expect(isNotEmpty({ length: 0 } as Length))
                .toBe(false);
            expect(isNotEmpty(() => null))
                .toBe(false);
        });
    });
});

describe(length, () => {
    describe('when given an array', () => {
        it('returns the length of the array', () => {
            expect(length([]))
                .toBe(0);
            expect(length(['a', 'b', 'c']))
                .toBe(3);
        });
    });

    describe('when given a function', () => {
        it('returns the number of function arguments', () => {
            expect(length((a: number): number => a))
                .toBe(1);
        });

        it('does not count variadic argument', () => {
            expect(length((...a: number[]): number[] => a))
                .toBe(0);
        });
    });

    describe('when given a string', () => {
        it('returns the length of the string', () => {
            expect(length('')).toBe(0);
            expect(length('abc')).toBe(3);
        });
    });
});

describe(hasLength, () => {
    describe('hasLength(length)', () => {
        describe('when the input value has a given `length`', () => {
            it('returns true', () => {
                expect(hasLength(0)(''))
                    .toBe(true);
                expect(hasLength(1)(['']))
                    .toBe(true);
            });
        });

        describe('when the input value does not have a given `length`', () => {
            it('returns false', () => {
                expect(hasLength(0)(['']))
                    .toBe(false);
                expect(hasLength(1)(''))
                    .toBe(false);
            });
        });
    });
});

describe(toLongest, () => {
    it('reduces multiple arrays to the longest array', () => {
        expect([
            [0, 1, 2],
            [0, 1],
            [0],
        ].reduce(toLongest)).toStrictEqual([0, 1, 2]);
    });

    it('reduces array of strings to the longest string', () => {
        expect([
            'Hi',
            'Hello',
            'Hello, World',
        ].reduce(toLongest)).toBe('Hello, World');
    });

    it('includes the initial value when determining the longest array', () => {
        expect([
            [0, 1, 2],
            [0, 1],
            [0],
        ].reduce(toLongest, [0, 1, 2, 3])).toStrictEqual([0, 1, 2, 3]);
    });

    it('reduces an empty array to the given initial value', () => {
        expect(([] as number[][]).reduce(toLongest, []))
            .toStrictEqual([]);
        expect(([] as number[][]).reduce(toLongest, [0]))
            .toStrictEqual([0]);
        expect(([] as string[]).reduce(toLongest, ''))
            .toBe('');
    });
});

describe(toShortest, () => {
    it('reduces multiple arrays to the shortest array', () => {
        expect([
            [0, 1, 2],
            [0, 1],
            [0],
        ].reduce(toShortest)).toStrictEqual([0]);
    });

    it('includes the initial value when determining the shortest array', () => {
        expect([
            [0, 1, 2],
            [0, 1],
            [0],
        ].reduce(toShortest, [])).toStrictEqual([]);
    });

    it('reduces an empty array to the given initial value', () => {
        expect(([] as number[][]).reduce(toShortest, []))
            .toStrictEqual([]);
        expect(([] as number[][]).reduce(toShortest, [0]))
            .toStrictEqual([0]);
    });
});
