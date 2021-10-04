import { isNotOutput, isOutput, output } from './output';

describe('output', () => {
    it('returns a string value as is', () => {
        expect(output('3.14'))
            .toBe('3.14');
    });

    it('returns a result of the object toString() method', () => {
        expect(output(undefined))
            .toBe('undefined');
        expect(output(null))
            .toBe('null');
        expect(output(String(3.14)))
            .toBe('3.14');
        expect(output(3.14))
            .toBe('3.14');
        expect(output(Number.NaN))
            .toBe('NaN');
        expect(output(Number.POSITIVE_INFINITY))
            .toBe('Infinity');
        expect(output(Number.NEGATIVE_INFINITY))
            .toBe('-Infinity');
        expect(output(Number.POSITIVE_INFINITY))
            .toBe('Infinity');
        expect(output(false))
            .toBe('false');
        expect(output(true))
            .toBe('true');
        expect(output([]))
            .toBe('');
        expect(output(['a', 'b', 'c']))
            .toBe('a,b,c');
        expect(output({}))
            .toBe('[object Object]');
        expect(output({
            a: 'a',
            b: 'b',
        })).toBe('[object Object]');
        expect(output(() => ({})))
            .toBe('() => ({})');
        expect(output(output))
            .toContain('function output(value)');
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
