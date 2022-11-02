import { same } from '../../function/function/unary';
import { difference, sum } from '../../number/math/arithmetic';
import { decimal } from '../../number/number/base';
import { descending, isGreaterThan, isLessThan } from '../../number/number/order';

import {
    concat,
    copyWithin,
    entries,
    every,
    fill,
    filter,
    find,
    findIndex,
    forEach,
    includes,
    indexOf,
    join,
    keys,
    lastIndexOf,
    map,
    pop,
    push,
    reduce,
    reduceRight,
    reduceRightTo,
    reduceTo,
    reverse,
    shift,
    slice,
    some,
    sort,
    splice,
    spliceWith,
    unshift,
    values,
} from './lift';

const input: number[] = [1.20, 1.41, 1.61, 1.73, 2.23, 2.71, 3.14];

function copyOf(input: number[]): number[] {
    return input.map(same());
}

describe('concat', () => {
    it('returns a new array created by merged the given array to the value', () => {
        expect(concat([2.71, 3.14])([1.41, 1.73, 2.23]))
            .toStrictEqual([1.41, 1.73, 2.23, 2.71, 3.14]);
        expect(concat([2.71, 3.14], [1.20, 1.61])([1.41, 1.73, 2.23]))
            .toStrictEqual([1.41, 1.73, 2.23, 2.71, 3.14, 1.20, 1.61]);
    });
});

describe('copyWithin', () => {
    let copy: number[];

    beforeEach(() => {
        copy = copyOf(input);
    });

    describe('given the target 0', () => {
        it('returns the original array', () => {
            expect(copyWithin(0)(copy))
                .toBe(copy);
            expect(copyWithin(0)(copy))
                .toStrictEqual(input);
        });
    });

    describe('given a positive target index without a start', () => {
        it('copies elements from the beginning of the array into the given target index', () => {
            expect(copyWithin(2)(copy))
                .toStrictEqual([input[0], input[1], input[0], input[1], input[2], input[3], input[4]]);
        });
    });

    describe('given a positive target index with a start index', () => {
        it('copies elements from the given start index into the the given target index', () => {
            expect(copyWithin(2, 4)(copy))
                .toStrictEqual([input[0], input[1], input[4], input[5], input[6], input[5], input[6]]);
        });
    });

    describe('given the positive target index, start index, and an end index', () => {
        it('copies elements from the given start index to the given end index into the given target index', () => {
            expect(copyWithin(1, 4, 5)(copy))
                .toStrictEqual([input[0], input[4], input[2], input[3], input[4], input[5], input[6]]);
        });
    });

    describe('given the positive target index, start index, and an end index less than start index', () => {
        it('copies elements from the given start index to the given end index into the given target index', () => {
            expect(copyWithin(1, 4, 2)(copy))
                .toStrictEqual(input);
        });
    });

    it('shallow copies elements of an array to another location in the array', () => {
        expect(copyWithin(1, 4, -1)(copy))
            .toStrictEqual([input[0], input[4], input[5], input[3], input[4], input[5], input[6]]);
    });
});

describe('entries', () => {
    it('returns a new Array Iterator that contains key/value pairs for each index in the input array', () => {
        expect(entries(input).next().value)
            .toStrictEqual([0, 1.20]);
    });
});

describe('every', () => {
    describe('every(condition)', () => {
        it('returns true when every element satisfies the "condition"', () => {
            expect(every<number>(isGreaterThan(0))(input))
                .toBe(true);
        });

        it('returns false when at least one element does not satisfy the "condition"', () => {
            expect(every<number>(isLessThan(3))(input))
                .toBe(false);
        });
    });
});

describe('fill', () => {
    describe('fill(value)', () => {
        it('replaces all the values in the array with the given value', () => {
            const copy: number[] = input.map(same());

            expect(fill<number>(0)(copy))
                .toBe(copy);
            expect(fill<number>(0)([]))
                .toStrictEqual([]);
            expect(fill<number>(0)(copy))
                .toStrictEqual([0, 0, 0, 0, 0, 0, 0]);
        });
    });

    describe('fill(value, start)', () => {
        it('replaces the value in the array with the given array from the "start" index', () => {
            const copy: number[] = input.map(same());

            expect(fill<number>(0, 3)([]))
                .toStrictEqual([]);
            expect(fill<number>(0, 3)(copy))
                .toStrictEqual([1.20, 1.41, 1.61, 0, 0, 0, 0]);
        });
    });

    describe('fill(value, start, end)', () => {
        it('replaces the value in the array with the given array from the "start" to the "end" index', () => {
            const copy: number[] = input.map(same());

            expect(fill<number>(0, 3, 5)([]))
                .toStrictEqual([]);
            expect(fill<number>(0, 3, 5)(copy))
                .toStrictEqual([1.20, 1.41, 1.61, 0, 0, 2.71, 3.14]);
        });
    });
});

