import { error } from '../error/error';
import { rangeError } from '../error/range-error';
import { referenceError } from '../error/reference-error';
import { typeError } from '../error/type-error';
import { causedBy, exception } from '../exception/exception';

import { panic, rethrows, throws } from './panic';

describe(throws, () => {
    describe('throws(String)', () => {
        it('throws an Exception with the given message', () => {
            expect(() => throws('Failure'))
                .toThrow(exception('Failure'));
        });
    });

    describe('throws(String, ExceptionTokens)', () => {
        it('throws an Exception with the given message template and tokens', () => {
            expect(() => throws('Failed to load user {{id}}', {
                id: '42',
            })).toThrow('Failed to load user `42`');
        });
    });

    describe('throws(String, ExceptionTokens, ExceptionContext)', () => {
        it('throws an Exception with the given message template and tokens and given context', () => {
            expect(() => throws('Failed to load user {{id}}', {
                name: 'Forty Two',
            }, {
                id: 42,
            })).toThrow(exception('Failed to load user {{id}}', {
                name: 'Forty Two',
            }, {
                id: 42,
            }));
        });
    });

    describe('throws(Error)', () => {
        it('throws a given error', () => {
            expect(() => throws(typeError('Error')))
                .toThrow(TypeError);
        });
    });

    describe('throws(Nullary<Error>)', () => {
        it('throws an error returned by a given callback', () => {
            expect(() => throws(() => referenceError('Error')))
                .toThrow(ReferenceError);
        });
    });
});

describe(panic, () => {
    describe('panic(String)', () => {
        const input = panic('Failure');
        const cause = error('Previous');

        describe('when `cause` is undefined', () => {
            it('throws an Exception with a message', () => {
                expect(input).toThrow(exception('Failure'));
            });
        });

        describe('when `cause` is defined', () => {
            it('throws an Exception with a message and the previous error', () => {
                expect(() => input(cause)).toThrow(causedBy(cause, 'Failure', {}, {}));
            });
        });

        describe('when `cause` is null', () => {
            it('throws an Exception with a message and the previous unknown error', () => {
                expect(() => input(null)).toThrow(causedBy(exception('Unknown error {{error}}', {
                    error: 'null',
                }), 'Failure', {}, {}));
            });
        });
    });

    describe('panic(String, ExceptionTokens)', () => {
        const input = panic('Failed to load user {{id}}', {
            id: '42',
        });

        it('throws an Exception with a tokenized message', () => {
            expect(input).toThrow('Failed to load user `42`');
        });
    });

    describe('panic(String, ExceptionTokens, ExceptionContext)', () => {
        const input = panic('Failed to load user {{id}}', {
            name: 'Forty Two',
        }, {
            id: 42,
        });

        it('throws an Exception with a tokenized message and context', () => {
            expect(input).toThrow(exception('Failed to load user {{id}}', {
                name: 'Forty Two',
            }, {
                id: 42,
            }));
        });
    });

    describe('panic(Error)', () => {
        const input = panic(typeError('Error'));

        it('throws a given error', () => {
            expect(input).toThrow(TypeError);
        });
    });

    describe('panic(Function)', () => {
        const input = panic(() => rangeError('Error'));

        it('throws an error created by a given function', () => {
            expect(input).toThrow(RangeError);
        });
    });
});

describe(rethrows, () => {
    describe('rethrows(Error, String)', () => {
        it('throws an Exception with given previous error and message', () => {
            expect(() => rethrows(rangeError('Invalid code point -1'), 'Failed to process input'))
                .toThrow('Failed to process input');
        });
    });

    describe('rethrows(Error, String, ExceptionTokens)', () => {
        it('throws an Exception with given previous error and tokenized message', () => {
            expect(() => rethrows(
                rangeError('Invalid code point -1'), 'Failed to process input {{value}}', {
                    value: '-1',
                },
            )).toThrow('Failed to process input `-1`');
        });
    });

    describe('rethrows(Error, String, ExceptionTokens, ExceptionContext)', () => {
        it('throws an Exception with given previous error, tokenized message and context', () => {
            expect(() => rethrows(
                rangeError('Invalid code point -1'), 'Failed to process input {{value}}', {
                    value: 'None',
                }, {
                    value: 0,
                },
            )).toThrow(causedBy(rangeError('Invalid code point -1'), 'Failed to process input {{value}}', {
                value: 'None',
            }, {
                value: 0,
            }));
        });
    });
});
