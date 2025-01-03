import { describe, expect, it } from '@jest/globals';

import { isNotRangeError, isRangeError, rangeError } from './range-error';

describe(rangeError, () => {
    it('creates a RangeError with a given message', () => {
        expect(rangeError('Exception'))
            .toStrictEqual(new RangeError('Exception'));
    });
});

describe(isRangeError, () => {
    describe('when a given value is an RangeError', () => {
        it('returns true', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isRangeError(new RangeError('Error')))
                .toBe(true);
        });
    });

    describe('when a given value is not an RangeError', () => {
        it('returns false', () => {
            expect(isRangeError('RangeError'))
                .toBe(false);
        });
    });
});

describe(isNotRangeError, () => {
    describe('when a given value is not an RangeError', () => {
        it('returns true', () => {
            expect(isNotRangeError('RangeError'))
                .toBe(true);
        });
    });

    describe('when a given value is an RangeError', () => {
        it('returns false', () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- type guard testing
            expect(isNotRangeError(new RangeError('Error')))
                .toBe(false);
        });
    });
});