describe('filter', () => {
    describe('filter(condition)', () => {
        it('returns an array with elements that match the condition', () => {
            expect(filter<number>(isGreaterThan(2))([]))
                .toStrictEqual([]);
            expect(filter<number>(isGreaterThan(2))(input))
                .toStrictEqual([2.23, 2.71, 3.14]);
        });
    });
});

describe('find', () => {
    describe('find(condition)', () => {
        it('returns the value of the first element in the array that matches the "condition"', () => {
            expect(find<number>(isGreaterThan(2))(input))
                .toBe(2.23);
        });

        it('returns undefined if there is no element in the array that matches the "condition"', () => {
            expect(find<number>(isGreaterThan(4))(input))
                .toBeUndefined();
        });
    });
});

describe('findIndex', () => {
    describe('findIndex(condition)', () => {
        it('returns the index of the first element in the array that matches the "condition"', () => {
            expect(findIndex<number>(isGreaterThan(2))(input))
                .toBe(4);
        });

        it('returns -1 if there is no element in the array that matches the "condition"', () => {
            expect(findIndex<number>(isGreaterThan(4))(input))
                .toBe(-1);
        });
    });
});

describe('forEach', () => {
    describe('forEach(procedure)', () => {
        it('calls the "procedure" for each element of the array', () => {
            const copy: number[] = [];

            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- testing void return
            expect(forEach<number>(value => copy.push(value))(input))
                .toBeUndefined();
            expect(copy)
                .toStrictEqual(input);
        });
    });
});

describe('includes', () => {
    describe('includes(search)', () => {
        it('returns true if value is included in the given array', () => {
            expect(includes(3.14)(input)).toBe(true);
        });

        it('returns false if value is not included in the given array', () => {
            expect(includes(0)(input)).toBe(false);
        });
    });

    describe('includes(search, from)', () => {
        it('returns true if value is included in the given array starting the "from" index', () => {
            expect(includes(1.73, 3)(input)).toBe(true);
        });

        it('returns false if value is not included in the given array starting the "from" index', () => {
            expect(includes(1.61, 3)(input)).toBe(false);
        });
    });
});

describe('indexOf', () => {
    describe('indexOf(search)', () => {
        it('returns the index of the "search" element in the array', () => {
            expect(indexOf<number>(2.71)(input))
                .toBe(5);
        });

        it('returns -1 if the "search" element is not in the array', () => {
            expect(indexOf<number>(0)(input))
                .toBe(-1);
        });
    });

    describe('indexOf(search, from)', () => {
        it('returns the index of the "search" element in the array starting the "from" index', () => {
            expect(indexOf<number>(2.71, 5)(input))
                .toBe(5);
        });

        it('returns -1 if the "search" element is not in the array starting the "from" index', () => {
            expect(indexOf<number>(1.41, 5)(input))
                .toBe(-1);
        });
    });
});

describe('join', () => {
    describe('join()', () => {
        it('returns an empty string for an empty array', () => {
            expect(join()([]))
                .toBe('');
        });

        it('replaces undefined and null with an empty string', () => {
            expect(join()([undefined, null, '', 0, false, true]))
                .toBe(',,,0,false,true');
        });

        it('returns a string with the elements separated by comma', () => {
            expect(join()(input))
                .toBe('1.2,1.41,1.61,1.73,2.23,2.71,3.14');
        });
    });

    describe('join(separator)', () => {
        it('returns a string with the elements separated by the given separator', () => {
            expect(join('; ')(input))
                .toBe('1.2; 1.41; 1.61; 1.73; 2.23; 2.71; 3.14');
        });
    });
});

describe('keys', () => {
    it('returns a new Array Iterator that contains keys for each index in the array', () => {
        expect(keys(input).next().value)
            .toBe(0);
    });
});

