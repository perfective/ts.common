import { isFalsy, isObject, isTruthy } from './predicate';

describe('isObject', () => {
    it('is true when the given value is an plain object', () => {
        expect(isObject({}))
            .toBe(true);
    });

    it('is true when the given value is an array', () => {
        expect(isObject(['a', 'b', 'c']))
            .toBe(true);
        expect(isObject(new Array(3)))
            .toBe(true);
    });

    it('is true when the given value is a Date', () => {
        expect(isObject(new Date()))
            .toBe(true);
    });

    it('is true when the given value is a RegExp', () => {
        expect(isObject(/^/u))
            .toBe(true);
    });

    it('is false when the given value is undefined', () => {
        expect(isObject(undefined))
            .toBe(false);
    });

    it('is false when the given value is null', () => {
        expect(isObject(null))
            .toBe(false);
    });

    it('is false when the given value is boolean', () => {
        expect(isObject(false))
            .toBe(false);
        expect(isObject(true))
            .toBe(false);
    });

    it('is false when the given value is a string', () => {
        expect(isObject(''))
            .toBe(false);
    });

    it('is false when the given value is a number', () => {
        expect(isObject(0))
            .toBe(false);
        expect(isObject(Number.NaN))
            .toBe(false);
        expect(isObject(Number.POSITIVE_INFINITY))
            .toBe(false);
        expect(isObject(Number.NEGATIVE_INFINITY))
            .toBe(false);
    });
});

describe('isTruthy', () => {
    it('is true when the given value is a non-empty string', () => {
        expect(isTruthy('undefined'))
            .toBe(true);
        expect(isTruthy('null'))
            .toBe(true);
        expect(isTruthy('0'))
            .toBe(true);
    });

    it('is true when the given value is a non-zero number', () => {
        expect(isTruthy(Number.MAX_SAFE_INTEGER))
            .toBe(true);
        expect(isTruthy(Number.MAX_VALUE))
            .toBe(true);
        expect(isTruthy(Number.MIN_VALUE))
            .toBe(true);
        expect(isTruthy(Number.POSITIVE_INFINITY))
            .toBe(true);
        expect(isTruthy(Number.NEGATIVE_INFINITY))
            .toBe(true);
    });

    it('is false when the given value is non-zero BigInt', () => {
        expect(isTruthy(BigInt(Number.MAX_SAFE_INTEGER)))
            .toBe(true);
    });

    it('is true when the given value is an (empty) object', () => {
        expect(isTruthy({}))
            .toBe(true);
    });

    it('is true when the given value is an (empty) array', () => {
        expect(isTruthy([]))
            .toBe(true);
    });

    it('is true when the given value is an (empty) RegExp', () => {
        expect(isTruthy(new RegExp('', 'u')))
            .toBe(true);
    });

    it('is false when the given value is undefined', () => {
        expect(isTruthy(undefined))
            .toBe(false);
    });

    it('is false when the given value is null', () => {
        expect(isTruthy(null))
            .toBe(false);
    });

    it('is false when the given value is an empty string', () => {
        expect(isTruthy(''))
            .toBe(false);
    });

    it('is false when the given value is zero', () => {
        expect(isTruthy(0))
            .toBe(false);
    });

    it('is false when the given value is zero BigInt', () => {
        expect(isTruthy(BigInt(0)))
            .toBe(false);
    });

    it('is false when the given value is NaN', () => {
        expect(isTruthy(Number.NaN))
            .toBe(false);
    });
});

describe('isFalsy', () => {
    it('is true when the given value is undefined', () => {
        expect(isFalsy(undefined))
            .toBe(true);
    });

    it('is true when the given value is null', () => {
        expect(isFalsy(null))
            .toBe(true);
    });

    it('is true when the given value is an empty string', () => {
        expect(isFalsy(''))
            .toBe(true);
    });

    it('is true when the given value is zero', () => {
        expect(isFalsy(0))
            .toBe(true);
    });

    it('is true when the given value is zero BigInt', () => {
        expect(isFalsy(BigInt(0)))
            .toBe(true);
    });

    it('is true when the given value is NaN', () => {
        expect(isFalsy(Number.NaN))
            .toBe(true);
    });

    it('is false when the given value is a non-empty string', () => {
        expect(isFalsy('undefined'))
            .toBe(false);
        expect(isFalsy('null'))
            .toBe(false);
        expect(isFalsy('0'))
            .toBe(false);
    });

    it('is false when the given value is a non-zero number', () => {
        expect(isFalsy(Number.MAX_SAFE_INTEGER))
            .toBe(false);
        expect(isFalsy(Number.MAX_VALUE))
            .toBe(false);
        expect(isFalsy(Number.MIN_VALUE))
            .toBe(false);
        expect(isFalsy(Number.POSITIVE_INFINITY))
            .toBe(false);
        expect(isFalsy(Number.NEGATIVE_INFINITY))
            .toBe(false);
    });

    it('is false when the given value is non-zero BigInt', () => {
        expect(isFalsy(BigInt(Number.MAX_SAFE_INTEGER)))
            .toBe(false);
    });

    it('is false when the given value is an (empty) object', () => {
        expect(isFalsy({}))
            .toBe(false);
    });

    it('is false when the given value is an (empty) array', () => {
        expect(isFalsy([]))
            .toBe(false);
    });

    it('is false when the given value is an (empty) RegExp', () => {
        expect(isFalsy(new RegExp('', 'u')))
            .toBe(false);
    });
});
