import { TypeOf, typeOf } from './type-of';

describe('typeof', () => {
    it('returns "undefined" when value is undefined', () => {
        expect(typeOf(undefined)).toBe('undefined' as TypeOf);
        // eslint-disable-next-line no-void -- testing undefined value
        expect(typeOf(void 0)).toBe('undefined' as TypeOf);
    });

    it('returns "null" when value is null', () => {
        expect(typeOf(null)).toBe('null' as TypeOf);
    });

    it('returns "boolean" when value is false', () => {
        expect(typeOf(false)).toBe('boolean' as TypeOf);
    });

    it('returns "boolean" when value is true', () => {
        expect(typeOf(true)).toBe('boolean' as TypeOf);
    });

    it('returns "number" when value is a number', () => {
        expect(typeOf(0)).toBe('number' as TypeOf);
        expect(typeOf(Number.NaN)).toBe('number' as TypeOf);
        expect(typeOf(Number.POSITIVE_INFINITY)).toBe('number' as TypeOf);
        expect(typeOf(Number.NEGATIVE_INFINITY)).toBe('number' as TypeOf);
        expect(typeOf(Number.MAX_SAFE_INTEGER)).toBe('number' as TypeOf);
        expect(typeOf(Number.MIN_SAFE_INTEGER)).toBe('number' as TypeOf);
        expect(typeOf(Number.MIN_VALUE)).toBe('number' as TypeOf);
        expect(typeOf(Number.MAX_VALUE)).toBe('number' as TypeOf);
        expect(typeOf(Number.EPSILON)).toBe('number' as TypeOf);
    });

    it('returns "bigint" when value is a BigInt', () => {
        expect(typeOf(BigInt(0))).toBe('bigint' as TypeOf);
    });

    it('returns "string" when value is a string', () => {
        expect(typeOf('')).toBe('string' as TypeOf);
    });

    it('returns "symbol" when value is a symbol', () => {
        expect(typeOf(Symbol('TypeOf'))).toBe('symbol' as TypeOf);
    });

    it('returns "function" when value is a function', () => {
        expect(typeOf(typeOf)).toBe('function' as TypeOf);
    });

    it('returns "object" when value is a non-null object and not an array', () => {
        expect(typeOf({})).toBe('object' as TypeOf);
    });

    it('returns "array" when value is an array', () => {
        expect(typeOf([])).toBe('array' as TypeOf);
    });
});
