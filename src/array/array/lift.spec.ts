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
    pushInto,
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
    return input.map(same);
}

describe(concat, () => {
    describe('concat(...arrays)', () => {
        it('returns a new array created by merging given arrays into the input array', () => {
            expect(concat([2.71, 3.14])([1.41, 1.73, 2.23]))
                .toStrictEqual([1.41, 1.73, 2.23, 2.71, 3.14]);
            expect(concat([2.71, 3.14], [1.20, 1.61])([1.41, 1.73, 2.23]))
                .toStrictEqual([1.41, 1.73, 2.23, 2.71, 3.14, 1.20, 1.61]);
        });
    });
});

describe(copyWithin, () => {
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

describe(entries, () => {
    it('returns a new Array Iterator that contains key/value pairs for each index in the input array', () => {
        expect(entries(input).next().value)
            .toStrictEqual([0, 1.20]);
    });
});

describe(every, () => {
    describe('every(condition)', () => {
        describe('when every element satisfies a given `condition`', () => {
            it('returns true', () => {
                expect(every<number>(isGreaterThan(0))(input))
                    .toBe(true);
            });
        });

        describe('when at least one element does not satisfy a given `condition`', () => {
            it('returns false', () => {
                expect(every<number>(isLessThan(3))(input))
                    .toBe(false);
            });
        });
    });
});

describe(fill, () => {
    describe('fill(value)', () => {
        it('replaces all the values in the array with the given value', () => {
            const copy: number[] = input.map(same);

            expect(fill<number>(0)(copy))
                .toBe(copy);
            expect(fill<number>(0)([]))
                .toStrictEqual([]);
            expect(fill<number>(0)(copy))
                .toStrictEqual([0, 0, 0, 0, 0, 0, 0]);
        });
    });

    describe('fill(value, start)', () => {
        it('replaces the value in the array with the given array from the `start` index', () => {
            const copy: number[] = input.map(same);

            expect(fill<number>(0, 3)([]))
                .toStrictEqual([]);
            expect(fill<number>(0, 3)(copy))
                .toStrictEqual([1.20, 1.41, 1.61, 0, 0, 0, 0]);
        });
    });

    describe('fill(value, start, end)', () => {
        it('replaces the value in the array with the given array from the `start` to the `end` index', () => {
            const copy: number[] = input.map(same);

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

describe(find, () => {
    describe('find(condition)', () => {
        describe('when the input array contains an element that matches a given `condition`', () => {
            it('returns the value of the first element that matches the `condition`', () => {
                expect(find<number>(isGreaterThan(2))(input))
                    .toBe(2.23);
            });
        });

        describe('when the input array does not contain an element that matches a given `condition`', () => {
            it('returns undefined', () => {
                expect(find<number>(isGreaterThan(4))(input))
                    .toBeUndefined();
            });
        });
    });
});

describe(findIndex, () => {
    describe('findIndex(condition)', () => {
        describe('when the input array contains an element that matches a given `condition`', () => {
            it('returns the index of the first element that matches the "condition"', () => {
                expect(findIndex<number>(isGreaterThan(2))(input))
                    .toBe(4);
            });
        });

        describe('when the input array does not contain an element that matches a given `condition`', () => {
            it('returns -1', () => {
                expect(findIndex<number>(isGreaterThan(4))(input))
                    .toBe(-1);
            });
        });
    });
});

describe(forEach, () => {
    describe('forEach(procedure)', () => {
        it('calls a given `procedure` for each element of the array', () => {
            const copy: number[] = [];

            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- testing void return
            expect(forEach<number>(value => copy.push(value))(input))
                .toBeUndefined();
            expect(copy)
                .toStrictEqual(input);
        });
    });
});

describe(includes, () => {
    describe('includes(value)', () => {
        describe('when a given `value` is present in the input array', () => {
            it('returns true', () => {
                expect(includes(3.14)(input)).toBe(true);
            });
        });

        describe('when a given `value` is absent from the input array', () => {
            it('returns false', () => {
                expect(includes(0)(input)).toBe(false);
            });
        });
    });

    describe('includes(value, from)', () => {
        describe('when a given `value` is present after or at the `from` index in the input array', () => {
            it('returns true', () => {
                expect(includes(1.73, 3)(input)).toBe(true);
            });
        });

        describe('when a given `value` is absent after or at the `from` index in the input array', () => {
            it('returns false', () => {
                expect(includes(1.61, 3)(input)).toBe(false);
            });
        });
    });
});

describe(indexOf, () => {
    describe('indexOf(value)', () => {
        describe('when a given `value` is present in the input array', () => {
            it('returns the index of the value', () => {
                expect(indexOf<number>(2.71)(input))
                    .toBe(5);
            });
        });

        describe('when a given `value` is absent from the input array', () => {
            it('returns -1', () => {
                expect(indexOf<number>(0)(input))
                    .toBe(-1);
            });
        });
    });

    describe('indexOf(value, from)', () => {
        describe('when a given `value` is present in the input array after or at the `from` index', () => {
            it('returns the index of the `value`', () => {
                expect(indexOf<number>(2.71, 5)(input))
                    .toBe(5);
            });
        });

        describe('when a given `value` is not present in the input array after or at the `from` index', () => {
            it('returns -1', () => {
                expect(indexOf<number>(1.41, 5)(input))
                    .toBe(-1);
            });
        });
    });
});

describe(join, () => {
    describe('join()', () => {
        it('returns a string with the elements separated by comma', () => {
            expect(join()(input))
                .toBe('1.2,1.41,1.61,1.73,2.23,2.71,3.14');
        });

        describe('when given an empty array', () => {
            it('returns an empty string', () => {
                expect(join()([]))
                    .toBe('');
            });
        });

        describe('when given an array with undefined and null elements', () => {
            it('replaces undefined and null with an empty string', () => {
                expect(join()([undefined, null, '', 0, false, true]))
                    .toBe(',,,0,false,true');
            });
        });
    });

    describe('join(separator)', () => {
        it('returns a string with the elements separated by the given separator', () => {
            expect(join('; ')(input))
                .toBe('1.2; 1.41; 1.61; 1.73; 2.23; 2.71; 3.14');
        });
    });
});

describe(keys, () => {
    it('returns a new Array Iterator that contains keys for each index in the array', () => {
        expect(keys([0]).next().value)
            .toBe(0);
    });
});

describe(lastIndexOf, () => {
    describe('lastIndexOf(value)', () => {
        describe('when a given `value` is present in the input array', () => {
            it('returns the index of a given `value`', () => {
                expect(lastIndexOf<number>(2.71)(input))
                    .toBe(5);
            });
        });

        describe('when a given `value` is absent from the input array', () => {
            it('returns -1', () => {
                expect(lastIndexOf<number>(0)(input))
                    .toBe(-1);
            });
        });
    });

    describe('lastIndexOf(value, from)', () => {
        describe('when a given `value` is present at or after a given `from` index in the input array', () => {
            it('returns the index of the value', () => {
                expect(lastIndexOf<number>(2.71, 5)(input.concat(input)))
                    .toBe(5);
            });
        });

        describe('when a given `value` is not present at or after a given `from` index in the input array', () => {
            it('returns -1', () => {
                expect(lastIndexOf<number>(2.71, 4)(input))
                    .toBe(-1);
            });
        });
    });
});

describe(map, () => {
    describe('map(callback)', () => {
        it('returns an array with results of a given `callback` applies to elements of the input array', () => {
            expect(map<number, string>(decimal)(input))
                .toStrictEqual(['1.2', '1.41', '1.61', '1.73', '2.23', '2.71', '3.14']);
        });
    });
});

describe(pop, () => {
    describe('when the input array is not empty', () => {
        it('returns the last element', () => {
            const copy: number[] = input.map(same);

            expect(pop(copy)).toBe(3.14);
        });

        it('removes the last element from the input array', () => {
            const copy: number[] = input.map(same);

            expect(copy).toHaveLength(7);

            pop(copy);

            expect(copy).toHaveLength(6);
        });
    });

    describe('when the input array is empty', () => {
        it('returns undefined', () => {
            expect(pop<string>([]))
                .toBeUndefined();
        });
    });
});

describe('push', () => {
    describe('push(...items)', () => {
        it('adds given items to the end of the input array', () => {
            const copy: number[] = input.map(same);

            push(5, 7, 11)(copy);

            expect(copy)
                .toStrictEqual([1.20, 1.41, 1.61, 1.73, 2.23, 2.71, 3.14, 5, 7, 11]);
        });

        it('returns the new length of the array', () => {
            const copy: number[] = input.map(same);

            expect(copy).toHaveLength(7);
            expect(push(5, 7, 11)(copy))
                .toBe(10);
        });
    });
});

describe(pushInto, () => {
    describe('pushInto(array)', () => {
        it('adds the input items to the end of a given array', () => {
            const copy: number[] = input.map(same);

            pushInto(copy)(5, 7, 11);

            expect(copy)
                .toStrictEqual([1.20, 1.41, 1.61, 1.73, 2.23, 2.71, 3.14, 5, 7, 11]);
        });

        it('returns a new length of a given array', () => {
            const copy: number[] = input.map(same);

            expect(copy).toHaveLength(7);
            expect(pushInto(copy)(5, 7, 11)).toBe(10);
        });
    });
});

describe(reduce, () => {
    describe('reduce(reducer, initial)', () => {
        it('folds the input array using a given `reducer` and an `initial` value', () => {
            expect(reduce<number, string>(
                (result, element, index) => `${result}, ${decimal(index + 1)}:${decimal(element)}`,
                '0',
            )(input)).toBe('0, 1:1.2, 2:1.41, 3:1.61, 4:1.73, 5:2.23, 6:2.71, 7:3.14');
        });

        describe('when the input array is empty', () => {
            it('returns the initial value', () => {
                expect(reduce<number, string>(
                    (result, element, index) => `${result}, ${decimal(index + 1)}:${decimal(element)}`,
                    '0',
                )([])).toBe('0');
            });
        });
    });
});

describe(reduceTo, () => {
    describe('reduceTo(reducer)', () => {
        it('folds the input using a given `reducer`', () => {
            expect(reduceTo<number>(sum)([0, 1, 3, 5, 7, 11]))
                .toBe(27);
        });

        describe('when the input array is empty', () => {
            it('throws a TypeError', () => {
                expect(() => reduceTo<number>(sum)([]))
                    .toThrow(TypeError);
                expect(() => reduceTo<number>(sum)([]))
                    .toThrow('Reduce of empty array with no initial value');
            });
        });
    });
});

describe(reduceRight, () => {
    describe('reduceRight(reducer, initial)', () => {
        it('folds the input array from the end using a given `reducer` and an `initial` value', () => {
            expect(reduceRight<number, string>(
                (result, element, index) => `${result}, ${decimal(index + 1)}:${decimal(element)}`,
                '0',
            )(input)).toBe('0, 7:3.14, 6:2.71, 5:2.23, 4:1.73, 3:1.61, 2:1.41, 1:1.2');
        });

        describe('when the input array is empty', () => {
            it('returns the initial value', () => {
                expect(reduceRight<number, string>(
                    (result, element, index) => `${result}, ${decimal(index + 1)}:${decimal(element)}`,
                    '0',
                )([])).toBe('0');
            });
        });
    });
});

describe(reduceRightTo, () => {
    describe('reduceRightTo(reducer)', () => {
        it('folds the input array from the end using a given `reducer`', () => {
            expect(reduceRightTo<number>(difference)([0, 1, 3, 5, 7, 11]))
                .toBe(-5);
        });

        describe('when the input array is empty', () => {
            it('throws a TypeError', () => {
                expect(() => reduceRightTo<number>(sum)([]))
                    .toThrow(TypeError);
                expect(() => reduceRightTo<number>(sum)([]))
                    .toThrow('Reduce of empty array with no initial value');
            });
        });
    });
});

describe(reverse, () => {
    it('returns an array with elements of the input array in reverse order', () => {
        const copy: number[] = [1, 2, 3].map(same);

        expect(reverse(copy)).toStrictEqual([3, 2, 1]);
    });

    it('reverses the input array in-place', () => {
        const copy: number[] = [1, 2, 3].map(same);

        expect(reverse(copy)).toBe(copy);
    });
});

describe(shift, () => {
    describe('shift(array)', () => {
        describe('when given a non-empty array', () => {
            it('removes the first element from the input array', () => {
                const copy: number[] = [1, 2, 3].map(same);

                shift(copy);

                expect(copy).toStrictEqual([2, 3]);
            });

            it('returns the first element of the input array', () => {
                const copy: number[] = [1, 2, 3].map(same);

                expect(shift(copy)).toBe(1);
            });
        });

        describe('when given an empty array', () => {
            it('returns undefined when array is empty', () => {
                expect(shift<string>([]))
                    .toBeUndefined();
            });
        });
    });
});

describe(slice, () => {
    describe('slice()', () => {
        it('returns a shallow copy of the input array', () => {
            expect(slice()(input))
                .toStrictEqual([1.20, 1.41, 1.61, 1.73, 2.23, 2.71, 3.14]);
            expect(slice()(input))
                .not.toBe(input);
        });
    });

    describe('slice(start)', () => {
        it('returns a sub-array of the input array starting from a given `start` index', () => {
            expect(slice(3)(input))
                .toStrictEqual([1.73, 2.23, 2.71, 3.14]);
        });

        describe('when a given `start` is negative`', () => {
            it('returns a sub-array of the input array starting `start` elements before the end of the array', () => {
                expect(slice(-1)(input))
                    .toStrictEqual([3.14]);
            });
        });
    });

    describe('slice(start, end)', () => {
        it('returns a sub-array of the input array starting at a given `start` index and ending at `end` - 1', () => {
            expect(slice(0, 2)(input))
                .toStrictEqual([1.20, 1.41]);
            expect(slice(1, 3)(input))
                .toStrictEqual([1.41, 1.61]);
        });

        describe('when a given `start` is negative and `end` is positive', () => {
            it('returns an empty array', () => {
                expect(slice(-1, 2)(input))
                    .toStrictEqual([]);
            });
        });

        describe('when given `start` and `end` are negative', () => {
            it('returns a sub-array of the input array from the `start` to the `end` (exclusive) index', () => {
                expect(slice(-3, -1)(input))
                    .toStrictEqual([2.23, 2.71]);
            });
        });
    });
});

describe(some, () => {
    describe('some(condition)', () => {
        describe('when at least one element of the input array satisfies a given `condition`', () => {
            it('returns true', () => {
                expect(some(isGreaterThan(3))(input))
                    .toBe(true);
            });
        });

        describe('when none of the input array elements satisfy a given `condition`', () => {
            it('returns false', () => {
                expect(some(isGreaterThan(4))(input))
                    .toBe(false);
            });
        });
    });
});

describe(sort, () => {
    describe('sort()', () => {
        it('sort the input array in-place', () => {
            const copy: number[] = input.map(same);
            sort()(copy);

            expect(sort()(copy))
                .toBe(copy);
        });

        it('returns an array sorted in ascending order (after converting elements into strings)', () => {
            const copy: number[] = input.map(same);

            expect(sort()(copy))
                .toStrictEqual(input);
        });
    });

    describe('sort(order)', () => {
        it('returns an array sorted with the given "order" function', () => {
            const copy: number[] = input.map(same);

            expect(sort(descending)(copy))
                .toStrictEqual([3.14, 2.71, 2.23, 1.73, 1.61, 1.41, 1.20]);
        });
    });
});

describe(splice, () => {
    describe('splice(start)', () => {
        it('removes elements from the input array after a given `start` index', () => {
            const copy: number[] = input.map(same);
            splice(3)(copy);

            expect(copy)
                .toStrictEqual([1.20, 1.41, 1.61]);
        });

        it('returns an array of elements removed after a given `start` index', () => {
            const copy: number[] = input.map(same);

            expect(splice(3)(copy))
                .toStrictEqual([1.73, 2.23, 2.71, 3.14]);
        });
    });

    describe('splice(start, deleteCount)', () => {
        it('removes elements from the input array', () => {
            const copy: number[] = input.map(same);
            splice(3, 2)(copy);

            expect(copy)
                .toStrictEqual([1.20, 1.41, 1.61, 2.71, 3.14]);
        });

        it('returns an array of `deleteCount` elements from the input array starting at the "start" index', () => {
            const copy: number[] = input.map(same);

            expect(splice(3, 2)(copy))
                .toStrictEqual([1.73, 2.23]);
        });
    });
});

describe(spliceWith, () => {
    describe('spliceWith(start, deleteCount, ...items)', () => {
        it('removes elements from the input array', () => {
            const copy: number[] = input.map(same);
            spliceWith(3, 2, 1.73205, 2.23606)(copy);

            expect(copy)
                .toStrictEqual([1.20, 1.41, 1.61, 1.73205, 2.23606, 2.71, 3.14]);
        });

        it('returns removed elements', () => {
            const copy: number[] = input.map(same);

            expect(spliceWith(3, 2, 1.73205, 2.23606)(copy))
                .toStrictEqual([1.73, 2.23]);
        });
    });
});

describe(unshift, () => {
    describe('unshift(...items)', () => {
        it('adds given `items` to the beginning of the input array', () => {
            const copy: number[] = [1, 2, 3].map(same);

            unshift(-1, 0)(copy);

            expect(copy).toStrictEqual([-1, 0, 1, 2, 3]);
        });

        it('returns the new length of the input array', () => {
            const copy: number[] = [1, 2, 3].map(same);

            expect(unshift(-1, 0)(copy)).toBe(5);
        });
    });
});

describe(values, () => {
    it('returns a new Array Iterator that contains values for each index in the array', () => {
        expect(values(input).next().value)
            .toBe(1.20);
    });
});
