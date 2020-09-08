import { isNotOutput, isOutput, output } from './output';

describe('output', () => {
    it('returns a string value as is', () => {
        expect(output('3.14'))
            .toStrictEqual('3.14');
    });

    it('returns a result of the object toString() method', () => {
        expect(output(undefined))
            .toStrictEqual('undefined');
        expect(output(null))
            .toStrictEqual('null');
        expect(output(String(3.14)))
            .toStrictEqual('3.14');
        expect(output(3.14))
            .toStrictEqual('3.14');
        expect(output(Number.NaN))
            .toStrictEqual('NaN');
        expect(output(Infinity))
            .toStrictEqual('Infinity');
        expect(output(Number.NEGATIVE_INFINITY))
            .toStrictEqual('-Infinity');
        expect(output(Number.POSITIVE_INFINITY))
            .toStrictEqual('Infinity');
        expect(output(false))
            .toStrictEqual('false');
        expect(output(true))
            .toStrictEqual('true');
        expect(output([]))
            .toStrictEqual('');
        expect(output(['a', 'b', 'c']))
            .toStrictEqual('a,b,c');
        expect(output({}))
            .toStrictEqual('[object Object]');
        expect(output({
            a: 'a',
            b: 'b',
        })).toStrictEqual('[object Object]');
        expect(output(() => ({})))
            .toStrictEqual('() => ({})');
        expect(output(output))
            .toContain('function output(value)');
        expect(output(Symbol('$')))
            .toStrictEqual('Symbol($)');
    });
});

describe('isOutput', () => {
    it('returns true when value implements toString()', () => {
        expect(isOutput(Number.NaN))
            .toStrictEqual(true);
        expect(isOutput(true))
            .toStrictEqual(true);
        expect(isOutput(false))
            .toStrictEqual(true);
    });

    it('returns false when value does not implement toString()', () => {
        expect(isOutput(undefined))
            .toStrictEqual(false);
        expect(isOutput(null))
            .toStrictEqual(false);
        expect(isOutput({
            toString: undefined,
        })).toStrictEqual(false);
    });
});

describe('isNotOutput', () => {
    it('returns true when value does not implement toString()', () => {
        expect(isNotOutput(undefined))
            .toStrictEqual(true);
        expect(isNotOutput(null))
            .toStrictEqual(true);
        expect(isNotOutput({
            toString: undefined,
        })).toStrictEqual(true);
    });

    it('returns false when value implements toString()', () => {
        expect(isOutput(Infinity))
            .toStrictEqual(true);
        expect(isOutput(Symbol('$')))
            .toStrictEqual(true);
        expect(isOutput(output))
            .toStrictEqual(true);
    });
});
