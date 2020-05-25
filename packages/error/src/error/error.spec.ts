import { error, isError, isNotError } from './error';

describe('error', () => {
    it('creates a new Error with a message', () => {
        expect(error('Exception'))
            .toStrictEqual(new Error('Exception'));
    });

    it('creates a new Error without a message', () => {
        expect(error())
            .toStrictEqual(new Error());
    });
});

describe('isError', () => {
    it('returns true when value is an Error', () => {
        expect(isError(new Error()))
            .toBe(true);
    });

    it('returns false when value is not an Error', () => {
        expect(isError('Error'))
            .toBe(false);
    });
});

describe('isNotError', () => {
    it('returns false when value is an Error', () => {
        expect(isNotError(new Error()))
            .toBe(false);
    });

    it('returns true when value is not an Error', () => {
        expect(isNotError('Error'))
            .toBe(true);
    });
});
