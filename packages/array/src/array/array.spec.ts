import { descending } from '@perfective/real';

import {
    array,
    arrayFromArrayLike,
    arrayFromIterable,
    concatenated,
    copy,
    flatten,
    isArray,
    isEmpty,
    isNotArray,
    isNotEmpty,
    length,
    reversed,
    sorted,
    unique,
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

describe('isEmpty', () => {
    it('returns true when an array is empty', () => {
        expect(isEmpty([]))
            .toStrictEqual(true);
    });

    it('returns false when an array is not empty', () => {
        expect(isEmpty([0]))
            .toStrictEqual(false);
    });
});

describe('isNotEmpty', () => {
    it('returns true when an array is not empty', () => {
        expect(isNotEmpty([false]))
            .toStrictEqual(true);
    });

    it('returns false when an array is empty', () => {
        expect(isNotEmpty([]))
            .toStrictEqual(false);
    });
});

describe('length', () => {
    it('returns the length of an array', () => {
        expect(length([]))
            .toStrictEqual(0);
        expect(length(['a', 'b', 'c']))
            .toStrictEqual(3);
    });
});
