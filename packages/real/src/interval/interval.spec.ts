import {
    Interval,
    interval,
    intervalFromPair,
    isInInterval,
    isInLeftOpenInterval,
    isInOpenInterval,
    isInRightOpenInterval,
    range,
} from './interval';

const segment: Interval = {
    min: 2.71,
    max: 3.14,
};

describe('interval', () => {
    it('returns an Interval when the first argument is less or equal to the second one', () => {
        expect(interval(2.71, 3.14))
            .toStrictEqual({
                min: 2.71,
                max: 3.14,
            } as Interval);
    });

    it('returns null when the first argument is greater than the second one', () => {
        expect(interval(3.14, 2.71))
            .toBeNull();
    });
});

describe('intervalFromPair', () => {
    it('creates an Interval from a sorted tuple', () => {
        expect(intervalFromPair([2.71, 3.14]))
            .toStrictEqual({
                min: 2.71,
                max: 3.14,
            } as Interval);
    });

    it('returns null for an unsorted tuple', () => {
        expect(intervalFromPair([3.14, 2.71]))
            .toBeNull();
    });
    });
});

describe('isInInterval', () => {
    describe('isInInterval(Interval)', () => {
        it('is false when the value is less than Interval.min', () => {
            expect(isInInterval(segment)(2)).toBe(false);
        });

        it('is true when the value is equal to Interval.min', () => {
            expect(isInInterval(segment)(2.71)).toBe(true);
        });

        it('is true when the value is greater than Interval.min and less than Interval.max', () => {
            expect(isInInterval(segment)(3)).toBe(true);
        });

        it('is true when the value is equal to Interval.max', () => {
            expect(isInInterval(segment)(3.14)).toBe(true);
        });

        it('is false when the value is greater than Interval.max', () => {
            expect(isInInterval(segment)(4)).toBe(false);
        });
    });
});

describe('isInOpenInterval', () => {
    describe('isInOpenInterval(interval)', () => {
        it('is false when the value is less than Interval.min', () => {
            expect(isInOpenInterval(segment)(2)).toBe(false);
        });

        it('is false when the value is equal to Interval.min', () => {
            expect(isInOpenInterval(segment)(2.71)).toBe(false);
        });

        it('is true when the value is greater than Interval.min and less than Interval.max', () => {
            expect(isInOpenInterval(segment)(3)).toBe(true);
        });

        it('is false when the value is equal to Interval.max', () => {
            expect(isInOpenInterval(segment)(3.14)).toBe(false);
        });

        it('is false when the value is greater than Interval.max', () => {
            expect(isInOpenInterval(segment)(4)).toBe(false);
        });
    });
});

describe('isInLeftOpenInterval', () => {
    describe('isInLeftOpenInterval(interval)', () => {
        it('is false when the value is less than Interval.min', () => {
            expect(isInLeftOpenInterval(segment)(2)).toBe(false);
        });

        it('is false when the value is equal to Interval.min', () => {
            expect(isInLeftOpenInterval(segment)(2.71)).toBe(false);
        });

        it('is true when the value is greater than Interval.min and less than Interval.max', () => {
            expect(isInLeftOpenInterval(segment)(3)).toBe(true);
        });

        it('is true when the value is equal to Interval.max', () => {
            expect(isInLeftOpenInterval(segment)(3.14)).toBe(true);
        });

        it('is false when the value is greater than Interval.max', () => {
            expect(isInLeftOpenInterval(segment)(4)).toBe(false);
        });
    });
});

describe('isInRightOpenInterval', () => {
    describe('isInRightOpenInterval(interval)', () => {
        it('is false when the value is less than Interval.min', () => {
            expect(isInRightOpenInterval(segment)(2)).toBe(false);
        });

        it('is true when the value is equal to Interval.min', () => {
            expect(isInRightOpenInterval(segment)(2.71)).toBe(true);
        });

        it('is true when the value is greater than Interval.min and less than Interval.max', () => {
            expect(isInRightOpenInterval(segment)(3)).toBe(true);
        });

        it('is false when the value is equal to Interval.max', () => {
            expect(isInRightOpenInterval(segment)(3.14)).toBe(false);
        });

        it('is false when the value is greater than Interval.max', () => {
            expect(isInRightOpenInterval(segment)(4)).toBe(false);
        });
    });
});

describe('range', () => {
    it('returns an interval with minimum and maximum elements in a non-empty array', () => {
        expect(range([0]))
            .toStrictEqual(interval(0, 0));
        expect(range([-1, 0, 1, 3, 5, 7, 11]))
            .toStrictEqual(interval(-1, 11));
    });

    it('returns undefined for an empty array', () => {
        expect(range([]))
            .toBeUndefined();
    });
});
