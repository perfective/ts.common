import { isObject } from './object';

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
