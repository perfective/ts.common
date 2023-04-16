import { isEmpty, isFalsy, isObject, isRecord, isTruthy } from './predicate';

describe(isObject, () => {
    describe('when the value is a plain object', () => {
        it('returns true', () => {
            expect(isObject({})).toBe(true);
        });
    });

    describe('when the value is an array', () => {
        it('returns true', () => {
            expect(isObject(['a', 'b', 'c'])).toBe(true);
            expect(isObject(Array.from({ length: 3 }))).toBe(true);
        });
    });

    describe('when the value is a Date', () => {
        it('returns true', () => {
            expect(isObject(new Date())).toBe(true);
        });
    });

    describe('when the value is a RegExp', () => {
        it('returns true', () => {
            expect(isObject(/^/u)).toBe(true);
        });
    });

    describe('when the value is undefined', () => {
        it('returns false', () => {
            expect(isObject(undefined)).toBe(false);
        });
    });

    describe('when the value is null', () => {
        it('returns false', () => {
            expect(isObject(null)).toBe(false);
        });
    });

    describe('when the value is boolean', () => {
        it('returns false', () => {
            expect(isObject(false)).toBe(false);
            expect(isObject(true)).toBe(false);
        });
    });

    describe('when the value is a string', () => {
        it('returns false', () => {
            expect(isObject('')).toBe(false);
        });
    });

    describe('when the value is a number', () => {
        it('returns false', () => {
            expect(isObject(0)).toBe(false);
            expect(isObject(Number.NaN)).toBe(false);
            expect(isObject(Number.POSITIVE_INFINITY)).toBe(false);
            expect(isObject(Number.NEGATIVE_INFINITY)).toBe(false);
        });
    });
});

describe(isRecord, () => {
    describe('when the value is a plain object', () => {
        it('returns true', () => {
            expect(isRecord({})).toBe(true);
            expect(isRecord({
                pi: 3.14,
                euler: 2.71,
            })).toBe(true);
        });
    });

    describe('when the value is null', () => {
        it('returns false', () => {
            expect(isRecord(null)).toBe(false);
            expect(isRecord(Object.create(null))).toBe(false);
        });
    });

    describe('when the value is not a plain object', () => {
        it('returns false', () => {
            expect(isRecord(new Date())).toBe(false);
            expect(isRecord(new RegExp('', 'u'))).toBe(false);
        });
    });

    describe('when the value is an array', () => {
        it('returns false', () => {
            expect(isRecord([])).toBe(false);
        });
    });

    describe('when the value is undefined', () => {
        it('returns false', () => {
            expect(isRecord(undefined)).toBe(false);
        });
    });

    describe('when the value is a string', () => {
        it('returns false', () => {
            expect(isRecord('')).toBe(false);
        });
    });

    describe('when the value is boolean', () => {
        it('returns false', () => {
            expect(isRecord(false)).toBe(false);
            expect(isRecord(true)).toBe(false);
        });
    });

    describe('when the value type is not object', () => {
        it('returns false', () => {
            expect(isRecord(0)).toBe(false);
        });
    });
});

/* eslint-disable deprecation/deprecation -- TODO: Remove in v0.11.0-alpha */
describe(isTruthy, () => {
    describe('when the value is true', () => {
        it('returns false', () => {
            expect(isTruthy(true)).toBe(true);
        });
    });
});

describe(isFalsy, () => {
    describe('when the value is false', () => {
        it('returns true', () => {
            expect(isFalsy(false)).toBe(true);
        });
    });
});
/* eslint-enable deprecation/deprecation */

describe(isEmpty, () => {
    describe('when the value is undefined', () => {
        it('returns true', () => {
            expect(isEmpty(undefined)).toBe(true);
        });
    });

    describe('when the value is null', () => {
        it('returns true', () => {
            expect(isEmpty(null)).toBe(true);
        });
    });

    describe('when the value returns false', () => {
        it('returns true', () => {
            expect(isEmpty(false)).toBe(true);
        });
    });

    describe('when the value is an empty string', () => {
        it('returns true', () => {
            expect(isEmpty(null)).toBe(true);
        });
    });

    describe('when the value is a zero', () => {
        it('returns true', () => {
            expect(isEmpty(0)).toBe(true);
            expect(isEmpty(BigInt(0))).toBe(true);
        });
    });

    describe('when the value is a NaN', () => {
        it('returns true', () => {
            expect(isEmpty(Number.NaN)).toBe(true);
        });
    });

    describe('when the value is an empty array', () => {
        it('returns true', () => {
            expect(isEmpty([])).toBe(true);
            expect(isEmpty(Array.from({ length: 0 }))).toBe(true);
        });
    });

    describe('when the value is an empty object', () => {
        it('returns true', () => {
            expect(isEmpty({})).toBe(true);
        });
    });

    describe('when the value returns true', () => {
        it('returns true', () => {
            expect(isEmpty(true)).toBe(false);
        });
    });

    describe('when the value is a non-empty array', () => {
        it('returns false', () => {
            expect(isEmpty([0])).toBe(false);
            expect(isEmpty(Array.from({ length: 1 }))).toBe(false);
        });
    });

    describe('when the value is a non-empty object', () => {
        it('returns false', () => {
            expect(isEmpty(new Date())).toBe(false);
            expect(isEmpty(new RegExp('', 'u'))).toBe(false);
        });
    });
});
