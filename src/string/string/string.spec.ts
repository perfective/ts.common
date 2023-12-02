import {
    isEmpty,
    isNotEmpty,
    isNotString,
    isString,
    length,
} from './string';

describe(isString, () => {
    describe('when the value is a string literal', () => {
        it('returns true', () => {
            expect(isString('3.14')).toBe(true);
        });
    });

    describe('when the value is a String object', () => {
        it('returns true', () => {
            expect(isString(String(3.14))).toBe(true);
        });
    });

    describe('when the value is a number', () => {
        it('returns false', () => {
            expect(isString(3.14)).toBe(false);
        });
    });

    describe('when the value is a boolean', () => {
        it('returns false', () => {
            expect(isString(true)).toBe(false);
            expect(isString(false)).toBe(false);
        });
    });

    describe('when the value is null', () => {
        it('returns false', () => {
            expect(isString(null)).toBe(false);
        });
    });

    describe('when the value is undefined', () => {
        it('returns false', () => {
            expect(isString(undefined)).toBe(false);
        });
    });

    describe('when the value is an array', () => {
        it('returns false', () => {
            expect(isString([])).toBe(false);
        });
    });

    describe('when the value is an object', () => {
        it('returns false', () => {
            expect(isString({})).toBe(false);
        });
    });
});

describe(isNotString, () => {
    describe('when the value is a string literal', () => {
        it('returns false', () => {
            expect(isNotString('3.14')).toBe(false);
        });
    });

    describe('when the value is a String object', () => {
        it('returns false', () => {
            expect(isNotString(String(3.14))).toBe(false);
        });
    });

    describe('when the value is a number', () => {
        it('returns true', () => {
            expect(isNotString(3.14)).toBe(true);
        });
    });

    describe('when the value is a boolean', () => {
        it('returns true', () => {
            expect(isNotString(true)).toBe(true);
            expect(isNotString(false)).toBe(true);
        });
    });

    describe('when the value is null', () => {
        it('returns true', () => {
            expect(isNotString(null)).toBe(true);
        });
    });

    describe('when value is undefined', () => {
        it('returns true', () => {
            expect(isNotString(undefined)).toBe(true);
        });
    });

    describe('when value is an array', () => {
        it('returns true', () => {
            expect(isNotString([])).toBe(true);
        });
    });

    describe('when value is an object', () => {
        it('returns true', () => {
            expect(isNotString({})).toBe(true);
        });
    });
});

describe(isEmpty, () => {
    describe('when value is an empty string', () => {
        it('returns true', () => {
            expect(isEmpty('')).toBe(true);
            expect(isEmpty(String())).toBe(true);
        });
    });

    describe('when value is not an empty string', () => {
        it('returns false', () => {
            expect(isEmpty('0')).toBe(false);
            expect(isEmpty('false')).toBe(false);
            expect(isEmpty('null')).toBe(false);
            expect(isEmpty('undefined')).toBe(false);
        });
    });
});

describe(isNotEmpty, () => {
    describe('when value is an empty string', () => {
        it('returns false', () => {
            expect(isNotEmpty('')).toBe(false);
            expect(isNotEmpty(String())).toBe(false);
        });
    });

    describe('when value is not an empty string', () => {
        it('returns true', () => {
            expect(isNotEmpty('0')).toBe(true);
            expect(isNotEmpty('false')).toBe(true);
            expect(isNotEmpty('null')).toBe(true);
            expect(isNotEmpty('undefined')).toBe(true);
        });
    });
});

describe(length, () => {
    it('returns length of the given string', () => {
        expect(length('')).toBe(0);
        expect(length('ABC')).toBe(3);
    });
});
