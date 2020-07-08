import { isNotTypeError, isTypeError, typeError } from './type-error';

describe('typeError', () => {
    it('creates a new TypeError with a message', () => {
        expect(typeError('Exception'))
            .toStrictEqual(new TypeError('Exception'));
    });
});

describe('isTypeError', () => {
    it('returns true when value is an TypeError', () => {
        expect(isTypeError(new TypeError()))
            .toBe(true);
    });

    it('returns false when value is not an TypeError', () => {
        expect(isTypeError('TypeError'))
            .toBe(false);
    });
});

describe('isNotTypeError', () => {
    it('returns false when value is an TypeError', () => {
        expect(isNotTypeError(new TypeError()))
            .toBe(false);
    });

    it('returns true when value is not an TypeError', () => {
        expect(isNotTypeError('TypeError'))
            .toBe(true);
    });
});
