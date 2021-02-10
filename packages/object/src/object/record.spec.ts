import { recordFromArray, recordFromEntries } from './record';

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
