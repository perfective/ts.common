import { describe, expect, it } from '@jest/globals';

import { clone, copy, hasMethod, hasNoMethod } from './object';

describe(copy, () => {
    it('creates a shallow copy of an array', () => {
        interface Example {
            real: string;
            imaginary?: string;
        }

        const input: Example[] = [{
            real: 'real',
            imaginary: '-1',
        }];
        const output: Example[] = copy(input);

        expect(output).not.toBe(input);
        expect(output).toStrictEqual(input);
        expect(output[0]).toBe(input[0]);

        delete output[0].imaginary;

        expect(output).toStrictEqual(input);
        expect(output[0]).toBe(input[0]);
    });

    it('creates a shallow copy of a plain object', () => {
        interface Example {
            array: string[];
            name?: string;
        }

        const input: Example = {
            array: ['a', 'b', 'c'],
        };
        const output: Example = copy(input);

        expect(output).not.toBe(input);
        expect(output).toStrictEqual(input);
        expect(output.array).toBe(input.array);

        input.name = 'example';

        expect(output).not.toStrictEqual(input);

        input.array.pop();

        expect(output.array).toBe(input.array);
    });

    it('returns a copy of a string', () => {
        let input: string = '3.14';
        const output: string = copy(input);

        expect(output).toBe(input);

        input += '15';

        expect(output).not.toStrictEqual(input);
        expect(output).not.toBe(input);
    });

    it('returns a copy of a Date value', () => {
        const input: Date = new Date('2020-01-01T00:00:00Z');
        const output: Date = copy(input);

        expect(output).toStrictEqual(input);
        expect(output).not.toBe(input);

        input.setFullYear(2021);

        expect(output).not.toStrictEqual(input);
    });

    it('returns a copy of a Map value', () => {
        const input: Map<string, number> = new Map([['pi', 3.14]]);
        const output: Map<string, number> = copy(input);

        expect(output).toStrictEqual(input);
        expect(output).not.toBe(input);

        input.delete('pi');

        expect(output).not.toStrictEqual(input);
    });

    it('returns a copy of a Set value', () => {
        const input: Set<number> = new Set([0, 1, 3.14]);
        const output: Set<number> = copy(input);

        expect(output).toStrictEqual(input);
        expect(output).not.toBe(input);

        input.delete(0);

        expect(output).not.toStrictEqual(input);
    });

    describe('when the value is undefined', () => {
        it('returns undefined', () => {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- testing undefined value
            expect(copy(undefined)).toBeUndefined();
        });
    });

    describe('when the value is null', () => {
        it('returns null', () => {
            expect(copy(null)).toBeNull();
        });
    });

    describe('when the value is boolean true', () => {
        it('returns true', () => {
            expect(copy(true)).toBe(true);
        });
    });

    describe('when the value is boolean false', () => {
        it('returns false', () => {
            expect(copy(false)).toBe(false);
        });
    });

    describe('when the value is a number', () => {
        it('returns the original number', () => {
            expect(copy(3.14)).toBe(3.14);
            expect(copy(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
            expect(copy(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    describe('when the value is a NaN', () => {
        it('returns NaN', () => {
            expect(copy(Number.NaN)).toBe(Number.NaN);
        });
    });
});

describe(clone, () => {
    it('creates a deep copy of an array', () => {
        interface Example {
            real: string;
            imaginary?: string;
        }

        const input: Example[] = [{
            real: 'real',
            imaginary: '-1',
        }];
        const output: Example[] = clone(input);

        expect(output).not.toBe(input);
        expect(output).toStrictEqual(input);
        expect(output[0]).not.toBe(input[0]);

        delete output[0].imaginary;

        expect(output).not.toStrictEqual(input);
    });

    it('creates a depp copy of a plain object', () => {
        interface Example {
            array: string[];
            name?: string;
        }

        const input: Example = {
            array: ['a', 'b', 'c'],
        };
        const output: Example = clone(input);

        expect(output).not.toBe(input);
        expect(output).toStrictEqual(input);
        expect(output.array).not.toBe(input.array);

        input.name = 'example';

        expect(output).not.toStrictEqual(input);

        input.array.pop();

        expect(output.array).not.toStrictEqual(input.array);
    });
});

describe(hasMethod, () => {
    describe('when a given `value` implements a given `method`', () => {
        it('returns true', () => {
            expect(hasMethod(true, 'toString')).toBe(true);
            expect(hasMethod(0, 'toPrecision')).toBe(true);
            expect(hasMethod(new Date(), 'toLocaleString')).toBe(true);
        });
    });

    describe('when a given `value` does not implement a given `method`', () => {
        it('returns false', () => {
            expect(hasMethod(undefined, 'toString')).toBe(false);
            expect(hasMethod(null, 'toString')).toBe(false);
            expect(hasMethod({}, 'toPrecision')).toBe(false);
        });
    });
});

describe(hasNoMethod, () => {
    describe('when a given `value` does not implement a given `method`', () => {
        it('returns true', () => {
            expect(hasNoMethod(undefined, 'toString')).toBe(true);
            expect(hasNoMethod(null, 'toString')).toBe(true);
            expect(hasNoMethod({}, 'toPrecision')).toBe(true);
        });
    });

    describe('when a given `value` implements a given `method`', () => {
        it('returns false', () => {
            expect(hasNoMethod(true, 'toString')).toBe(false);
            expect(hasNoMethod(0, 'toPrecision')).toBe(false);
            expect(hasNoMethod(new Date(), 'toLocaleString')).toBe(false);
        });
    });
});
