import { describe, expect, it } from '@jest/globals';

import {
    Interval,
    interval,
    intervalFromNullable,
    intervalFromPair,
    intervalFromValues,
    isInInterval,
    isInLeftOpenInterval,
    isInOpenInterval,
    isInRightOpenInterval,
} from './interval';

const segment: Interval = {
    min: 2.71,
    max: 3.14,
};

describe(interval, () => {
    describe('when the first argument is less or equal to the second argument', () => {
        it('returns an Interval', () => {
            expect(interval(2.71, 3.14))
                .toStrictEqual({
                    min: 2.71,
                    max: 3.14,
                } as Interval);
        });
    });

    describe('when the first argument is greater than the second argument', () => {
        it('returns null', () => {
            expect(interval(3.14, 2.71))
                .toBeNull();
        });
    });
});

describe(intervalFromPair, () => {
    describe('when the first element of the pair is less than or equal to the second element', () => {
        it('creates an Interval', () => {
            expect(intervalFromPair([2.71, 3.14]))
                .toStrictEqual({
                    min: 2.71,
                    max: 3.14,
                } as Interval);
        });
    });

    describe('when the first element of the pair is greater than the second element', () => {
        it('returns null', () => {
            expect(intervalFromPair([3.14, 2.71]))
                .toBeNull();
        });
    });
});

describe(intervalFromValues, () => {
    describe('when given a non-empty array', () => {
        it('returns an interval with minimum and maximum elements', () => {
            expect(intervalFromValues([0]))
                .toStrictEqual(interval(0, 0));
            expect(intervalFromValues([-1, 0, 1, 3, 5, 7, 11]))
                .toStrictEqual(interval(-1, 11));
        });
    });

    describe('when given an array with only NaN values', () => {
        it('returns null', () => {
            expect(intervalFromValues([Number.NaN]))
                .toBeNull();
        });
    });

    describe('when given an empty array', () => {
        it('returns null', () => {
            expect(intervalFromValues([]))
                .toBeNull();
        });
    });
});

describe(intervalFromNullable, () => {
    describe('intervalFromNullable(null, number)', () => {
        it('returns left-unbounded interval with min of negative infinity', () => {
            expect(intervalFromNullable(null, 0))
                .toStrictEqual(interval(Number.NEGATIVE_INFINITY, 0));
        });
    });

    describe('intervalFromNullable(NaN, number)', () => {
        it('returns left-unbounded interval with min of negative infinity', () => {
            expect(intervalFromNullable(Number.NaN, 0))
                .toStrictEqual(interval(Number.NEGATIVE_INFINITY, 0));
        });
    });

    describe('intervalFromNullable(number, null)', () => {
        it('returns right-unbounded interval with max of positive infinity', () => {
            expect(intervalFromNullable(0, null))
                .toStrictEqual(interval(0, Number.POSITIVE_INFINITY));
        });
    });

    describe('intervalFromNullable(number, NaN)', () => {
        it('returns a right-unbounded interval with max of positive infinity', () => {
            expect(intervalFromNullable(0, Number.NaN))
                .toStrictEqual(interval(0, Number.POSITIVE_INFINITY));
        });
    });

    describe('intervalFromNullable(null, null)', () => {
        it('returns unbounded interval when min of negative infinity and max of positive infinity', () => {
            expect(intervalFromNullable(null, null))
                .toStrictEqual(interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY));
        });
    });

    describe('intervalFromNullable(NaN, NaN)', () => {
        it('returns unbounded interval when min of negative infinity and max of positive infinity', () => {
            expect(intervalFromNullable(Number.NaN, Number.NaN))
                .toStrictEqual(interval(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY));
        });
    });

    describe('intervalFromNullable(number, number)', () => {
        describe('when min is greater than max', () => {
            it('returns null', () => {
                expect(intervalFromNullable(3.14, 2.71))
                    .toBeNull();
            });
        });

        describe('min is less or equal to max', () => {
            it('returns a bounded interval', () => {
                expect(intervalFromNullable(2.71, 3.14))
                    .toStrictEqual(interval(2.71, 3.14));
            });
        });
    });
});

