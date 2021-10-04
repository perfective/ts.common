import { error } from '../error/error';
import { rangeError } from '../error/range-error';
import { syntaxError } from '../error/syntax-error';
import { typeError } from '../error/type-error';

import {
    causedBy,
    chainStack,
    Exception,
    exception,
    fault,
    isException,
    isNotException,
    unchained,
    unknownError,
} from './exception';

describe('exception', () => {
    const error: Exception = exception('User not found');
    const contextError: Exception = exception('User {{id}} not found', {
        id: '42',
    }, {
        user: {},
    });

    it('creates an instance of an Exception', () => {
        expect(error.name).toBe('Exception');
        expect(error.message).toBe('User not found');
        expect(error.template).toBe('User not found');
        expect(error.tokens).toStrictEqual({});
        expect(error.context).toStrictEqual({});
        expect(error.previous).toBeNull();
    });

    it('creates an instance of an Exception with context data', () => {
        expect(contextError.name).toBe('Exception');
        expect(contextError.message).toBe('User `42` not found');
        expect(contextError.template).toBe('User {{id}} not found');
        expect(contextError.tokens).toStrictEqual({
            id: '42',
        });
        expect(contextError.context).toStrictEqual({
            user: {},
        });
    });

    it('provides an error stack', () => {
        expect(error.stack).toBeDefined();
        expect(contextError.stack).toBeDefined();
    });

    it('outputs error message', () => {
        expect(error.toString()).toBe('Exception: User not found');
    });
});

describe('causedBy', () => {
    const chain: Exception = causedBy(error('Resource not found'), 'API request failed');
    const contextChain: Exception = causedBy(error('Resource not found'), '{{api}} request failed', {
        api: 'User API',
    }, {
        user: {
            id: '42',
        },
    });

    it('creates an instance of an Exception', () => {
        expect(chain.name).toBe('Exception');
        expect(chain.message).toBe('API request failed');
        expect(chain.template).toBe('API request failed');
        expect(chain.context).toStrictEqual({});
        expect(chain.previous).toStrictEqual(error('Resource not found'));
    });

    it('creates an instance of an Exception with context data', () => {
        expect(contextChain.name).toBe('Exception');
        expect(contextChain.message).toBe('`User API` request failed');
        expect(contextChain.template).toBe('{{api}} request failed');
        expect(contextChain.tokens).toStrictEqual({
            api: 'User API',
        });
        expect(contextChain.context).toStrictEqual({
            user: {
                id: '42',
            },
        });
        expect(chain.previous).toStrictEqual(error('Resource not found'));
    });

    it('provides an error stack', () => {
        expect(chain.stack).toBeDefined();
        expect(contextChain.stack).toBeDefined();
    });

    it('outputs all previous messages', () => {
        expect(chain.toString()).toStrictEqual([
            'Exception: API request failed',
            '\t- Error: Resource not found',
        ].join('\n'));
        expect(contextChain.toString()).toStrictEqual([
            'Exception: `User API` request failed',
            '\t- Error: Resource not found',
        ].join('\n'));
        expect(causedBy(chain, 'Internal Server Error').toString())
            .toStrictEqual([
                'Exception: Internal Server Error',
                '\t- Exception: API request failed',
                '\t- Error: Resource not found',
            ].join('\n'));
        expect(causedBy(
            causedBy(
                typeError(`Cannot read property 'toString' of undefined`),
                'Failed to output user {{user}}',
                {
                    user: 'John Doe',
                },
            ),
            'Failed request {{request}}',
            {
                request: 'GET http://localhost',
            },
        ).toString()).toStrictEqual([
            'Exception: Failed request `GET http://localhost`',
            '\t- Exception: Failed to output user `John Doe`',
            `\t- TypeError: Cannot read property 'toString' of undefined`,
        ].join('\n'));
    });
});

describe('unknownError', () => {
    it('returns the passed value as is when the value is an Error', () => {
        const error: Exception = exception('Failure');

        expect(unknownError(error) === error)
            .toBe(true);
    });

    it('returns an exception with the passed value in context when the value is not an Error', () => {
        expect(unknownError('Failure'))
            .toStrictEqual(exception('Literal error', {}, {
                error: 'Failure',
            }));
        expect(unknownError(404))
            .toStrictEqual(exception('Literal error', {}, {
                error: 404,
            }));
    });
});

describe('isException', () => {
    it('returns true when value is an instance of Exception', () => {
        expect(isException(exception('User-defined Exception')))
            .toBe(true);
    });

    it('returns false when value is not an instance of Exception', () => {
        expect(isException(error('Previous')))
            .toBe(false);
        expect(isException('Previous'))
            .toBe(false);
    });
});

describe('isNotException', () => {
    it('returns false when value is an instance of Exception', () => {
        expect(isNotException(exception('User-defined Exception')))
            .toBe(false);
    });

    it('returns true when value is not an instance of Exception', () => {
        expect(isNotException(error('Previous')))
            .toBe(true);
        expect(isNotException('Previous'))
            .toBe(true);
    });
});

describe('chainStack', () => {
    it('returns stack of the given error', () => {
        expect(chainStack(typeError('"x" is not a function')))
            .toMatch('TypeError: "x" is not a function\n    at typeError (');
    });

    it('returns stack of stack of all the chained errors', () => {
        const trace: string = chainStack(
            causedBy(typeError('"x" is not a function'), 'Failed to process input'),
        );

        expect(trace)
            .toMatch(/^Exception: Failed to process input\n {4}at causedBy \(/u);
        expect(trace)
            .toMatch('Caused by: TypeError: "x" is not a function\n    at typeError (');
    });
});

describe('fault', () => {
    it('returns the error itself for a single error', () => {
        expect(fault(syntaxError('missing variable name')))
            .toStrictEqual(syntaxError('missing variable name'));
    });

    it('returns the original error in the error chain', () => {
        expect(fault(causedBy(syntaxError('missing variable name'), 'Build failed')))
            .toStrictEqual(syntaxError('missing variable name'));
    });
});

describe('unchained', () => {
    it('returns an array with the error itself for a single error', () => {
        expect(unchained(rangeError('The precision is out of range')))
            .toStrictEqual([rangeError('The precision is out of range')]);
    });

    it('returns an array with all the errors in the chain, starting from the latest', () => {
        expect(unchained(causedBy(
            rangeError('The precision is out of range'),
            'Failed to output a float',
        ))).toStrictEqual([
            exception('Failed to output a float'),
            rangeError('The precision is out of range'),
        ]);
    });
});
