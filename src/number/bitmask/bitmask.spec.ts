import { describe, expect, it } from '@jest/globals';

import { Enum } from '../../object/enum/enum';

import { Bitmask, bitmask, hasFlagOn, isFlagOn, raisedFlags } from './bitmask';

enum BitBool {
    True = 0b1111_1111,
    False = 0,
}

enum CharBool {
    True = 't',
    False = 'f',
}

enum Style {
    None = 0,
    Dotted = 1,
    Dashed = 2,
    Solid = 4,
    Double = 8,
    Groove = 16,
    Ridge = 32,
    Inset = 64,
    Onset = 128,
}

describe('Bitmask<T>', () => {
    it('can be created without a generic type parameter', () => {
        const flags: Bitmask = 0b1001_0110;

        expect(flags).toBe(150);
    });

    it('must be used with a number-based enum', () => {
        const truth: Bitmask<Enum<BitBool>> = BitBool.True;

        expect(truth).toBe(255);
    });

    it('cannot be used with a string-based enum', () => {
        // @ts-expect-error -- TS2322: Type 'CharBool' is not assignable to type 'number'.
        const truth: Bitmask = CharBool.True;

        expect(truth).toBe('t');
    });
});

describe(bitmask, () => {
    it('creates a bitmask with the given flags on', () => {
        expect(bitmask([Style.Dotted, Style.Double, Style.Inset]))
            .toBe(0b0100_1001);
        expect(bitmask([Style.None, Style.Solid, Style.Groove, Style.Ridge, Style.Onset]))
            .toBe(0b1011_0100);
    });
});

describe(raisedFlags, () => {
    it('returns flags that are raised on the given bitmask', () => {
        expect(raisedFlags(Style, 0b0100_1001))
            .toStrictEqual(['Dotted', 'Double', 'Inset']);
    });
});

describe(isFlagOn, () => {
    describe('when all of the given flags are raised on the bitmask', () => {
        it('returns true', () => {
            expect(isFlagOn(0b0110_0011, 0b0110_0010))
                .toBe(true);
            expect(isFlagOn<Style>(0b0100_1001, Style.Dotted))
                .toBe(true);
        });
    });

    describe('when any the given flag is not raised on the bitmask', () => {
        it('returns false', () => {
            expect(isFlagOn(0b1001_0110, 0b0100_1001))
                .toBe(false);
        });
    });

    describe('when a given flag is 0', () => {
        it('returns false', () => {
            expect(isFlagOn(BitBool.True, BitBool.False))
                .toBe(false);
        });
    });
});

describe(hasFlagOn, () => {
    describe('hasFlagOn(flag)', () => {
        describe('when all of the given flags are raised on the bitmask', () => {
            it('returns true', () => {
                expect(hasFlagOn(0b0000_0010)(0b0000_0010))
                    .toBe(true);
                expect(hasFlagOn(0b0110_0010 as number)(0b0110_0011))
                    .toBe(true);
            });
        });

        describe('when any the given flag is not raised on the bitmask', () => {
            it('returns false', () => {
                expect(hasFlagOn(0b0000_0010 as number)(0b0000_0001))
                    .toBe(false);
            });
        });

        describe('when flag is 0', () => {
            it('returns false', () => {
                expect(hasFlagOn<BitBool>(BitBool.False)(BitBool.True))
                    .toBe(false);
            });
        });
    });
});
