import { isFunction, isNotFunction } from './function';
import { naught } from './nullary';

describe('isFunction', () => {
    it('returns true when value is a function', () => {
        expect(isFunction(naught)).toBe(true);
    });

    it('returns false when value is not a function', () => {
        expect(isFunction(null)).toBe(false);
    });
});

describe('isNotFunction', () => {
    it('returns false when value is a function', () => {
        expect(isNotFunction(naught)).toBe(false);
    });

    it('returns true when value is not a function', () => {
        expect(isNotFunction(null)).toBe(true);
    });
});
