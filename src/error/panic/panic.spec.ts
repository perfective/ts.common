import { rangeError } from '../error/range-error';
import { referenceError } from '../error/reference-error';
import { Exception } from '../exception/exception';

import { panic, rethrow, rethrows, throws } from './panic';

describe('throws', () => {
    it('throws an Exception with a message', () => {
        expect(() => throws('Failure'))
            .toThrow('Failure');
        expect(() => throws('Failure'))
            .toThrow(Exception);
    });

    it('throws an Exception with a message and context', () => {
        expect(() => throws('Failed to load user {{id}}', {
            id: '42',
        })).toThrow('Failed to load user `42`');
    });

    it('throws a custom error', () => {
        expect(() => throws(new TypeError('Error')))
            .toThrow(TypeError);
    });

    it('throws a custom error created by the passed function', () => {
        expect(() => throws(() => new ReferenceError('Error')))
            .toThrow(ReferenceError);
    });
});

describe('panic', () => {
    it('creates a function that throws an Exception with a message', () => {
        expect(panic('Failure'))
            .toThrow('Failure');
        expect(panic('Failure'))
            .toThrow(Exception);
    });

    it('creates a function that throws an Exception with a message and context', () => {
        expect(panic('Failed to load user {{id}}', {
            id: '42',
        })).toThrow('Failed to load user `42`');
    });

    it('creates a function that throws a custom error', () => {
        expect(panic(new TypeError('Error')))
            .toThrow(TypeError);
    });

    it('creates a function that throws a custom error created by the passed function', () => {
        expect(panic(() => new RangeError('Error')))
            .toThrow(RangeError);
    });
});

describe('rethrows', () => {
    it('throws a Exception with the previous error', () => {
        expect(() => rethrows(rangeError('Invalid code point -1'), 'Failed to process input'))
            .toThrow('Failed to process input');
        expect(() => rethrows(
            rangeError('Invalid code point -1'), 'Failed to process input {{value}}', {
                value: '-1',
            },
        )).toThrow('Failed to process input `-1`');
    });
});

describe('rethrow', () => {
    describe('rethrow(message)', () => {
        it('throws a Exception with the previous error', () => {
            expect(() => rethrow('Unknown property')(
                referenceError('reference to undefined property "x"'),
            )).toThrow('Unknown property');
            expect(() => rethrow('Unknown property {{key}}', {
                key: 'x',
            })(
                referenceError('reference to undefined property "x"'),
            )).toThrow('Unknown property `x`');
        });
    });
});
