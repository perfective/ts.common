import { isFunction, isNotFunction } from './function';
import { empty } from './nullary';

describe('isFunction', () => {
    it('returns true when value is a function', () => {
        expect(isFunction(empty)).toBe(true);
        expect(isFunction(empty())).toBe(true);
    });

    it('returns false when value is not a function', () => {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- testing void return
        expect(isFunction(empty()())).toBe(false);
    });
});

describe('isNotFunction', () => {
    it('returns false when value is a function', () => {
        expect(isNotFunction(empty)).toBe(false);
        expect(isNotFunction(empty())).toBe(false);
    });

    it('returns true when value is not a function', () => {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- testing void return
        expect(isNotFunction(empty()())).toBe(true);
    });
});