describe('lastIndexOf', () => {
    describe('lastIndexOf(search)', () => {
        it('returns the index of the "search" element in the array', () => {
            expect(lastIndexOf<number>(2.71)(input))
                .toBe(5);
        });

        it('returns -1 if the "search" element is not in the array', () => {
            expect(lastIndexOf<number>(0)(input))
                .toBe(-1);
        });
    });

    describe('lastIndexOf(search, from)', () => {
        it('returns the index of the "search" element in the array starting the "from" index', () => {
            expect(lastIndexOf<number>(2.71, 5)(input.concat(input)))
                .toBe(5);
        });

        it('returns -1 if the "search" element is not in the array starting the "from" index', () => {
            expect(lastIndexOf<number>(2.71, 4)(input))
                .toBe(-1);
        });
    });
});

describe('map', () => {
    describe('map(lift)', () => {
        it('returns an array of elements mapped with the "lift" function from the original array', () => {
            expect(map<number, string>(decimal)(input))
                .toStrictEqual(['1.2', '1.41', '1.61', '1.73', '2.23', '2.71', '3.14']);
        });
    });
});

describe('pop', () => {
    it('returns the last element removed from an array', () => {
        const copy: number[] = input.map(same());

        expect(copy)
            .toHaveLength(7);
        expect(pop(copy))
            .toBe(3.14);
        expect(copy)
            .toHaveLength(6);
    });

    it('returns undefined when array is empty', () => {
        expect(pop<string>([]))
            .toBeUndefined();
    });
});

describe('push', () => {
    describe('push(...items)', () => {
        it('returns the new length of the array after pushing items into it', () => {
            const copy: number[] = input.map(same());

            expect(push(5, 7, 11)(copy))
                .toBe(10);
            expect(copy)
                .toStrictEqual([1.20, 1.41, 1.61, 1.73, 2.23, 2.71, 3.14, 5, 7, 11]);
        });
    });
});

describe('reduce', () => {
    describe('reduce(reducer, initial)', () => {
        it('returns the reduction of an array with an initial value', () => {
            expect(reduce<number, string>(
                (result, element, index) => `${result}, ${decimal(index + 1)}:${decimal(element)}`,
                '0',
            )(input)).toBe('0, 1:1.2, 2:1.41, 3:1.61, 4:1.73, 5:2.23, 6:2.71, 7:3.14');
        });
    });
});

describe('reduceTo', () => {
    describe('reduceTo(reducer)', () => {
        it('returns the reduction of an array without an initial value', () => {
            expect(reduceTo<number>(sum)([0, 1, 3, 5, 7, 11]))
                .toBe(27);
        });

        it('throws an error when array is empty', () => {
            expect(() => reduceTo<number>(sum)([]))
                .toThrow(TypeError);
            expect(() => reduceTo<number>(sum)([]))
                .toThrow('Reduce of empty array with no initial value');
        });
    });
});

describe('reduceRight', () => {
    describe('reduceRight(reducer, initial)', () => {
        it('returns the reduction from the end of an array with an initial value', () => {
            expect(reduceRight<number, string>(
                (result, element, index) => `${result}, ${decimal(index + 1)}:${decimal(element)}`,
                '0',
            )(input)).toBe('0, 7:3.14, 6:2.71, 5:2.23, 4:1.73, 3:1.61, 2:1.41, 1:1.2');
        });
    });
});

describe('reduceRightTo', () => {
    describe('reduceRightTo(reducer)', () => {
        it('returns the reduction from the end of an array without an initial value', () => {
            expect(reduceRightTo<number>(difference)([0, 1, 3, 5, 7, 11]))
                .toBe(-5);
        });

        it('throws an error when array is empty', () => {
            expect(() => reduceRightTo<number>(sum)([]))
                .toThrow(TypeError);
            expect(() => reduceRightTo<number>(sum)([]))
                .toThrow('Reduce of empty array with no initial value');
        });
    });
});

describe('reverse', () => {
    it('returns a reversed array', () => {
        const copy: number[] = input.map(same());

        expect(reverse(copy))
            .toStrictEqual([3.14, 2.71, 2.23, 1.73, 1.61, 1.41, 1.20]);
        expect(reverse(copy))
            .toBe(copy);
    });
});

