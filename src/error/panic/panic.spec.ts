import { rangeError } from '../error/range-error';
import { referenceError } from '../error/reference-error';
import { typeError } from '../error/type-error';
import { causedBy, exception } from '../exception/exception';

import { panic, rethrow, rethrows, throws } from './panic';

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
        it('creates a function that throws an Exception with a message', () => {
            expect(panic('Failure')).toThrow(exception('Failure'));
        });
    });

    describe('panic(String, ExceptionTokens)', () => {
        it('creates a function that throws an Exception with a tokenized message', () => {
            expect(panic('Failed to load user {{id}}', {
                id: '42',
            })).toThrow('Failed to load user `42`');
        });
    });

    describe('panic(String, ExceptionTokens, ExceptionContext)', () => {
        it('creates a function that throws an Exception with a tokenized message and context', () => {
            expect(panic('Failed to load user {{id}}', {
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

    describe('panic(Error)', () => {
        it('creates a function that throws a given error', () => {
            expect(panic(typeError('Error')))
                .toThrow(TypeError);
        });
    });

    describe('panic(Function)', () => {
        it('creates a function that throws an error created by a given function', () => {
            expect(panic(() => rangeError('Error')))
                .toThrow(RangeError);
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

describe(rethrow, () => {
    const previous: ReferenceError = referenceError('reference to undefined property "x"');

    describe('rethrow(String)', () => {
        it('throws an Exception with the previous error', () => {
            expect(() => rethrow('Unknown property')(previous))
                .toThrow(causedBy(previous, 'Unknown property'));
        });
    });

    describe('rethrow(String, ExceptionTokens)', () => {
        it('throws an Exception with a tokenized message', () => {
            expect(() => rethrow('Unknown property {{key}}', {
                key: 'x',
            })(previous))
                .toThrow(causedBy(previous, 'Unknown property `x`', {
                    key: 'x',
                }));
        });
    });

    describe('rethrow(String, ExceptionTokens, ExceptionContext)', () => {
        it('throws an Exception with a tokenized message and additional context', () => {
            expect(() => rethrow('Unknown property {{key}}', {
                key: 'x',
            }, {
                value: 0,
            })(previous))
                .toThrow(causedBy(previous, 'Unknown property `x`', {
                    key: 'x',
                }, {
                    value: 0,
                }));
        });
    });
});
