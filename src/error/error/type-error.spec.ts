import { describe, expect, it } from '@jest/globals';

import { isNotTypeError, isTypeError, typeError } from './type-error';

describe(typeError, () => {
    it('creates a TypeError with a given message', () => {
        // eslint-disable-next-line jest/no-error-equal -- testing error constructor
        expect(typeError('Exception'))
            .toStrictEqual(new TypeError('Exception'));
    });
});

describe(isTypeError, () => {
    describe('when a given value is an TypeError', () => {
        it('returns true', () => {
            expect(isTypeError(new TypeError('Error')))
                .toBe(true);
        });
    });

    describe('when a given value is not an TypeError', () => {
        it('returns false', () => {
            expect(isTypeError('TypeError'))
                .toBe(false);
        });
    });
});

describe(isNotTypeError, () => {
    describe('when a given value is not an TypeError', () => {
        it('returns true', () => {
            expect(isNotTypeError('TypeError'))
                .toBe(true);
        });
    });

    describe('when a given value is an TypeError', () => {
        it('returns false', () => {
            expect(isNotTypeError(new TypeError('Error')))
                .toBe(false);
        });
    });
});
