import { describe, expect, it } from '@jest/globals';

import { includedIn, isEmpty, isNotEmpty } from './predicate';

describe(isEmpty, () => {
    describe('when given an empty array', () => {
        it('returns true', () => {
            expect(isEmpty([]))
                .toBe(true);
        });
    });

    describe('when given a non-empty array', () => {
        it('returns false', () => {
            expect(isEmpty([0]))
                .toBe(false);
        });
    });
});

describe(isNotEmpty, () => {
    describe('when given a non-empty array', () => {
        it('returns true', () => {
            expect(isNotEmpty([false]))
                .toBe(true);
        });
    });

    describe('when given an empty array', () => {
        it('returns false', () => {
            expect(isNotEmpty([]))
                .toBe(false);
        });
    });
});

describe(includedIn, () => {
    describe('includedIn(array)', () => {
        describe('when the input value is present in a given array', () => {
            it('returns true', () => {
                expect(includedIn([2.71, 3.14])(3.14)).toBe(true);
                expect(includedIn([1.41, 1.73, 2.23], 1)(1.73)).toBe(true);
            });
        });

        describe('when the input value is absent in a given array', () => {
            it('returns false', () => {
                expect(includedIn([2.71, 3.14])(1.41)).toBe(false);
                expect(includedIn([1.41, 1.73, 2.23], 2)(1.73)).toBe(false);
            });
        });
    });
});
