import { isTruthy } from './predicate';
import {
    filter,
    omit,
    pick,
    recordFiltered,
    recordFromArray,
    recordFromEntries,
    recordWithOmitted,
    recordWithPicked,
} from './record';

describe('recordFromArray', () => {
    it('creates an empty object from an empty array', () => {
        expect(recordFromArray([]))
            .toStrictEqual({});
    });

    it('flips a given array of string into an object', () => {
        expect(recordFromArray(['a', 'b', 'c']))
            .toStrictEqual({
                a: 0,
                b: 1,
                c: 2,
            });
    });
});

describe('recordFromEntries', () => {
    it('creates an empty object from an empty array', () => {
        expect(recordFromEntries([]))
            .toStrictEqual({});
    });

    it('creates an object from an object as key-value map of array entries', () => {
        expect(recordFromEntries([
            ['number', 0],
            ['string', 'string'],
            ['undefined', undefined],
            ['null', null],
        ])).toStrictEqual({
            number: 0,
            string: 'string',
            null: null,
            undefined,
        });
    });
});

interface Example {
    a: string;
    b: number;
    c: boolean;
    d: string[];
}

const input: Example = {
    a: '',
    b: 0,
    c: false,
    d: [],
};

describe('pick', () => {
    it('creates a copy of a record with the given properties', () => {
        const output: Pick<Example, 'a' | 'b'> = pick(input, 'a', 'b');

        expect(output).toStrictEqual({
            a: '',
            b: 0,
        } as Omit<Example, 'c' | 'd'>);
    });
});

describe('recordWithPicked', () => {
    it('creates a copy of a record with the given properties', async () => {
        const output: Pick<Example, 'a' | 'b'> = await Promise.resolve(input).then(recordWithPicked('a', 'b'));

        expect(output).toStrictEqual({
            a: '',
            b: 0,
        } as Omit<Example, 'c' | 'd'>);
    });
});

describe('omit', () => {
    it('creates a copy of a record without the given properties', () => {
        const output: Omit<Example, 'a' | 'b'> = omit(input, 'a', 'b');

        expect(output).toStrictEqual({
            c: false,
            d: [],
        } as Pick<Example, 'c' | 'd'>);
    });
});

describe('recordWithOmitted', () => {
    it('creates a copy of a record without the given properties', async () => {
        const output: Omit<Example, 'a' | 'b'> = await Promise.resolve(input).then(recordWithOmitted('a', 'b'));

        expect(output).toStrictEqual({
            c: false,
            d: [],
        } as Pick<Example, 'c' | 'd'>);
    });
});

describe('filter', () => {
    it('keeps only values that pass the filter', () => {
        const output: Partial<Example> = filter(input, isTruthy);

        expect(output)
            .toStrictEqual({
                d: [],
            } as Partial<Example>);
    });
});

describe('recordFiltered', () => {
    it('keeps only values that pass the filter', async () => {
        const output: Partial<Example> = await Promise.resolve(input).then(recordFiltered(isTruthy));

        expect(output)
            .toStrictEqual({
                d: [],
            } as Partial<Example>);
    });
});
