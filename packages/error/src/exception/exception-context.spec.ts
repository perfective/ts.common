import { exceptionMessage } from './exception-context';

describe('exceptionMessage', () => {
    it('keeps message the same when no context is provided', () => {
        expect(exceptionMessage('Invalid argument {{key}}', {}))
            .toStrictEqual('Invalid argument {{key}}');
    });

    it('skips tokens that are not present in the template', () => {
        expect(exceptionMessage('Invalid argument {{key}}', {
            key: 'value',
            map: 'WeakMap',
            value: null,
        })).toStrictEqual('Invalid argument `value`');
    });

    it('replaces all tokens when they are provided as strings in the context', () => {
        expect(exceptionMessage('Invalid argument {{key}} in map {{map}}', {
            key: 'value',
            map: 'WeakMap',
        })).toStrictEqual('Invalid argument `value` in map `WeakMap`');
    });

    it('skips tokens when they are provided as not strings in the context', () => {
        expect(exceptionMessage('Invalid argument {{key}} in map {{map}}', {
            key: null,
            map: 'WeakMap',
        })).toStrictEqual('Invalid argument {{key}} in map `WeakMap`');
        expect(exceptionMessage('Invalid argument {{key}} in map {{map}}', {
            key: null,
            map: {
                class: 'WeakMap',
                method: 'get',
            },
        })).toStrictEqual('Invalid argument {{key}} in map {{map}}');
    });

    it('replaces all occurrences of the same token', () => {
        expect(exceptionMessage('Invalid argument {{key}}: {{key}} must be defined', {
            key: 'value',
        })).toStrictEqual('Invalid argument `value`: `value` must be defined');
    });
});
