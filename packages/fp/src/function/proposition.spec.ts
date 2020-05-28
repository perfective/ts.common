import { always, isFalse, isTrue, never } from './proposition';

describe('isTrue', () => {
    it('returns true when value is true', () => {
        expect(isTrue(true)).toBe(true);
    });

    it('returns true when value is a function that returns true', () => {
        expect(isTrue(always)).toBe(true);
    });

    it('returns false when value is false', () => {
        expect(isTrue(false)).toBe(false);
    });

    it('returns false when value is a function that returns false', () => {
        expect(isTrue(never)).toBe(false);
    });
});

describe('isFalse', () => {
    it('returns false when value is true', () => {
        expect(isFalse(true)).toBe(false);
    });

    it('returns false when value is a function that returns true', () => {
        expect(isFalse(always)).toBe(false);
    });

    it('returns true when value is false', () => {
        expect(isFalse(false)).toBe(true);
    });

    it('returns true when value is a function that returns false', () => {
        expect(isFalse(never)).toBe(true);
    });
});

describe('always', () => {
    it('returns true', () => {
        expect(always()).toBe(true);
    });
});

describe('never', () => {
    it('returns false', () => {
        expect(never()).toBe(false);
    });
});
