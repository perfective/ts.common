import {
    append,
    element,
    end,
    first,
    head,
    init,
    insert,
    insertInto,
    last,
    prepend,
    remove,
    replace,
    tail,
} from './element';

describe('head', () => {
    it('returns the first element of a non-empty array', () => {
        expect(head([2.71, 3.14]))
            .toBe(2.71);
        expect(head([null, 3.14]))
            .toBeNull();
        expect(head([undefined, 3.14]))
            .toBeUndefined();
    });

    it('returns undefined when an array is empty', () => {
        expect(head<string>([]))
            .toBeUndefined();
    });
});

describe('tail', () => {
    it('returns a sub-array of the given array without the first element when array has at least 2 elements', () => {
        expect(tail([0, 1, 2.71, 3.14]))
            .toStrictEqual([1, 2.71, 3.14]);
        expect(tail([2.71, null]))
            .toStrictEqual([null]);
        expect(tail([2.71, undefined]))
            .toStrictEqual([undefined]);
    });

    it('returns an empty array when the given array is empty', () => {
        expect(tail<string>([]))
            .toStrictEqual([]);
    });

    it('returns an empty array when the given array has one element', () => {
        expect(tail<number>([0]))
            .toStrictEqual([]);
    });
});

describe('end', () => {
    it('returns the last element of a non-empty array', () => {
        expect(end([3.14]))
            .toBe(3.14);
        expect(end([3.14, null]))
            .toBeNull();
        expect(end([3.14, 2.71, undefined]))
            .toBeUndefined();
    });

    it('returns undefined when an array is empty', () => {
        expect(end<string>([]))
            .toBeUndefined();
    });
});

describe('init', () => {
    it('returns a sub-array of the given array without the last element when array has at least 2 elements', () => {
        expect(init([0, 1, 2.71, 3.14]))
            .toStrictEqual([0, 1, 2.71]);
        expect(init([null, 2.71]))
            .toStrictEqual([null]);
        expect(init([undefined, 2.71]))
            .toStrictEqual([undefined]);
    });

    it('returns an empty array when the given array is empty', () => {
        expect(init<string>([]))
            .toStrictEqual([]);
    });

    it('returns an empty array when the given array has one element', () => {
        expect(init<number>([0]))
            .toStrictEqual([]);
    });
});

describe('element', () => {
    describe('element(n)', () => {
        it('returns an array element by index if element is defined', () => {
            expect(element(2)([0, 2.71, 3.14]))
                .toBe(3.14);
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

describe('append', () => {
    describe('append(element)', () => {
        it('creates a new array with the "element" added to the end of the array', () => {
            expect(append(3.14)([]))
                .toStrictEqual([3.14]);
            expect(append(3.14)([2.71]))
                .toStrictEqual([2.71, 3.14]);
        });
    });
});

describe('prepend', () => {
    describe('prepend(element)', () => {
        it('creates a new array with the "element" added to the beginning of the array', () => {
            expect(prepend(3.14)([]))
                .toStrictEqual([3.14]);
            expect(prepend(3.14)([2.71]))
                .toStrictEqual([3.14, 2.71]);
        });
    });
});

describe('insert', () => {
    describe('insert(index, element)', () => {
        it('creates a new array with the "element" inserted in the given index', () => {
            expect(insert(0, 3.14)([]))
                .toStrictEqual([3.14]);
            expect(insert(1, 3.14)([]))
                .toStrictEqual([3.14]);
            expect(insert(2, 3.14)([2.71]))
                .toStrictEqual([2.71, 3.14]);
            expect(insert(0, 3.14)([2.71]))
                .toStrictEqual([3.14, 2.71]);
        });
    });
});

describe('insertInto', () => {
    const input: number[] = [0, 3.14];
    const element: number = 2.71;

    describe('insert element into the 0 index', () => {
        it('inserts element into the beginning of the array and shifts the rest of the elements', () => {
            expect(insertInto<number>([], 0)(element)).toStrictEqual([element]);
            expect(insertInto(input, 0)(element)).toStrictEqual([element, input[0], input[1]]);
        });
    });

    describe('insert element into the index in the middle of the array', () => {
        it('inserts element into the given index between the existing elements', () => {
            expect(insertInto(input, 1)(element)).toStrictEqual([input[0], element, input[1]]);
        });
    });

    describe('insert element into the index in end of the array', () => {
        it('inserts element after the existing elements', () => {
            expect(insertInto<number>([], 1)(element)).toStrictEqual([element]);
            expect(insertInto(input, input.length)(element)).toStrictEqual([input[0], input[1], element]);
            expect(insertInto(input, input.length + 1)(element)).toStrictEqual([input[0], input[1], element]);
        });
    });
});

describe('replace', () => {
    describe('replace(index, element)', () => {
        it('creates a new array with the given "index" replaced by the "element"', () => {
            expect(replace(1, 3.14)([]))
                .toStrictEqual([3.14]);
            expect(replace(1, 3.14)([1, 2, 3]))
                .toStrictEqual([1, 3.14, 3]);
            expect(replace(2, 3.14)([1, 2, 3]))
                .toStrictEqual([1, 2, 3.14]);
        });
    });
});

describe('remove', () => {
    describe('remove(index)', () => {
        it('creates a new array with removed element in the given "index"', () => {
            expect(remove(1)([]))
                .toStrictEqual([]);
            expect(remove(0)([3.14]))
                .toStrictEqual([]);
            expect(remove(1)([2.23, 2.71, 3.14]))
                .toStrictEqual([2.23, 3.14]);
        });
    });
});
