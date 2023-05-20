import { isNotReferenceError, isReferenceError, referenceError } from './reference-error';

describe(referenceError, () => {
    it('creates a ReferenceError with a given message', () => {
        expect(referenceError('Exception'))
            .toStrictEqual(new ReferenceError('Exception'));
    });
});

describe(isReferenceError, () => {
    describe('when a given value is an ReferenceError', () => {
        it('returns true', () => {
            expect(isReferenceError(new ReferenceError('Error')))
                .toBe(true);
        });
    });

    describe('when a given value is not an ReferenceError', () => {
        it('returns false', () => {
            expect(isReferenceError('ReferenceError'))
                .toBe(false);
        });
    });
});

describe(isNotReferenceError, () => {
    describe('when a given value is not an ReferenceError', () => {
        it('returns true', () => {
            expect(isNotReferenceError('ReferenceError'))
                .toBe(true);
        });
    });

    describe('when a given value is an ReferenceError', () => {
        it('returns false', () => {
            expect(isNotReferenceError(new ReferenceError('Error')))
                .toBe(false);
        });
    });
});
