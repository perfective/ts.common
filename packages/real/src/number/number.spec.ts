import { isNotNumber, isNumber } from './number';

describe('isNumber', () => {
    it('returns true when value is a number', () => {
        expect(isNumber(3.14)).toBe(true);
    });

    it('returns false when value is not a number', () => {
        expect(isNumber(Number.NaN)).toBe(false);
        expect(isNumber(Number.NaN)).toBe(false);
        expect(isNumber('3.14')).toBe(false);
        expect(isNumber(true)).toBe(false);
    });
});

describe('isNotNumber', () => {
    it('returns false when value is a number', () => {
        expect(isNotNumber(3.14)).toBe(false);
    });

    it('returns true when value is not a number', () => {
        expect(isNotNumber(Number.NaN)).toBe(true);
        expect(isNotNumber(Number.NaN)).toBe(true);
        expect(isNotNumber('3.14')).toBe(true);
        expect(isNotNumber(false)).toBe(true);
    });
});
