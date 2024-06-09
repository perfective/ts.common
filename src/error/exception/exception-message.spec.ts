import { describe, expect, it } from '@jest/globals';

import { ExceptionMessage, exceptionMessage, exceptionMessageOutput } from './exception-message';

describe(exceptionMessage, () => {
    describe('exceptionMessage(template)', () => {
        it('creates an ExceptionMessage with the given template and empty tokens', () => {
            expect(exceptionMessage('HTTP request failed'))
                .toStrictEqual({
                    template: 'HTTP request failed',
                    tokens: {},
                } as ExceptionMessage);
        });
    });

    describe('exceptionMessage(template, tokens)', () => {
        it('creates an ExceptionMessage with the given template and tokens', () => {
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
});

describe(exceptionMessageOutput, () => {
    describe('when ExceptionMessage has no tokens', () => {
        it('returns the original ExceptionMessage template', () => {
            expect(exceptionMessageOutput(exceptionMessage('Invalid argument {{key}}')))
                .toBe('Invalid argument {{key}}');
        });
    });

    describe('when ExceptionMessage has tokens that are not present in the template', () => {
        it('ignores extra tokens', () => {
            expect(exceptionMessageOutput(exceptionMessage('Invalid argument {{key}}', {
                key: 'value',
                map: 'WeakMap',
            }))).toBe('Invalid argument `value`');
        });
    });

    describe('when ExceptionMessage template has multiple occurrences of the same token', () => {
        it('replaces all occurrences of the same token', () => {
            expect(exceptionMessageOutput(exceptionMessage('Invalid argument {{key}}: {{key}} must be defined', {
                key: 'value',
            }))).toBe('Invalid argument `value`: `value` must be defined');
        });
    });
});
