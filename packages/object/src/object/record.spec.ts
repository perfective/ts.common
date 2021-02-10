import { recordFromArray, recordFromEntries, recordWithOmitted } from './record';

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

describe('recordWithOmitted', () => {
    interface User {
        a: string;
        b: number;
        c: boolean;
    }

    it('creates a copy of a record without the given properties', () => {
        const input: User = {
            a: '',
            b: 0,
            c: false,
        };
        const output: Pick<User, 'c'> = recordWithOmitted<User, 'a' | 'b'>('a', 'b')(input);

        expect(output).toStrictEqual({
            c: false,
        });
    });
});
