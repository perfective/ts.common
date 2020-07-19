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
        const elementN = element(2);

        it('returns an array element by index if element is defined', () => {
            expect(elementN([0, 2.71, 3.14]))
                .toStrictEqual(3.14);
        });

        it('returns undefined when element by index is not defined', () => {
            expect(elementN([2.71, 3.14]))
                .toBeUndefined();
        });
    });
});

describe('first', () => {
    describe('first()', () => {
        const first1 = first();

        it('returns a sub-array with the first element of an array', () => {
            expect(first1([2.71, 3.14]))
                .toStrictEqual([2.71]);
        });

        it('returns an empty array when an input array is empty', () => {
            expect(first1([]))
                .toStrictEqual([]);
        });
    });

    describe('first(n)', () => {
        const firstN = first(3);

        it('returns a sub-array with the first n elements of an array', () => {
            expect(firstN([0, 2.71, 3.14, -1]))
                .toStrictEqual([0, 2.71, 3.14]);
        });

        it('returns a full array when array is shorter than n', () => {
            expect(firstN([0, 2.71]))
                .toStrictEqual([0, 2.71]);
        });

        it('returns an empty array when an input array is empty', () => {
            expect(firstN([]))
                .toStrictEqual([]);
        });
    });
});

describe('last', () => {
    describe('last()', () => {
        const last1 = last();

        it('returns a sub-array with the last element of an input array', () => {
            expect(last1([2.71, 3.14]))
                .toStrictEqual([3.14]);
        });

        it('returns an empty array when an input array is empty', () => {
            expect(last1([]))
                .toStrictEqual([]);
        });
    });

    describe('last(n)', () => {
        const lastN = last(3);

        it('returns a sub-array with the last n elements of an input array', () => {
            expect(lastN([0, 2.71, 3.14, -1]))
                .toStrictEqual([2.71, 3.14, -1]);
        });

        it('returns a full array when an input array is shorter than n', () => {
            expect(lastN([0, 2.71]))
                .toStrictEqual([0, 2.71]);
        });

        it('returns an empty array when an input array is empty', () => {
            expect(lastN([]))
                .toStrictEqual([]);
        });
    });
});
