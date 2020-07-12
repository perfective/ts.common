import { error } from '../error/error';
import { rangeError } from '../error/range-error';
import { syntaxError } from '../error/syntax-error';
import { typeError } from '../error/type-error';

import {
    causedBy,
    chainStack,
    exception,
    fault,
    isException,
    isNotException,
    unchained,
} from './exception';

describe('exception', () => {
    const error = exception('User not found');
    const contextError = exception('User {{id}} not found', {
        id: '42',
    });

    it('creates an instance of an Exception', () => {
        expect(error.name).toStrictEqual('Exception');
        expect(error.message).toStrictEqual('User not found');
        expect(error.template).toStrictEqual('User not found');
        expect(error.context).toStrictEqual({});
        expect(error.previous).toBeNull();
    });

    it('creates an instance of an Exception with context data', () => {
        expect(contextError.name).toStrictEqual('Exception');
        expect(contextError.message).toStrictEqual('User `42` not found');
        expect(contextError.template).toStrictEqual('User {{id}} not found');
        expect(contextError.context).toStrictEqual({
            id: '42',
        });
    });

    it('provides an error stack', () => {
        expect(error.stack).toBeDefined();
        expect(contextError.stack).toBeDefined();
    });

    it('outputs error message', () => {
        expect(error.toString()).toStrictEqual('Exception: User not found');
    });
});

describe('causedBy', () => {
    const chain = causedBy(error('Resource not found'), 'API request failed');
    const contextChain = causedBy(error('Resource not found'), '{{api}} request failed', {
        api: 'User API',
    });

    it('creates an instance of an Exception', () => {
        expect(chain.name).toStrictEqual('Exception');
        expect(chain.message).toStrictEqual('API request failed');
        expect(chain.template).toStrictEqual('API request failed');
        expect(chain.context).toStrictEqual({});
        expect(chain.previous).toStrictEqual(error('Resource not found'));
    });

    it('creates an instance of an Exception with context data', () => {
        expect(contextChain.name).toStrictEqual('Exception');
        expect(contextChain.message).toStrictEqual('`User API` request failed');
        expect(contextChain.template).toStrictEqual('{{api}} request failed');
        expect(contextChain.context).toStrictEqual({
            api: 'User API',
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

describe('isException', () => {
    it('returns true when value is an instance of Exception', () => {
        expect(isException(exception('User-defined Exception')))
            .toStrictEqual(true);
    });

    it('returns false when value is not an instance of Exception', () => {
        expect(isException(error('Previous')))
            .toStrictEqual(false);
        expect(isException('Previous'))
            .toStrictEqual(false);
    });
});

describe('isNotException', () => {
    it('returns false when value is an instance of Exception', () => {
        expect(isNotException(exception('User-defined Exception')))
            .toStrictEqual(false);
    });

    it('returns true when value is not an instance of Exception', () => {
        expect(isNotException(error('Previous')))
            .toStrictEqual(true);
        expect(isNotException('Previous'))
            .toStrictEqual(true);
    });
});

describe('chainStack', () => {
    it('returns stack of the given error', () => {
        expect(chainStack(typeError('"x" is not a function')))
            .toMatch('TypeError: "x" is not a function\n    at Object.typeError (');
    });

    it('returns stack of stack of all the chained errors', () => {
        const trace: string = chainStack(
            causedBy(typeError('"x" is not a function'), 'Failed to process input'),
        );
        expect(trace)
            .toMatch(/^Exception: Failed to process input\n {4}at Object.causedBy \(/u);
        expect(trace)
            .toMatch('Caused by: TypeError: "x" is not a function\n    at Object.typeError (');
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
