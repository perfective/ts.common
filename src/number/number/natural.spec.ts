import { isNatural } from './natural';

describe('isNatural', () => {
    it('returns true when value is a positive integer', () => {
        expect(isNatural(1))
            .toBe(true);
    });

    it('returns true when value is zero', () => {
        expect(isNatural(0))
            .toBe(true);
    });

    it('returns true when value is a maximum safe integer', () => {
        expect(isNatural(Number.MAX_SAFE_INTEGER))
            .toBe(true);
    });

    it('returns true when value is maximum value', () => {
        expect(isNatural(Number.MAX_VALUE))
            .toBe(true);
    });

    it('returns false when value is a positive infinity', () => {
        expect(isNatural(Number.POSITIVE_INFINITY))
            .toBe(false);
    });

    it('returns false when value is a negative integer', () => {
        expect(isNatural(-1))
            .toBe(false);
    });

    it('returns false when value is a float', () => {
        expect(isNatural(3.14))
            .toBe(false);
    });

    it('returns false when value is NaN', () => {
        expect(isNatural(Number.NaN))
            .toBe(false);
    });

    it('returns false when value is not a number', () => {
        expect(isNatural('3'))
            .toBe(false);
        expect(isNatural(true))
            .toBe(false);
        expect(isNatural(false))
            .toBe(false);
    });
});
