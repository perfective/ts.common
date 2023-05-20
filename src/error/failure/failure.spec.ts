import { error } from '../error/error';
import { typeError } from '../error/type-error';
import { causedBy, exception } from '../exception/exception';

import { Failure, failure } from './failure';

describe(failure, () => {
    describe('when given an error', () => {
        it('creates a Failure from an Error', () => {
            expect(failure(error('Permission denied to access property "x"')))
                .toStrictEqual({
                    name: 'Error',
                    message: {
                        template: 'Permission denied to access property "x"',
                        tokens: {},
                    },
                    chain: [
                        'Error: Permission denied to access property "x"',
                    ],
                } as Failure);
            expect(failure(typeError('e.toJSON is not a function')))
                .toStrictEqual({
                    name: 'TypeError',
                    message: {
                        template: 'e.toJSON is not a function',
                        tokens: {},
                    },
                    chain: [
                        'TypeError: e.toJSON is not a function',
                    ],
                } as Failure);
        });
    });

    describe('when given an Exception', () => {
        it('creates a Failure from an Exception', () => {
            expect(failure(exception('Permission denied to access property {{property}}', {
                property: 'x',
            })))
                .toStrictEqual({
                    name: 'Exception',
                    message: {
                        template: 'Permission denied to access property {{property}}',
                        tokens: {
                            property: 'x',
                        },
                    },
                    chain: [
                        'Exception: Permission denied to access property `x`',
                    ],
                } as Failure);
            expect(failure(exception('{{value}} is not a function', {
                value: 'e.toJSON',
            }))).toStrictEqual({
                name: 'Exception',
                message: {
                    template: '{{value}} is not a function',
                    tokens: {
                        value: 'e.toJSON',
                    },
                },
                chain: [
                    'Exception: `e.toJSON` is not a function',
                ],
            } as Failure);
        });

        it('unchains the list of previous errors as causes list', () => {
            expect(failure(
                causedBy(
                    causedBy(
                        error('Permission denied to access property "x"'),
                        'Failed to add HTTP Header {{header}}',
                        {
                            header: 'x',
                        },
                    ),
                    'Failed to create an HTTP request',
                ),
            )).toStrictEqual({
                name: 'Exception',
                message: {
                    template: 'Failed to create an HTTP request',
                    tokens: {},
                },
                chain: [
                    'Exception: Failed to create an HTTP request',
                    'Exception: Failed to add HTTP Header `x`',
                    'Error: Permission denied to access property "x"',
                ],
            } as Failure);
        });
    });
});
