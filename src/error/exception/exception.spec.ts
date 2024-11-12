import { describe, expect, it } from '@jest/globals';

import { error } from '../error/error';
import { rangeError } from '../error/range-error';
import { syntaxError } from '../error/syntax-error';
import { typeError } from '../error/type-error';

import {
    causedBy,
    chained,
    chainStack,
    Exception,
    exception,
    fault,
    isException,
    isNotException,
    unchained,
} from './exception';

describe(exception, () => {
    describe('exception(message)', () => {
        const error: Exception = exception('User not found');

        it('creates an instance of an Exception', () => {
            expect(error).toBeInstanceOf(Exception);
            expect(error.name).toBe('Exception');
        });

        it('has message that matches a given template', () => {
            expect(error.message).toBe('User not found');
        });

        it('has a given template', () => {
            expect(error.template).toBe('User not found');
        });

        it('has empty tokens', () => {
            expect(error.tokens).toStrictEqual({});
        });

        it('has empty context', () => {
            expect(error.context).toStrictEqual({});
        });

        it('has no previous error', () => {
            expect(error.previous).toBeNull();
        });

        it('provides an error stack', () => {
            expect(error.stack).toBeDefined();
        });

        describe('toString()', () => {
            it('returns error name and message', () => {
                expect(error.toString()).toBe('Exception: User not found');
            });
        });
    });

    describe('exception(message, tokens)', () => {
        const error: Exception = exception('User {{id}} not found', {
            id: '42',
        });

        it('has message with given tokens inlined into a given template', () => {
            expect(error.message).toBe('User `42` not found');
        });

        it('has given tokens', () => {
            expect(error.tokens).toStrictEqual({
                id: '42',
            });
        });

        it('has empty context', () => {
            expect(error.context).toStrictEqual({});
        });

        describe('toString()', () => {
            it('returns error name and tokenized message', () => {
                expect(error.toString()).toBe('Exception: User `42` not found');
            });
        });
    });

    describe('exception(message, tokens, context)', () => {
        const error: Exception = exception('User {{id}} not found', {
            id: '42',
        }, {
            user: {
                id: 42,
            },
        });

        it('has given context', () => {
            expect(error.context).toStrictEqual({
                user: {
                    id: 42,
                },
            });
        });

        describe('toString()', () => {
            it('returns error name and tokenized message without context', () => {
                expect(error.toString()).toBe('Exception: User `42` not found');
            });
        });
    });
});

describe(chained, () => {
    const previous = error('Previous');

    describe('chained(message)', () => {
        const chainedCausedBy = chained('Exception {{code}}');
        const output = chainedCausedBy(previous);

        it('creates an instance of Exception', () => {
            expect(output).toBeInstanceOf(Exception);
            expect(output.name).toBe('Exception');
        });

        it('has a given template as a message', () => {
            expect(output.message).toBe('Exception {{code}}');
        });

        it('has a given template', () => {
            expect(output.template).toBe('Exception {{code}}');
        });

        it('has empty tokens', () => {
            expect(output.tokens).toStrictEqual({});
        });

        it('has empty context by default', () => {
            expect(output.context).toStrictEqual({});
        });

        it('has previous error', () => {
            expect(output.previous).toBe(previous);
        });
    });

    describe('chained(message, tokens)', () => {
        const chainedCausedBy = chained('Exception {{code}}', {
            code: '0',
        });
        const output = chainedCausedBy(previous);

        it('has message with a given template and inlined tokens', () => {
            expect(output.message).toBe('Exception `0`');
        });

        it('has given tokens', () => {
            expect(output.tokens).toStrictEqual({
                code: '0',
            });
        });
    });

    describe('chained(message, tokens, context)', () => {
        const chainedCausedBy = chained('Exception {{code}}', {
            code: '0',
        }, {
            context: 'spec',
        });
        const output = chainedCausedBy(previous);

        it('has given context', () => {
            expect(output.context).toStrictEqual({
                context: 'spec',
            });
        });
    });
});

