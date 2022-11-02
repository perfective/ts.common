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
    it('returns true when the value is a string literal', () => {
        expect(isString('3.14')).toBe(true);
    });

    it('returns true when the value is a String object', () => {
        expect(isString(String(3.14))).toBe(true);
    });

    it('returns false when the value is a number', () => {
        expect(isString(3.14)).toBe(false);
    });

    it('returns false when the value is a boolean', () => {
        expect(isString(true)).toBe(false);
        expect(isString(false)).toBe(false);
    });

    it('returns false when the value is null', () => {
        expect(isString(null)).toBe(false);
    });

    it('returns false when the value is undefined', () => {
        expect(isString(undefined)).toBe(false);
    });

    it('returns false when the value is an array', () => {
        expect(isString([])).toBe(false);
    });

    it('returns false when the value is an object', () => {
        expect(isString({})).toBe(false);
    });
});

describe('isNotString', () => {
    it('returns false when the value is a string literal', () => {
        expect(isNotString('3.14')).toBe(false);
    });

    it('returns false when the value is a String object', () => {
        expect(isNotString(String(3.14))).toBe(false);
    });

    it('returns true when the value is a number', () => {
        expect(isNotString(3.14)).toBe(true);
    });

    it('returns true when the value is a boolean', () => {
        expect(isNotString(true)).toBe(true);
        expect(isNotString(false)).toBe(true);
    });

    it('returns true when the value is null', () => {
        expect(isNotString(null)).toBe(true);
    });

    it('returns true when value is undefined', () => {
        expect(isNotString(undefined)).toBe(true);
    });

    it('returns true when value is an array', () => {
        expect(isNotString([])).toBe(true);
    });

    it('returns true when value is an object', () => {
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
    });
});

describe('isNotEmpty', () => {
    it('returns false when value is an empty string', () => {
        expect(isNotEmpty('')).toBe(false);
        expect(isNotEmpty(String())).toBe(false);
    });

    it('returns true when value is not an empty string', () => {
        expect(isNotEmpty('0')).toBe(true);
        expect(isNotEmpty('false')).toBe(true);
        expect(isNotEmpty('null')).toBe(true);
        expect(isNotEmpty('undefined')).toBe(true);
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
