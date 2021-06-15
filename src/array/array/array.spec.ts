import { descending } from '../../number/number/order';

import {
    array,
    arrayFromArrayLike,
    arrayFromIterable,
    concatenated,
    copy,
    flatten,
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

describe('array', () => {
    it('creates an array of given elements', () => {
        expect(array('a', 'b', 'c'))
            .toStrictEqual(['a', 'b', 'c']);
    });
});

describe('arrayFromIterable', () => {
    it('creates an array from an iterable object', () => {
        expect(arrayFromIterable(new Map([
            ['a', 'x'],
            ['b', 'y'],
            ['c', 'z'],
        ]))).toStrictEqual([
            ['a', 'x'],
            ['b', 'y'],
            ['c', 'z'],
        ]);
        expect(arrayFromIterable(new Set([
            'a',
            'b',
            'c',
        ]))).toStrictEqual(['a', 'b', 'c']);
    });
});

describe('arrayFromArrayLike', () => {
    it('creates an array from an array-like object', () => {
        expect(arrayFromArrayLike('alphabet'))
            .toStrictEqual(['a', 'l', 'p', 'h', 'a', 'b', 'e', 't']);
    });
});

describe('copy', () => {
    it('creates a shallow copy of an array', () => {
        expect(copy(alphabet))
            .toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f']);
        expect(copy(alphabet))
            .not.toBe(alphabet);
    });
});

describe('concatenated', () => {
    it('creates a new array from a list of arrays', () => {
        expect(concatenated([]))
            .toStrictEqual([]);
        expect(concatenated(['a', 'b', 'c'], ['d', 'e'], ['f']))
            .toStrictEqual(alphabet);
    });
});

describe('flatten', () => {
    it('creates a new array from an array of arrays', () => {
        expect(flatten([]))
            .toStrictEqual([]);
        expect(flatten([['a', 'b', 'c'], ['d', 'e'], ['f']]))
            .toStrictEqual(alphabet);
    });
});

describe('intersection', () => {
    it('returns an array of values that included in both arrays', () => {
        expect(intersection(
            [0, 1, 2, 3],
            [5, 4, 3, 2, 1, 2, 3, 4, 5],
        )).toStrictEqual([3, 2, 1]);
    });

    it('returns an empty array when one of the inputs is empty', () => {
        expect(intersection(
            [1, 2, 3],
            [],
        )).toStrictEqual([]);
    });
});

describe('replicated', () => {
    describe('replicated(value, length)', () => {
        it('creates an array of the given "length" with each elements equal the given "value"', () => {
            expect(replicated(true, 3))
                .toStrictEqual([true, true, true]);
            expect(replicated(false, 0))
                .toStrictEqual([]);
        });

        it('throws a RangeError for a negative "length"', () => {
            expect(() => replicated(true, -3))
                .toThrow(RangeError);
            expect(() => replicated(true, -1))
                .toThrow('Invalid array length');
        });

        it('throws a RangeError for a real "length"', () => {
            expect(() => replicated(true, 3.14))
                .toThrow(RangeError);
            expect(() => replicated(true, 2.71))
                .toThrow('Invalid array length');
        });
    });

    describe('replicated(length)', () => {
        it('creates an array of the given "length" with each elements equal the given "value"', () => {
            expect(replicated(3)(false))
                .toStrictEqual([false, false, false]);
            expect(replicated(0)(null))
                .toStrictEqual([]);
        });

        it('throws a RangeError for a negative "length"', () => {
            expect(() => replicated(-3)(3.14))
                .toThrow(RangeError);
            expect(() => replicated(-1)(3.14))
                .toThrow('Invalid array length');
        });

        it('throws a RangeError for a real "length"', () => {
            expect(() => replicated(3.14)(0))
                .toThrow(RangeError);
            expect(() => replicated(2.71)(0))
                .toThrow('Invalid array length');
        });
    });
});

describe('reversed', () => {
    it('creates a reversed shallow copy of an array', () => {
        expect(reversed(alphabet))
            .toStrictEqual(['f', 'e', 'd', 'c', 'b', 'a']);
        expect(reversed(alphabet))
            .not.toBe(alphabet);
    });
});

describe('sorted', () => {
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

describe('unique', () => {
    it('creates an array with all unique elements keeping the order of the first elements', () => {
        expect(unique([]))
            .toStrictEqual([]);
        expect(unique([0, 0, 0]))
            .toStrictEqual([0]);
        expect(unique(['a', 'b', 'c', 'd', 'd', 'c', 'b', 'a']))
            .toStrictEqual(['a', 'b', 'c', 'd']);
    });

    it('filters values with the strict check', () => {
        expect(unique([{}, {}]))
            .toStrictEqual([{}, {}]);
    });
});

describe('wrapped', () => {
    it('returns the original array when the value is an array', () => {
        expect(wrapped(['a', 'b', 'c']))
            .toStrictEqual(['a', 'b', 'c']);
    });

    it('returns an array with a single element when the value is not an array', () => {
        expect(wrapped({}))
            .toStrictEqual([{}]);
        expect(wrapped(0))
            .toStrictEqual([0]);
    });
});

describe('isArray', () => {
    it('returns true when value is an array', () => {
        expect(isArray(['0', 0]))
            .toStrictEqual(true);
    });

    it('returns false when value is not an array', () => {
        expect(isArray(0))
            .toStrictEqual(false);
    });
});

describe('isNotArray', () => {
    it('returns true when value is not an array', () => {
        expect(isNotArray('0'))
            .toStrictEqual(true);
    });

    it('returns false when value is an array', () => {
        expect(isNotArray(['0', 0]))
            .toStrictEqual(false);
    });
});
