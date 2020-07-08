import { isNotReferenceError, isReferenceError, referenceError } from './reference-error';

describe('referenceError', () => {
    it('creates a new ReferenceError with a message', () => {
        expect(referenceError('Exception'))
            .toStrictEqual(new ReferenceError('Exception'));
    });
});

describe('isReferenceError', () => {
    it('returns true when value is an ReferenceError', () => {
        expect(isReferenceError(new ReferenceError()))
            .toBe(true);
    });

    it('returns false when value is not an ReferenceError', () => {
        expect(isReferenceError('ReferenceError'))
            .toBe(false);
    });
});

describe('isNotReferenceError', () => {
    it('returns false when value is an ReferenceError', () => {
        expect(isNotReferenceError(new ReferenceError()))
            .toBe(false);
    });

    it('returns true when value is not an ReferenceError', () => {
        expect(isNotReferenceError('ReferenceError'))
            .toBe(true);
    });
});
