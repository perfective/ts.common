import { constant } from './nullary';
import { isFalse, isTrue } from './proposition';

describe('isTrue', () => {
    it('returns true when value is true', () => {
        expect(isTrue(true)).toBe(true);
    });

    it('returns true when value is a function that returns true', () => {
        expect(isTrue(constant(true))).toBe(true);
    });

    it('returns false when value is false', () => {
        expect(isTrue(false)).toBe(false);
    });

    it('returns false when value is a function that returns false', () => {
        expect(isTrue(constant(false))).toBe(false);
    });
});

describe('isFalse', () => {
    it('returns false when value is true', () => {
        expect(isFalse(true)).toBe(false);
    });

    it('returns false when value is a function that returns true', () => {
        expect(isFalse(constant(true))).toBe(false);
    });

    it('returns true when value is false', () => {
        expect(isFalse(false)).toBe(true);
    });

    it('returns true when value is a function that returns false', () => {
        expect(isFalse(constant(false))).toBe(true);
    });
});
