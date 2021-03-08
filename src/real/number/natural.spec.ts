import { isNatural } from './natural';

describe('isNatural', () => {
    it('returns true when value is a positive integer', () => {
        expect(isNatural(1))
            .toStrictEqual(true);
    });

    it('returns true when value is zero', () => {
        expect(isNatural(0))
            .toStrictEqual(true);
    });

    it('returns true when value is a maximum safe integer', () => {
        expect(isNatural(Number.MAX_SAFE_INTEGER))
            .toStrictEqual(true);
    });

    it('returns true when value is maximum value', () => {
        expect(isNatural(Number.MAX_VALUE))
            .toStrictEqual(true);
    });

    it('returns false when value is a positive infinity', () => {
        expect(isNatural(Number.POSITIVE_INFINITY))
            .toStrictEqual(false);
    });

    it('returns false when value is a negative integer', () => {
        expect(isNatural(-1))
            .toStrictEqual(false);
    });

    it('returns false when value is a float', () => {
        expect(isNatural(3.14))
            .toStrictEqual(false);
    });

    it('returns false when value is NaN', () => {
        expect(isNatural(Number.NaN))
            .toStrictEqual(false);
    });

    it('returns false when value is not a number', () => {
        expect(isNatural('3'))
            .toStrictEqual(false);
        expect(isNatural(true))
            .toStrictEqual(false);
        expect(isNatural(false))
            .toStrictEqual(false);
    });
});
