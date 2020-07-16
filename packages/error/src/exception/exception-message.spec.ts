import { ExceptionMessage, exceptionMessage, exceptionMessageOutput } from './exception-message';

describe('exceptionMessage', () => {
    it('creates an ExceptionMessage when only a template is provided', () => {
        expect(exceptionMessage('HTTP request failed'))
            .toStrictEqual({
                template: 'HTTP request failed',
                tokens: {},
            } as ExceptionMessage);
    });

    it('creates an ExceptionMessage when tokens are provided', () => {
        expect(exceptionMessage('HTTP {{method}} request failed', {
            method: 'GET',
        }))
            .toStrictEqual({
                template: 'HTTP {{method}} request failed',
                tokens: {
                    method: 'GET',
                },
            } as ExceptionMessage);
    });
});

describe('exceptionMessageOutput', () => {
    it('keeps message the same when no context is provided', () => {
        expect(exceptionMessageOutput(exceptionMessage('Invalid argument {{key}}')))
            .toStrictEqual('Invalid argument {{key}}');
    });

    it('skips tokens that are not present in the template', () => {
        expect(exceptionMessageOutput(exceptionMessage('Invalid argument {{key}}', {
            key: 'value',
            map: 'WeakMap',
        }))).toStrictEqual('Invalid argument `value`');
    });

    it('replaces all occurrences of the same token', () => {
        expect(exceptionMessageOutput(exceptionMessage('Invalid argument {{key}}: {{key}} must be defined', {
            key: 'value',
        }))).toStrictEqual('Invalid argument `value`: `value` must be defined');
    });
});