describe(causedBy, () => {
    const cause = error('Resource not found');

    describe('causedBy(previous, message)', () => {
        const output: Exception = causedBy(cause, 'API request failed');

        it('creates an instance of an Exception', () => {
            expect(output).toBeInstanceOf(Exception);
            expect(output.name).toBe('Exception');
        });

        it('has a message from a given template', () => {
            expect(output.message).toBe('API request failed');
        });

        it('has a given template', () => {
            expect(output.template).toBe('API request failed');
        });

        it('has empty tokens', () => {
            expect(output.tokens).toStrictEqual({});
        });

        it('has empty context', () => {
            expect(output.context).toStrictEqual({});
        });

        it('has a given previous error', () => {
            expect(output.previous).toBe(cause);
        });

        it('provides an error stack', () => {
            expect(output.stack).toBeDefined();
        });

        describe('toString()', () => {
            const chain = causedBy(output, 'Internal Server Error');

            it('returns messages for all chained errors', () => {
                expect(output.toString()).toStrictEqual([
                    'Exception: API request failed',
                    '\t- Error: Resource not found',
                ].join('\n'));
                expect(chain.toString())
                    .toStrictEqual([
                        'Exception: Internal Server Error',
                        '\t- Exception: API request failed',
                        '\t- Error: Resource not found',
                    ].join('\n'));
            });
        });
    });

    describe('causedBy(previous, message, tokens)', () => {
        const output: Exception = causedBy(cause, '{{api}} request failed', {
            api: 'User API',
        }, {
            user: {
                id: '42',
            },
        });

        it('has a message with inlined tokens into a given template', () => {
            expect(output.message).toBe('`User API` request failed');
        });

        it('has a given template', () => {
            expect(output.template).toBe('{{api}} request failed');
        });

        it('has given tokens', () => {
            expect(output.tokens).toStrictEqual({
                api: 'User API',
            });
        });
    });

    describe('causedBy(previous, message, tokens, context)', () => {
        const output: Exception = causedBy(cause, '{{api}} request failed', {
            api: 'User API',
        }, {
            user: {
                id: 42,
            },
        });

        it('has given context', () => {
            expect(output.context).toStrictEqual({
                user: {
                    id: 42,
                },
            });
        });
    });
});

describe(isException, () => {
    describe('when a given value is an Exception', () => {
        it('returns true', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isException(exception('User-defined Exception'))).toBe(true);
        });
    });

    describe('when a given value is not an Exception', () => {
        it('returns false', () => {
            expect(isException(error('Previous'))).toBe(false);
            expect(isException('Previous')).toBe(false);
        });
    });
});

describe(isNotException, () => {
    describe('when a given value is not an Exception', () => {
        it('returns true', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNotException(error('Previous'))).toBe(true);
            expect(isNotException('Previous')).toBe(true);
        });
    });

    describe('when a given value is an Exception', () => {
        it('returns false', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNotException(exception('User-defined Exception')))
                .toBe(false);
        });
    });
});

describe(chainStack, () => {
    const cause = typeError('"x" is not a function');

    describe('when given an error without a previous error', () => {
        it('returns stack of the given error', () => {
            expect(chainStack(cause))
                .toMatch('TypeError: "x" is not a function\n    at typeError (');
        });
    });

    describe('when given an error with a previous error', () => {
        const output: string = chainStack(causedBy(cause, 'Failed to process input'));

        it('contains the given error stack', () => {
            expect(output).toMatch(/^Exception: Failed to process input\n {4}at causedBy \(/u);
        });

        it('contains the cause error stack', () => {
            expect(output).toMatch('Caused by: TypeError: "x" is not a function\n    at typeError (');
        });
    });
});

describe(fault, () => {
    const cause = syntaxError('missing variable name');

    describe('when given an error without a previous error', () => {
        it('returns the error itself', () => {
            expect(fault(cause)).toStrictEqual(cause);
        });
    });

    describe('when given an error with a previous error', () => {
        const input = causedBy(cause, 'Build failed');

        it('returns the original cause error', () => {
            expect(fault(input)).toStrictEqual(cause);
        });
    });
});

describe(unchained, () => {
    describe('when given an error without previous errors', () => {
        const input = rangeError('The precision is out of range');

        it('returns an array with the error itself for a single error', () => {
            expect(unchained(input))
                .toStrictEqual([input]);
        });
    });

    describe('when given an error with previous error', () => {
        const cause = rangeError('The precision is out of range');
        const input = causedBy(cause, 'Failed to output a float');

        it('returns an array with all the errors in the chain starting from the latest', () => {
            expect(unchained(input)).toStrictEqual([
                exception('Failed to output a float'),
                cause,
            ]);
        });
    });
});
