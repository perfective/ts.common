import { includedIn, isEmpty, isNotEmpty } from './predicate';

describe('isEmpty', () => {
    it('returns true when an array is empty', () => {
        expect(isEmpty([]))
            .toBe(true);
    });

    it('returns false when an array is not empty', () => {
        expect(isEmpty([0]))
            .toBe(false);
    });
});

describe('isNotEmpty', () => {
    it('returns true when an array is not empty', () => {
        expect(isNotEmpty([false]))
            .toBe(true);
    });

    it('returns false when an array is empty', () => {
        expect(isNotEmpty([]))
            .toBe(false);
    });
});

describe('includedIn', () => {
    it('creates a predicate that is true when a value is in the given array', () => {
        expect(includedIn([2.71, 3.14])(3.14)).toBe(true);
        expect(includedIn([1.41, 1.73, 2.23], 1)(1.73)).toBe(true);
    });

    it('creates a predicate that is false when a value is not in the given array', () => {
        expect(includedIn([2.71, 3.14])(1.41)).toBe(false);
        expect(includedIn([1.41, 1.73, 2.23], 2)(1.73)).toBe(false);
    });
});
