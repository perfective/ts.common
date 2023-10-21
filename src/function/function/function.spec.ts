import { isFunction, isNotFunction } from './function';
import { naught } from './nullary';

describe(isFunction, () => {
    describe('when a given value is a function', () => {
        it('returns true', () => {
            expect(isFunction(naught)).toBe(true);
        });
    });

    describe('when a given value is not a function', () => {
        it('returns false', () => {
            expect(isFunction(null)).toBe(false);
        });
    });
});

describe(isNotFunction, () => {
    describe('when a given value is a function', () => {
        it('returns false', () => {
            expect(isNotFunction(naught)).toBe(false);
        });
    });

    describe('when a given value is not a function', () => {
        it('returns true', () => {
            expect(isNotFunction(null)).toBe(true);
        });
    });
});
