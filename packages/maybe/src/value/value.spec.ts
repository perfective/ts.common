import { isDefined, isUndefined } from './value';

describe('isDefined', () => {
    it('returns true when value is defined', () => {
        expect(isDefined('')).toBe(true);
        expect(isDefined(0)).toBe(true);
        expect(isDefined(false)).toBe(true);
        expect(isDefined(null)).toBe(true);
    });

    it('returns false when value is undefined', () => {
        expect(isDefined(undefined)).toBe(false);
    });
});

describe('isUndefined', () => {
    it('returns false when value is defined', () => {
        expect(isUndefined('')).toBe(false);
        expect(isUndefined(0)).toBe(false);
        expect(isUndefined(false)).toBe(false);
        expect(isUndefined(null)).toBe(false);
    });

    it('returns true when value is undefined', () => {
        expect(isUndefined(undefined)).toBe(true);
    });
});
