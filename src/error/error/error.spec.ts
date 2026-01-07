import { describe, expect, it } from '@jest/globals';

import { error, errorOutput, isError, isNotError, stack } from './error';

describe(error, () => {
    it('creates an Error with a given message', () => {
        // eslint-disable-next-line jest/no-error-equal -- testing error constructor
        expect(error('Exception'))
            .toStrictEqual(new Error('Exception'));
    });
});

describe(isError, () => {
    describe('when a given value is an Error', () => {
        it('returns true', () => {
            expect(isError(error('Error')))
                .toBe(true);
        });
    });

    describe('when a given value is not an Error', () => {
        it('returns false', () => {
            expect(isError('Error'))
                .toBe(false);
        });
    });
});

describe(isNotError, () => {
    describe('when a given value is not an Error', () => {
        it('returns true when value is not an Error', () => {
            expect(isNotError('Error'))
                .toBe(true);
        });
    });

    describe('when a given value is an Error', () => {
        it('returns false when value is an Error', () => {
            expect(isNotError(error('Error')))
                .toBe(false);
        });
    });
});

describe(errorOutput, () => {
    describe('when a given error has no message', () => {
        it('returns only the error name', () => {
        // eslint-disable-next-line unicorn/error-message -- testing undefined message
            expect(errorOutput(new ReferenceError()))
                .toBe('ReferenceError');
        });
    });

    describe('when a given error has message', () => {
        it('returns human-readable string matching Error.toString() on Node.js', () => {
            expect(errorOutput(error('Failure!')))
                .toBe('Error: Failure!');
            expect(errorOutput(new TypeError('Invalid type')))
                .toBe('TypeError: Invalid type');
        });
    });
});

describe(stack, () => {
    describe('when Error.stack property is defined', () => {
        it('returns Error.stack', () => {
            const error: Error = new Error('Stack');

            expect(stack(error))
                .toMatch('Error: Stack\n    at Object.<anonymous>');
        });
    });

    describe('when Error.stack property is undefined', () => {
        it('returns message with "at <unknown>" suffix', () => {
            const error: Error = new Error('No Stack');
            delete error.stack;

            expect(stack(error))
                .toBe('No Stack\n    at <unknown>');
        });
    });
});
