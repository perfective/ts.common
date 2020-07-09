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
        })).toStrictEqual('Invalid argument `value`');
    });

    it('replaces all tokens when they are provided in context', () => {
        expect(exceptionMessage('Invalid argument {{key}} in map {{map}}', {
            key: 'value',
            map: 'WeakMap',
        })).toStrictEqual('Invalid argument `value` in map `WeakMap`');
    });

    it('replaces all occurrences of the same token', () => {
        expect(exceptionMessage('Invalid argument {{key}}: {{key}} must be defined', {
            key: 'value',
        })).toStrictEqual('Invalid argument `value`: `value` must be defined');
    });
});
