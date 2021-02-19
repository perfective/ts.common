import { Enum } from '../enum/enum';

import { Bitmask, hasFlagOn, isFlagOn } from './bitmask';

enum BitBool {
    True = 0b1111_1111,
    False = 0,
}

enum CharBool {
    True = 't',
    False = 'f',
}

describe('bitmask<T>', () => {
    it('can be created without a generic type parameter', () => {
        const flags: Bitmask = 0b1001_0110;

        expect(flags).toBe(150);
    });

    it('must be used with a number-based enum', () => {
        const truth: Bitmask<Enum<BitBool>> = BitBool.True;

        expect(truth).toBe(255);
    });

    it('cannot be used with a string-based enum', () => {
        // @ts-expect-error -- Type 'Record<string, Bool>' does not satisfy the constraint 'Record<string, number>'
        const truth: Bitmask<Enum<CharBool>> = CharBool.True;

        expect(truth).toBe('t');
    });
});

describe('isFlagOn', () => {
    it('returns true when all of the given flags are raised on the bitmask', () => {
        expect(isFlagOn(0b0000_0010, 0b0000_0010))
            .toBe(true);
        expect(isFlagOn(0b0110_0011, 0b0110_0010))
            .toBe(true);
    });

    it('returns false when any the given flag is not raised on the bitmask', () => {
        expect(isFlagOn(0b1001_0110, 0b0100_1001))
            .toBe(false);
    });

    it('returns false when flag is 0', () => {
        expect(isFlagOn(BitBool.True, BitBool.False))
            .toBe(false);
    });
});

describe('hasFlagOn', () => {
    it('returns true when all of the given flags are raised on the bitmask', () => {
        expect(hasFlagOn(0b0000_0010)(0b0000_0010))
            .toBe(true);
        expect(hasFlagOn(0b0110_0010 as number)(0b0110_0011))
            .toBe(true);
    });

    it('returns false when any the given flag is not raised on the bitmask', () => {
        expect(hasFlagOn(0b0000_0010 as number)(0b0000_0001))
            .toBe(false);
    });

    it('returns false when flag is 0', () => {
        expect(hasFlagOn<BitBool>(BitBool.False)(BitBool.True))
            .toBe(false);
    });
});