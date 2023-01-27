import { isNotOutput, isOutput, output } from './output';

/* eslint-disable deprecation/deprecation -- TODO: Remove in v0.10.0 */
describe('output', () => {
    it('returns a string value as is', () => {
        expect(output('3.14'))
            .toBe('3.14');
        expect(output(String(3.14)))
            .toBe('3.14');
    });

    it('returns "undefined" when the value is undefined', () => {
        expect(output(undefined))
            .toBe('undefined');
    });

    it('returns "null" when the value is null', () => {
        expect(output(null))
            .toBe('null');
    });

    it('returns number as a string when the value is a number', () => {
        expect(output(3.14))
            .toBe('3.14');
    });

    it('returns "NaN" when the value is NaN', () => {
        expect(output(Number.NaN))
            .toBe('NaN');
    });

    it('returns "Infinity" when the value is a POSITIVE_INFINITY', () => {
        expect(output(Number.POSITIVE_INFINITY))
            .toBe('Infinity');
    });

    it('returns "-Infinity" when the value is a NEGATIVE_INFINITY', () => {
        expect(output(Number.NEGATIVE_INFINITY))
            .toBe('-Infinity');
    });

    it('returns "false" when the value is a boolean false', () => {
        expect(output(false))
            .toBe('false');
    });

    it('returns "true" when the value a boolean true', () => {
        expect(output(true))
            .toBe('true');
    });

    it('returns an empty string when the value is an empty array', () => {
        expect(output([]))
            .toBe('');
    });

    it('returns a comma-separate list of value when the value is an array', () => {
        expect(output(['a', 'b', 'c']))
            .toBe('a,b,c');
    });

    it('returns "[object Object]" when the value is an object without implemented toString()', () => {
        expect(output({}))
            .toBe('[object Object]');
        expect(output({
            a: 'a',
            b: 'b',
        })).toBe('[object Object]');
    });

    it('returns the text of the function when the value is an a function', () => {
        expect(output(() => ({})))
            .toBe('() => ({})');
        expect(output(output))
            .toContain('function output(value)');
    });

    it('returns symbol when the value is a Symbol', () => {
        expect(output(Symbol('$')))
            .toBe('Symbol($)');
    });
});

describe('isOutput', () => {
    it('returns true when value implements toString()', () => {
        expect(isOutput(Number.NaN))
            .toBe(true);
        expect(isOutput(true))
            .toBe(true);
        expect(isOutput(false))
            .toBe(true);
    });

    it('returns false when value does not implement toString()', () => {
        expect(isOutput(undefined))
            .toBe(false);
        expect(isOutput(null))
            .toBe(false);
        expect(isOutput({
            toString: undefined,
        })).toBe(false);
    });
});

describe('isNotOutput', () => {
    it('returns true when value does not implement toString()', () => {
        expect(isNotOutput(undefined))
            .toBe(true);
        expect(isNotOutput(null))
            .toBe(true);
        expect(isNotOutput({
            toString: undefined,
        })).toBe(true);
    });

    it('returns false when value implements toString()', () => {
        expect(isOutput(Number.POSITIVE_INFINITY))
            .toBe(true);
        expect(isOutput(Symbol('$')))
            .toBe(true);
        expect(isOutput(output))
            .toBe(true);
    });
});
/* eslint-enable deprecation/deprecation */
