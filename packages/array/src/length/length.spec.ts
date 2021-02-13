import { isEmpty, isNotEmpty, length, toLongest, toShortest } from './length';

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

describe('toLongest', () => {
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
        ].reduce(toLongest)).toStrictEqual('Hello, World');
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
            .toStrictEqual('');
    });
});

describe('toShortest', () => {
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
