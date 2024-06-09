import { describe, expect, it } from '@jest/globals';

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

describe(head, () => {
    describe('when given a non-empty array', () => {
        it('returns the first element', () => {
            expect(head([2.71, 3.14]))
                .toBe(2.71);
            expect(head([null, 3.14]))
                .toBeNull();
            expect(head([undefined, 3.14]))
                .toBeUndefined();
        });
    });

    describe('when given an empty array', () => {
        it('returns undefined', () => {
            expect(head<string>([]))
                .toBeUndefined();
        });
    });
});

describe(tail, () => {
    describe('when given an array with at least 2 elements', () => {
        it('returns a sub-array of the given array without the first element', () => {
            expect(tail([0, 1, 2.71, 3.14]))
                .toStrictEqual([1, 2.71, 3.14]);
            expect(tail([2.71, null]))
                .toStrictEqual([null]);
            expect(tail([2.71, undefined]))
                .toStrictEqual([undefined]);
        });
    });

    describe('when given an empty array', () => {
        it('returns an empty array', () => {
            expect(tail<string>([]))
                .toStrictEqual([]);
        });
    });

    describe('when given an array with one element', () => {
        it('returns an empty array', () => {
            expect(tail<number>([0]))
                .toStrictEqual([]);
        });
    });
});

describe(end, () => {
    describe('when given a non-empty array', () => {
        it('returns the last element', () => {
            expect(end([3.14]))
                .toBe(3.14);
            expect(end([3.14, null]))
                .toBeNull();
            expect(end([3.14, 2.71, undefined]))
                .toBeUndefined();
        });
    });

    describe('when given an empty array', () => {
        it('returns undefined', () => {
            expect(end<string>([]))
                .toBeUndefined();
        });
    });
});

describe(init, () => {
    describe('when a given array has at least two elements', () => {
        it('returns a sub-array of the given array without the last element', () => {
            expect(init([0, 1, 2.71, 3.14]))
                .toStrictEqual([0, 1, 2.71]);
            expect(init([null, 2.71]))
                .toStrictEqual([null]);
            expect(init([undefined, 2.71]))
                .toStrictEqual([undefined]);
        });
    });

    describe('when given an empty array', () => {
        it('returns an empty array', () => {
            expect(init<string>([]))
                .toStrictEqual([]);
        });
    });

    describe('when given an array with one element', () => {
        it('returns an empty array', () => {
            expect(init<number>([0]))
                .toStrictEqual([]);
        });
    });
});

describe(element, () => {
    describe('element(n)', () => {
        describe('when element at a given index is defined', () => {
            it('returns the element', () => {
                expect(element(2)([0, 2.71, 3.14]))
                    .toBe(3.14);
            });
        });

        describe('when element at a given index is not defined', () => {
            it('returns undefined', () => {
                expect(element(2)([2.71, 3.14]))
                    .toBeUndefined();
            });
        });
    });
});

describe(first, () => {
    describe('first()', () => {
        describe('when input is a non-empty array', () => {
            it('returns a sub-array with the first element of an array', () => {
                expect(first()([2.71, 3.14]))
                    .toStrictEqual([2.71]);
            });
        });

        describe('when the input array is empty', () => {
            it('returns an empty array', () => {
                expect(first()([]))
                    .toStrictEqual([]);
            });
        });
    });

    describe('first(count)', () => {
        describe('when the input array length is greater than a given `count`', () => {
            it('returns a sub-array with the first n elements of the input array', () => {
                expect(first(3)([0, 2.71, 3.14, -1]))
                    .toStrictEqual([0, 2.71, 3.14]);
            });
        });

        describe('when the input array length is less than or equal a given `count`', () => {
            it('returns a shallow copy of the input array', () => {
                expect(first(3)([0, 2.71]))
                    .toStrictEqual([0, 2.71]);
            });
        });

        describe('when the input array is empty', () => {
            it('returns an empty array', () => {
                expect(first(3)([]))
                    .toStrictEqual([]);
            });
        });
    });
});

describe(last, () => {
    describe('last()', () => {
        describe('when the input array is not empty', () => {
            it('returns a sub-array with the last element of the input array', () => {
                expect(last()([2.71, 3.14]))
                    .toStrictEqual([3.14]);
            });
        });

        describe('when the input array is empty', () => {
            it('returns an empty array', () => {
                expect(last()([]))
                    .toStrictEqual([]);
            });
        });
    });

    describe('last(count)', () => {
        describe('when the input array length is greater than a given `count`', () => {
            it('returns a sub-array with the last n elements of the input array', () => {
                expect(last(3)([0, 2.71, 3.14, -1]))
                    .toStrictEqual([2.71, 3.14, -1]);
            });
        });

        describe('when the input array length is less than or equal to a given `count`', () => {
            it('returns a shallow copy of the input array', () => {
                expect(last(3)([0, 2.71]))
                    .toStrictEqual([0, 2.71]);
            });
        });

        describe('when the input array is empty', () => {
            it('returns an empty array', () => {
                expect(last(3)([]))
                    .toStrictEqual([]);
            });
        });
    });
});

describe(append, () => {
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

describe(insert, () => {
    describe('insert(index, element)', () => {
        it('creates a new array with a given `element` inserted at the given index', () => {
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

describe(insertInto, () => {
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

describe(replace, () => {
    describe('replace(index, element)', () => {
        it('creates a new array with a given `index` replaced by a given `element`', () => {
            expect(replace(1, 3.14)([]))
                .toStrictEqual([3.14]);
            expect(replace(1, 3.14)([1, 2, 3]))
                .toStrictEqual([1, 3.14, 3]);
            expect(replace(2, 3.14)([1, 2, 3]))
                .toStrictEqual([1, 2, 3.14]);
        });
    });
});

describe(remove, () => {
    describe('remove(index)', () => {
        it('creates a new array without an element at a given `index`', () => {
            expect(remove(1)([]))
                .toStrictEqual([]);
            expect(remove(0)([3.14]))
                .toStrictEqual([]);
            expect(remove(1)([2.23, 2.71, 3.14]))
                .toStrictEqual([2.23, 3.14]);
        });
    });
});
