import { describe, expect, it } from '@jest/globals';

import { isNotSyntaxError, isSyntaxError, syntaxError } from './syntax-error';

describe(syntaxError, () => {
    it('creates a SyntaxError with a given message', () => {
        // eslint-disable-next-line jest/no-error-equal -- testing error constructor
        expect(syntaxError('Exception'))
            .toStrictEqual(new SyntaxError('Exception'));
    });
});

describe(isSyntaxError, () => {
    describe('when a given value is an SyntaxError', () => {
        it('returns true', () => {
            expect(isSyntaxError(new SyntaxError('Error')))
                .toBe(true);
        });
    });

    describe('when a given value is not an SyntaxError', () => {
        it('returns false', () => {
            expect(isSyntaxError('SyntaxError'))
                .toBe(false);
        });
    });
});

describe(isNotSyntaxError, () => {
    describe('when a given value is not an SyntaxError', () => {
        it('returns true', () => {
            expect(isNotSyntaxError('SyntaxError'))
                .toBe(true);
        });
    });

    describe('when a given value is an SyntaxError', () => {
        it('returns false', () => {
            expect(isNotSyntaxError(new SyntaxError('Error')))
                .toBe(false);
        });
    });
});
