import { isNotSyntaxError, isSyntaxError, syntaxError } from './syntax-error';

describe('syntaxError', () => {
    it('creates a new SyntaxError with a message', () => {
        expect(syntaxError('Exception'))
            .toStrictEqual(new SyntaxError('Exception'));
    });
});

describe('isSyntaxError', () => {
    it('returns true when value is an SyntaxError', () => {
        expect(isSyntaxError(new SyntaxError()))
            .toBe(true);
    });

    it('returns false when value is not an SyntaxError', () => {
        expect(isSyntaxError('SyntaxError'))
            .toBe(false);
    });
});

describe('isNotSyntaxError', () => {
    it('returns false when value is an SyntaxError', () => {
        expect(isNotSyntaxError(new SyntaxError()))
            .toBe(false);
    });

    it('returns true when value is not an SyntaxError', () => {
        expect(isNotSyntaxError('SyntaxError'))
            .toBe(true);
    });
});