describe('shift', () => {
    it('returns the first element remove from an array', () => {
        const copy: number[] = input.map(same());

        expect(copy)
            .toHaveLength(7);
        expect(shift(copy))
            .toBe(1.20);
        expect(copy)
            .toHaveLength(6);
    });

    it('returns undefined when array is empty', () => {
        expect(shift<string>([]))
            .toBeUndefined();
    });
});

describe('slice', () => {
    describe('slice()', () => {
        it('shallow copies elements of the array', () => {
            expect(slice()(input))
                .toStrictEqual([1.20, 1.41, 1.61, 1.73, 2.23, 2.71, 3.14]);
            expect(slice()(input))
                .not.toBe(input);
        });
    });

    describe('slice(start)', () => {
        it('shallow copies elements of the array starting from the "start" index to the end of the array', () => {
            expect(slice(3)(input))
                .toStrictEqual([1.73, 2.23, 2.71, 3.14]);
        });

        it('shallow copies elements from the end of the array when "start" index is negative', () => {
            expect(slice(-1)(input))
                .toStrictEqual([3.14]);
        });
    });

    describe('slice(start, end)', () => {
        it('shallow copies elements from the "start" index to the "end" - 1 index', () => {
            expect(slice(0, 2)(input))
                .toStrictEqual([1.20, 1.41]);
            expect(slice(1, 3)(input))
                .toStrictEqual([1.41, 1.61]);
        });

        it('returns an empty array when "start" is negative and "end" is positive', () => {
            expect(slice(-1, 2)(input))
                .toStrictEqual([]);
        });

        it('shallow copies elements from the "start" to the "end" index when both indices are negative', () => {
            expect(slice(-3, -1)(input))
                .toStrictEqual([2.23, 2.71]);
        });
    });
});

describe('some', () => {
    describe('some(condition)', () => {
        it('returns true if at least one element in the array satisfies the "condition"', () => {
            expect(some(isGreaterThan(3))(input))
                .toBe(true);
        });

        it('returns false if there is no element that satisfied the "condition"', () => {
            expect(some(isGreaterThan(4))(input))
                .toBe(false);
        });
    });
});

describe('sort', () => {
    describe('sort()', () => {
        it('returns an array sorted ascending after converting elements into strings', () => {
            const copy: number[] = input.map(same());

            expect(sort()(copy))
                .toStrictEqual(input);
            expect(sort()(copy))
                .toBe(copy);
        });
    });

    describe('sort(order)', () => {
        it('returns an array sorted with the given "order" function', () => {
            const copy: number[] = input.map(same());

            expect(sort(descending)(copy))
                .toStrictEqual([3.14, 2.71, 2.23, 1.73, 1.61, 1.41, 1.20]);
        });
    });
});

describe('splice', () => {
    describe('splice(start)', () => {
        it('returns removed elements before the "start" index', () => {
            const copy: number[] = input.map(same());

            expect(splice(3)(copy))
                .toStrictEqual([1.73, 2.23, 2.71, 3.14]);
            expect(copy)
                .toStrictEqual([1.20, 1.41, 1.61]);
        });
    });

    describe('splice(start, deleteCount)', () => {
        const copy: number[] = input.map(same());

        it('returns removed "deleteCount" elements from the "start" index', () => {
            expect(splice(3, 2)(copy))
                .toStrictEqual([1.73, 2.23]);
            expect(copy)
                .toStrictEqual([1.20, 1.41, 1.61, 2.71, 3.14]);
        });
    });
});

describe('spliceWith', () => {
    describe('spliceWith(start, deleteCount, ...items)', () => {
        it('returns removed elements', () => {
            const copy: number[] = input.map(same());

            expect(spliceWith(3, 2, 1.73205, 2.23606)(copy))
                .toStrictEqual([1.73, 2.23]);
            expect(copy)
                .toStrictEqual([1.20, 1.41, 1.61, 1.73205, 2.23606, 2.71, 3.14]);
        });
    });
});

describe('unshift', () => {
    describe('unshift(...items)', () => {
        it('returns the length of an array after adding elements to the beginning of it', () => {
            const copy: number[] = input.map(same());

            expect(unshift(-1, 0)(copy))
                .toBe(9);
            expect(copy)
                .toStrictEqual([-1, 0, 1.20, 1.41, 1.61, 1.73, 2.23, 2.71, 3.14]);
        });
    });
});

describe('values', () => {
    it('returns a new Array Iterator that contains values for each index in the array', () => {
        expect(values(input).next().value)
            .toBe(1.20);
    });
});
