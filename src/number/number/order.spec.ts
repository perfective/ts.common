import {
    ascending,
    descending,
    isEqualTo,
    isGreaterThan,
    isGreaterThanOrEqualTo,
    isLessThan,
    isLessThanOrEqualTo,
    isNotEqualTo,
} from './order';

describe('isEqualTo', () => {
    describe('isEqualTo(Number)', () => {
        it('is true when a value is equal to the Number', () => {
            /* eslint-disable jest/max-expects -- checking constants */
            expect(isEqualTo(0)(0)).toBe(true);
            expect(isEqualTo(Number.POSITIVE_INFINITY)(Number.POSITIVE_INFINITY)).toBe(true);
            expect(isEqualTo(Number.MAX_VALUE)(Number.MAX_VALUE)).toBe(true);
            expect(isEqualTo(Number.MIN_VALUE)(Number.MIN_VALUE)).toBe(true);
            expect(isEqualTo(Number.NEGATIVE_INFINITY)(Number.NEGATIVE_INFINITY)).toBe(true);
            expect(isEqualTo(Number.MAX_SAFE_INTEGER)(Number.MAX_SAFE_INTEGER)).toBe(true);
            expect(isEqualTo(Number.MIN_SAFE_INTEGER)(Number.MIN_SAFE_INTEGER)).toBe(true);
            expect(isEqualTo(Number.EPSILON)(Number.EPSILON)).toBe(true);
            /* eslint-enable jest/max-expects */
        });

        it('is false when the value is not equal to the Number', () => {
            expect(isEqualTo(3.14)(2.71)).toBe(false);
            expect(isEqualTo(Number.MIN_VALUE)(Number.MAX_VALUE)).toBe(false);
            expect(isEqualTo(Number.NaN)(Number.NaN)).toBe(false);
        });
    });
});

describe('isNotEqualTo', () => {
    describe('isNotEqualTo(Number)', () => {
        it('is true when the value is not equal to the Number', () => {
            expect(isNotEqualTo(3.14)(2.71)).toBe(true);
            expect(isNotEqualTo(Number.NaN)(Number.NaN)).toBe(true);
        });

        it('is false when the value is equal to the Number', () => {
            expect(isNotEqualTo(0)(0)).toBe(false);
        });
    });
});

describe('isGreaterThan', () => {
    describe('isGreaterThan(Number)', () => {
        it('is true when the value is greater than the Number', () => {
            expect(isGreaterThan(2.71)(3.14)).toBe(true);
        });

        it('is false when the value is equal to the Number', () => {
            expect(isGreaterThan(2.71)(2.71)).toBe(false);
        });

        it('is false when the value is less than the Number', () => {
            expect(isGreaterThan(3.14)(2.71)).toBe(false);
        });
    });
});

describe('isGreaterThanOrEqualTo', () => {
    describe('isGreaterThanOrEqualTo(Number)', () => {
        it('is true when the value is greater than the Number', () => {
            expect(isGreaterThanOrEqualTo(2.71)(3.14)).toBe(true);
        });

        it('is true when the value is equal to the Number', () => {
            expect(isGreaterThanOrEqualTo(2.71)(2.71)).toBe(true);
        });

        it('is false when the value is less than the Number', () => {
            expect(isGreaterThanOrEqualTo(3.14)(2.71)).toBe(false);
        });
    });
});

describe('isLessThan', () => {
    describe('isLessThan(Number)', () => {
        it('is false when the value is greater than the Number', () => {
            expect(isLessThan(2.71)(3.14)).toBe(false);
        });

        it('is false when the value is equal to the Number', () => {
            expect(isLessThan(2.71)(2.71)).toBe(false);
        });

        it('is true when the value is less than the Number', () => {
            expect(isLessThan(3.14)(2.71)).toBe(true);
        });
    });
});

describe('isLessThanOrEqualTo', () => {
    describe('isLessThanOrEqualTo(Number)', () => {
        it('is false when the value is greater than the Number', () => {
            expect(isLessThanOrEqualTo(2.71)(3.14)).toBe(false);
        });

        it('is true when the value is equal to the Number', () => {
            expect(isLessThanOrEqualTo(2.71)(2.71)).toBe(true);
        });

        it('is true when the value is less than the Number', () => {
            expect(isLessThanOrEqualTo(3.14)(2.71)).toBe(true);
        });
    });
});

describe('ascending', () => {
    it('sorts real numbers in ascending order', () => {
        expect([2, 3, 0, -2].sort(ascending))
            .toStrictEqual([-2, 0, 2, 3]);
        expect([-2, 0, 2, 0].sort(ascending))
            .toStrictEqual([-2, 0, 0, 2]);
    });
});

describe('descending', () => {
    it('sorts real numbers in descending order', () => {
        expect([2, 3, 0, -2].sort(descending))
            .toStrictEqual([3, 2, 0, -2]);
        expect([-2, 0, 2, 0].sort(descending))
            .toStrictEqual([2, 0, 0, -2]);
    });
});
