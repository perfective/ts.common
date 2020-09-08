import { output } from './output';

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
    });
});
