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

describe(isEqualTo, () => {
    describe('isEqualTo(number)', () => {
        describe('when a given value is equal to the input', () => {
            it('returns true', () => {
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
        });

        describe('when a given value is not equal to the Number', () => {
            it('returns false', () => {
                expect(isEqualTo(3.14)(2.71)).toBe(false);
                expect(isEqualTo(Number.MIN_VALUE)(Number.MAX_VALUE)).toBe(false);
                expect(isEqualTo(Number.NaN)(Number.NaN)).toBe(false);
            });
        });
    });
});

describe(isNotEqualTo, () => {
    describe('isNotEqualTo(number)', () => {
        describe('when a given value is not equal to the input', () => {
            it(`returns true`, () => {
                expect(isNotEqualTo(3.14)(2.71)).toBe(true);
                expect(isNotEqualTo(Number.NaN)(Number.NaN)).toBe(true);
            });
        });

        describe('when a given value is equal to the input', () => {
            it(`returns false`, () => {
                expect(isNotEqualTo(0)(0)).toBe(false);
            });
        });
    });
});

describe(isGreaterThan, () => {
    describe('isGreaterThan(number)', () => {
        describe('when the input is greater than a given value', () => {
            it(`returns true`, () => {
                expect(isGreaterThan(2.71)(3.14)).toBe(true);
            });
        });

        describe('when the input is equal to a given value', () => {
            it(`returns false`, () => {
                expect(isGreaterThan(2.71)(2.71)).toBe(false);
            });
        });

        describe('when the input is less than than a given value', () => {
            it(`returns false`, () => {
                expect(isGreaterThan(3.14)(2.71)).toBe(false);
            });
        });
    });
});

describe(isGreaterThanOrEqualTo, () => {
    describe('isGreaterThanOrEqualTo(number)', () => {
        describe('when the input is greater than a given value', () => {
            it(`returns true`, () => {
                expect(isGreaterThanOrEqualTo(2.71)(3.14)).toBe(true);
            });
        });

        describe('when the input is equal to a given value', () => {
            it(`returns true`, () => {
                expect(isGreaterThanOrEqualTo(2.71)(2.71)).toBe(true);
            });
        });

        describe('when the input is less than a given value', () => {
            it(`returns false`, () => {
                expect(isGreaterThanOrEqualTo(3.14)(2.71)).toBe(false);
            });
        });
    });
});

describe(isLessThan, () => {
    describe('isLessThan(number)', () => {
        describe('when the input is greater than a given value', () => {
            it(`returns false`, () => {
                expect(isLessThan(2.71)(3.14)).toBe(false);
            });
        });

        describe('when the input is equal to a given value', () => {
            it(`returns false`, () => {
                expect(isLessThan(2.71)(2.71)).toBe(false);
            });
        });

        describe('when the input is less than a given value', () => {
            it(`returns true`, () => {
                expect(isLessThan(3.14)(2.71)).toBe(true);
            });
        });
    });
});

describe(isLessThanOrEqualTo, () => {
    describe('isLessThanOrEqualTo(number)', () => {
        describe('when the input is greater than a given value', () => {
            it(`returns false`, () => {
                expect(isLessThanOrEqualTo(2.71)(3.14)).toBe(false);
            });
        });

        describe('when the input is equal to a given value', () => {
            it(`returns true`, () => {
                expect(isLessThanOrEqualTo(2.71)(2.71)).toBe(true);
            });
        });

        describe('when the input is less than a given value', () => {
            it(`returns true`, () => {
                expect(isLessThanOrEqualTo(3.14)(2.71)).toBe(true);
            });
        });
    });
});

describe(ascending, () => {
    it('sorts real numbers in ascending order', () => {
        expect([2, 3, 0, -2].sort(ascending))
            .toStrictEqual([-2, 0, 2, 3]);
        expect([-2, 0, 2, 0].sort(ascending))
            .toStrictEqual([-2, 0, 0, 2]);
    });
});

describe(descending, () => {
    it('sorts real numbers in descending order', () => {
        expect([2, 3, 0, -2].sort(descending))
            .toStrictEqual([3, 2, 0, -2]);
        expect([-2, 0, 2, 0].sort(descending))
            .toStrictEqual([2, 0, 0, -2]);
    });
});
