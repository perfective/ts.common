import { element, first, head, last, tail } from './element';

describe('head', () => {
    it('returns the first element of a non-empty array', () => {
        expect(head([2.71, 3.14]))
            .toStrictEqual(2.71);
        expect(head([null, 3.14]))
            .toBeNull();
        expect(head([undefined, 3.14]))
            .toBeUndefined();
    });

    it('returns undefined when an array is empty', () => {
        expect(head([]))
            .toBeUndefined();
    });
});

describe('tail', () => {
    it('returns the last element of a non-empty array', () => {
        expect(tail([2.71, 3.14]))
            .toStrictEqual(3.14);
        expect(tail([2.71, null]))
            .toBeNull();
        expect(tail([2.71, undefined]))
            .toBeUndefined();
    });

    it('returns undefined when an array is empty', () => {
        expect(tail([]))
            .toBeUndefined();
    });
});

describe('element', () => {
    describe('element(n)', () => {
        it('returns an array element by index if element is defined', () => {
            expect(element(2)([0, 2.71, 3.14]))
                .toStrictEqual(3.14);
        });

        it('returns undefined when element by index is not defined', () => {
            expect(element(2)([2.71, 3.14]))
                .toBeUndefined();
        });
    });
});

describe('first', () => {
    describe('first()', () => {
        it('returns a sub-array with the first element of an array', () => {
            expect(first()([2.71, 3.14]))
                .toStrictEqual([2.71]);
        });

        it('returns an empty array when an input array is empty', () => {
            expect(first()([]))
                .toStrictEqual([]);
        });
    });

    describe('first(n)', () => {
        it('returns a sub-array with the first n elements of an array', () => {
            expect(first(3)([0, 2.71, 3.14, -1]))
                .toStrictEqual([0, 2.71, 3.14]);
        });

        it('returns a full array when array is shorter than n', () => {
            expect(first(3)([0, 2.71]))
                .toStrictEqual([0, 2.71]);
        });

        it('returns an empty array when an input array is empty', () => {
            expect(first(3)([]))
                .toStrictEqual([]);
        });
    });
});

describe('last', () => {
    describe('last()', () => {
        it('returns a sub-array with the last element of an input array', () => {
            expect(last()([2.71, 3.14]))
                .toStrictEqual([3.14]);
        });

        it('returns an empty array when an input array is empty', () => {
            expect(last()([]))
                .toStrictEqual([]);
        });
    });

    describe('last(n)', () => {
        it('returns a sub-array with the last n elements of an input array', () => {
            expect(last(3)([0, 2.71, 3.14, -1]))
                .toStrictEqual([2.71, 3.14, -1]);
        });

        it('returns a full array when an input array is shorter than n', () => {
            expect(last(3)([0, 2.71]))
                .toStrictEqual([0, 2.71]);
        });

        it('returns an empty array when an input array is empty', () => {
            expect(last(3)([]))
                .toStrictEqual([]);
        });
    });
});