describe(isInInterval, () => {
    describe('isInInterval(Interval)', () => {
        describe('when the input is less than Interval.min', () => {
            it(`returns false`, () => {
                expect(isInInterval(segment)(2)).toBe(false);
            });
        });

        describe('when the input is equal to Interval.min', () => {
            it(`returns true`, () => {
                expect(isInInterval(segment)(2.71)).toBe(true);
            });
        });

        describe('when the input is greater than Interval.min and less than Interval.max', () => {
            it(`returns true`, () => {
                expect(isInInterval(segment)(3)).toBe(true);
            });
        });

        describe('when the value is equal to Interval.max', () => {
            it(`returns true`, () => {
                expect(isInInterval(segment)(3.14)).toBe(true);
            });
        });

        describe('when the value is greater than Interval.max', () => {
            it(`returns false`, () => {
                expect(isInInterval(segment)(4)).toBe(false);
            });
        });
    });
});

describe(isInOpenInterval, () => {
    describe('isInOpenInterval(interval)', () => {
        describe('when the value is less than Interval.min', () => {
            it(`returns false`, () => {
                expect(isInOpenInterval(segment)(2)).toBe(false);
            });
        });

        describe('when the value is equal to Interval.min', () => {
            it(`returns false`, () => {
                expect(isInOpenInterval(segment)(2.71)).toBe(false);
            });
        });

        describe('when the value is greater than Interval.min and less than Interval.max', () => {
            it(`returns true`, () => {
                expect(isInOpenInterval(segment)(3)).toBe(true);
            });
        });

        describe('when the value is equal to Interval.max', () => {
            it(`returns false`, () => {
                expect(isInOpenInterval(segment)(3.14)).toBe(false);
            });
        });

        describe('when the value is greater than Interval.max', () => {
            it(`returns false`, () => {
                expect(isInOpenInterval(segment)(4)).toBe(false);
            });
        });
    });
});

describe(isInLeftOpenInterval, () => {
    describe('isInLeftOpenInterval(interval)', () => {
        describe('when the value is less than Interval.min', () => {
            it(`returns false`, () => {
                expect(isInLeftOpenInterval(segment)(2)).toBe(false);
            });
        });

        describe('when the value is equal to Interval.min', () => {
            it(`returns false`, () => {
                expect(isInLeftOpenInterval(segment)(2.71)).toBe(false);
            });
        });

        describe('when the value is greater than Interval.min and less than Interval.max', () => {
            it(`returns true`, () => {
                expect(isInLeftOpenInterval(segment)(3)).toBe(true);
            });
        });

        describe('when the value is equal to Interval.max', () => {
            it(`returns true`, () => {
                expect(isInLeftOpenInterval(segment)(3.14)).toBe(true);
            });
        });

        describe('when the value is greater than Interval.max', () => {
            it(`returns false`, () => {
                expect(isInLeftOpenInterval(segment)(4)).toBe(false);
            });
        });
    });
});

describe(isInRightOpenInterval, () => {
    describe('isInRightOpenInterval(interval)', () => {
        describe('when the value is less than Interval.min', () => {
            it(`returns false`, () => {
                expect(isInRightOpenInterval(segment)(2)).toBe(false);
            });
        });

        describe('when the value is equal to Interval.min', () => {
            it(`returns true`, () => {
                expect(isInRightOpenInterval(segment)(2.71)).toBe(true);
            });
        });

        describe('when the value is greater than Interval.min and less than Interval.max', () => {
            it(`returns true`, () => {
                expect(isInRightOpenInterval(segment)(3)).toBe(true);
            });
        });

        describe('when the value is equal to Interval.max', () => {
            it(`returns false`, () => {
                expect(isInRightOpenInterval(segment)(3.14)).toBe(false);
            });
        });

        describe('when the value is greater than Interval.max', () => {
            it(`returns false`, () => {
                expect(isInRightOpenInterval(segment)(4)).toBe(false);
            });
        });
    });
});
