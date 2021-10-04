import {
    isEmpty,
    isNotEmpty,
    isNotString,
    isString,
    length,
    stringFromCharCode,
    stringFromCodePoint,
} from './string';

describe('isString', () => {
    it('returns true when value is a string', () => {
        expect(isString('3.14')).toBe(true);
        expect(isString(String(3.14))).toBe(true);
    });

    it('returns false when value is not a string', () => {
        expect(isString(3.14)).toBe(false);
        expect(isString(true)).toBe(false);
        expect(isString(false)).toBe(false);
        expect(isString(null)).toBe(false);
        expect(isString(undefined)).toBe(false);
        expect(isString([])).toBe(false);
        expect(isString({})).toBe(false);
    });
});

describe('isNotString', () => {
    it('returns false when value is a string', () => {
        expect(isNotString('3.14')).toBe(false);
        expect(isNotString(String(3.14))).toBe(false);
    });

    it('returns true when value is not a string', () => {
        expect(isNotString(3.14)).toBe(true);
        expect(isNotString(true)).toBe(true);
        expect(isNotString(false)).toBe(true);
        expect(isNotString(null)).toBe(true);
        expect(isNotString(undefined)).toBe(true);
        expect(isNotString([])).toBe(true);
        expect(isNotString({})).toBe(true);
    });
});

describe('isEmpty', () => {
    it('returns true when value is an empty string', () => {
        expect(isEmpty('')).toBe(true);
        expect(isEmpty(String())).toBe(true);
    });

    it('returns false when value is not an empty string', () => {
        expect(isEmpty('0')).toBe(false);
        expect(isEmpty('false')).toBe(false);
        expect(isEmpty('null')).toBe(false);
        expect(isEmpty('undefined')).toBe(false);
        expect(isEmpty('[]')).toBe(false);
        expect(isEmpty('{}')).toBe(false);
    });
});

describe('isNotEmpty', () => {
    it('returns true when value is an empty string', () => {
        expect(isNotEmpty('')).toBe(false);
        expect(isNotEmpty(String())).toBe(false);
    });

    it('returns false when value is not an empty string', () => {
        expect(isNotEmpty('0')).toBe(true);
        expect(isNotEmpty('false')).toBe(true);
        expect(isNotEmpty('null')).toBe(true);
        expect(isNotEmpty('undefined')).toBe(true);
        expect(isNotEmpty('[]')).toBe(true);
        expect(isNotEmpty('{}')).toBe(true);
    });
});

describe('length', () => {
    it('returns a string length', () => {
        expect(length(''))
            .toBe(0);
        expect(length('ABC'))
            .toBe(3);
    });
});

describe('stringFromCharCode', () => {
    it('creates a string from the given UTF-16 code units', () => {
        expect(stringFromCharCode(65, 66, 67))
            .toBe('ABC');
    });
});

describe('stringFromCodePoint', () => {
    it('creates a string from the given code points', () => {
        expect(stringFromCodePoint(0x1F1FA, 0x1F1F8))
            .toBe('🇺🇸');
    });
});
