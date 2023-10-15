import { descending } from '../../number/number/order';

import {
    array,
    concatenated,
    copy,
    elements,
    intersection,
    isArray,
    isNotArray,
    replicated,
    reversed,
    sorted,
    unique,
    wrapped,
} from './array';

const alphabet: string[] = ['a', 'b', 'c', 'd', 'e', 'f'];

describe(array, () => {
    it('creates an array of given elements', () => {
        expect(array('a', 'b', 'c'))
            .toStrictEqual(['a', 'b', 'c']);
    });
});

describe(elements, () => {
    describe('elements(ArrayLike)', () => {
        it('creates an array from an ArrayLike object', () => {
            expect(elements('alphabet'))
                .toStrictEqual(['a', 'l', 'p', 'h', 'a', 'b', 'e', 't']);
        });
    });

    describe('elements(Iterable)', () => {
        it('creates an array from an Iterable object', () => {
            expect(elements(new Map([
                ['a', 'x'],
                ['b', 'y'],
                ['c', 'z'],
            ]))).toStrictEqual([
                ['a', 'x'],
                ['b', 'y'],
                ['c', 'z'],
            ]);
            expect(elements(new Set([
                'a',
                'b',
                'c',
            ]))).toStrictEqual(['a', 'b', 'c']);
        });
    });
});

describe(copy, () => {
    it('creates a shallow copy of an array', () => {
        expect(copy(alphabet))
            .toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f']);
        expect(copy(alphabet))
            .not.toBe(alphabet);
    });
});

describe(concatenated, () => {
    describe('concatenated(initial)', () => {
        it('creates an empty array', () => {
            expect(concatenated([]))
                .toStrictEqual([]);
        });
    });

    describe('concatenated(initial, arrays)', () => {
        it('concatenates given arrays in order they were given', () => {
            expect(concatenated(['a', 'b', 'c'], ['d', 'e'], ['f']))
                .toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f']);

            expect(concatenated([['a'], ['b'], ['c']], []))
                .toStrictEqual([['a'], ['b'], ['c']]);
        });
    });

    describe('concatenated(arrays)', () => {
        it('concatenates given arrays in order they were given', () => {
            expect(concatenated([['a', 'b'], ['c', 'd'], ['e', 'f']]))
                .toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f']);
        });
    });
});

describe(intersection, () => {
    it('returns an array of values that included in both arrays', () => {
        expect(intersection(
            [0, 1, 2, 3],
            [5, 4, 3, 2, 1, 2, 3, 4, 5],
        )).toStrictEqual([3, 2, 1]);
    });

    describe('when one of the inputs is empty', () => {
        it('returns an empty array', () => {
            expect(intersection(
                [1, 2, 3],
                [],
            )).toStrictEqual([]);
        });
    });
});

describe(replicated, () => {
    describe('replicated(value, count)', () => {
        it('creates an array with a given `count` of elements equal to a given `value`', () => {
            expect(replicated(true, 3))
                .toStrictEqual([true, true, true]);
            expect(replicated(false, 0))
                .toStrictEqual([]);
        });

        describe('when given a negative `count`', () => {
            it('throws a RangeError', () => {
                expect(() => replicated(true, -3))
                    .toThrow(RangeError);
                expect(() => replicated(true, -1))
                    .toThrow('Invalid array length');
            });
        });

        describe('when given a float `count`', () => {
            it('throws a RangeError', () => {
                expect(() => replicated(true, 3.14))
                    .toThrow(RangeError);
                expect(() => replicated(true, 2.71))
                    .toThrow('Invalid array length');
            });
        });
    });

    describe('replicated(count)', () => {
        it('creates an array with a given `count` of elements equal to a given `value`', () => {
            expect(replicated(3)(false))
                .toStrictEqual([false, false, false]);
            expect(replicated(0)(null))
                .toStrictEqual([]);
        });

        describe('when given a negative `count`', () => {
            it('throws a RangeError', () => {
                expect(() => replicated(-3)(3.14))
                    .toThrow(RangeError);
                expect(() => replicated(-1)(3.14))
                    .toThrow('Invalid array length');
            });
        });

        describe('when given a float `count`', () => {
            it('throws a RangeError', () => {
                expect(() => replicated(3.14)(0))
                    .toThrow(RangeError);
                expect(() => replicated(2.71)(0))
                    .toThrow('Invalid array length');
            });
        });
    });
});

describe(reversed, () => {
    it('creates a reversed shallow copy of an array', () => {
        expect(reversed(alphabet))
            .toStrictEqual(['f', 'e', 'd', 'c', 'b', 'a']);
        expect(reversed(alphabet))
            .not.toBe(alphabet);
    });
});

describe(sorted, () => {
    describe('sorted(array)', () => {
        it('creates a sorted shallow copy of an array', () => {
            expect(sorted(alphabet))
                .toStrictEqual(alphabet);
            expect(sorted(alphabet))
                .not.toBe(alphabet);
            expect(sorted([1, 2, 10, 20]))
                .toStrictEqual([1, 10, 2, 20]);
        });
    });

    describe('sorted(array, order)', () => {
        it('creates a sorted shallow copy of an array ordered by the given compare function', () => {
            expect(sorted([1, 2, 10, 20], descending))
                .toStrictEqual([20, 10, 2, 1]);
        });
    });

    describe('sorted()', () => {
        it('returns a shallow copy of a given array', () => {
            expect(sorted()(alphabet))
                .not.toBe(alphabet);
            expect(sorted()([1, 2, 10, 20]))
                .toStrictEqual([1, 10, 2, 20]);
        });
    });

    describe('sorted(order)', () => {
        it('returns a shallow copy of a given array ordered by the given "order" function', () => {
            expect(sorted(descending)([1, 2, 10, 20]))
                .toStrictEqual([20, 10, 2, 1]);
        });
    });
});

describe(unique, () => {
    it('creates an array with all unique elements keeping the order of the first elements', () => {
        expect(unique([]))
            .toStrictEqual([]);
        expect(unique([0, 0, 0]))
            .toStrictEqual([0]);
        expect(unique(['a', 'b', 'c', 'd', 'd', 'c', 'b', 'a']))
            .toStrictEqual(['a', 'b', 'c', 'd']);
    });

    it('filters values using a strict equality check', () => {
        expect(unique([{}, {}]))
            .toStrictEqual([{}, {}]);
    });
});

describe(wrapped, () => {
    describe('when given an array', () => {
        it('returns the given array', () => {
            expect(wrapped(['a', 'b', 'c']))
                .toStrictEqual(['a', 'b', 'c']);
        });
    });

    describe('when given a non-array value', () => {
        it('returns an array with the given value as the only element', () => {
            expect(wrapped({}))
                .toStrictEqual([{}]);
            expect(wrapped(0))
                .toStrictEqual([0]);
        });
    });
});

describe(isArray, () => {
    describe('when given value is an array', () => {
        it('returns true', () => {
            expect(isArray(['0', 0]))
                .toBe(true);
        });
    });

    describe('when given value is not an array', () => {
        it('returns false', () => {
            expect(isArray(0))
                .toBe(false);
        });
    });
});

describe(isNotArray, () => {
    describe('when given value is not an array', () => {
        it('returns true', () => {
            expect(isNotArray('0'))
                .toBe(true);
        });
    });

    describe('when given value is an array', () => {
        it('returns false', () => {
            expect(isNotArray(['0', 0]))
                .toBe(false);
        });
    });
});
