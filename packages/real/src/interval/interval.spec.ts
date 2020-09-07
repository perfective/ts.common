import {
    Interval,
    interval,
    intervalFromPair,
    isInInterval,
    isInLeftOpenInterval,
    isInOpenInterval,
    isInRightOpenInterval,
} from './interval';

const range: Interval = interval(2.71, 3.14);

describe('interval', () => {
    it('creates an Interval from two numbers', () => {
        expect(interval(2.71, 3.14))
            .toStrictEqual({
                min: 2.71,
                max: 3.14,
            } as Interval);
    });

    it('creates an Interval when the first argument is greater than the second one', () => {
        expect(interval(3.14, 2.71))
            .toStrictEqual({
                min: 2.71,
                max: 3.14,
            } as Interval);
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

    it('creates an Interval from an unsorted tuple', () => {
        expect(intervalFromPair([3.14, 2.71]))
            .toStrictEqual({
                min: 2.71,
                max: 3.14,
            } as Interval);
    });
});

describe('isInInterval', () => {
    describe('isInInterval(Interval)', () => {
        it('is false when the value is less than Interval.min', () => {
            expect(isInInterval(range)(2)).toBe(false);
        });

        it('is true when the value is equal to Interval.min', () => {
            expect(isInInterval(range)(2.71)).toBe(true);
        });

        it('is true when the value is greater than Interval.min and less than Interval.max', () => {
            expect(isInInterval(range)(3)).toBe(true);
        });

        it('is true when the value is equal to Interval.max', () => {
            expect(isInInterval(range)(3.14)).toBe(true);
        });

        it('is false when the value is greater than Interval.max', () => {
            expect(isInInterval(range)(4)).toBe(false);
        });
    });
});

describe('isInOpenInterval', () => {
    describe('isInOpenInterval(interval)', () => {
        it('is false when the value is less than Interval.min', () => {
            expect(isInOpenInterval(range)(2)).toBe(false);
        });

        it('is false when the value is equal to Interval.min', () => {
            expect(isInOpenInterval(range)(2.71)).toBe(false);
        });

        it('is true when the value is greater than Interval.min and less than Interval.max', () => {
            expect(isInOpenInterval(range)(3)).toBe(true);
        });

        it('is false when the value is equal to Interval.max', () => {
            expect(isInOpenInterval(range)(3.14)).toBe(false);
        });

        it('is false when the value is greater than Interval.max', () => {
            expect(isInOpenInterval(range)(4)).toBe(false);
        });
    });
});

describe('isInLeftOpenInterval', () => {
    describe('isInLeftOpenInterval(interval)', () => {
        it('is false when the value is less than Interval.min', () => {
            expect(isInLeftOpenInterval(range)(2)).toBe(false);
        });

        it('is false when the value is equal to Interval.min', () => {
            expect(isInLeftOpenInterval(range)(2.71)).toBe(false);
        });

        it('is true when the value is greater than Interval.min and less than Interval.max', () => {
            expect(isInLeftOpenInterval(range)(3)).toBe(true);
        });

        it('is true when the value is equal to Interval.max', () => {
            expect(isInLeftOpenInterval(range)(3.14)).toBe(true);
        });

        it('is false when the value is greater than Interval.max', () => {
            expect(isInLeftOpenInterval(range)(4)).toBe(false);
        });
    });
});

describe('isInRightOpenInterval', () => {
    describe('isInRightOpenInterval(interval)', () => {
        it('is false when the value is less than Interval.min', () => {
            expect(isInRightOpenInterval(range)(2)).toBe(false);
        });

        it('is true when the value is equal to Interval.min', () => {
            expect(isInRightOpenInterval(range)(2.71)).toBe(true);
        });

        it('is true when the value is greater than Interval.min and less than Interval.max', () => {
            expect(isInRightOpenInterval(range)(3)).toBe(true);
        });

        it('is false when the value is equal to Interval.max', () => {
            expect(isInRightOpenInterval(range)(3.14)).toBe(false);
        });

        it('is false when the value is greater than Interval.max', () => {
            expect(isInRightOpenInterval(range)(4)).toBe(false);
        });
    });
});
