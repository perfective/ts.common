import {
    Interval,
    interval,
    intervalFromPair,
    isInInterval,
    isInOpenInterval,
    isInOpenMaxInterval,
    isInOpenMinInterval,
} from './interval';

const range = interval(2.71, 3.14);

describe('interval', () => {
    it('creates an Interval from two numbers', () => {
        expect(interval(2.71, 3.14))
            .toStrictEqual({
                min: 2.71,
                max: 3.14,
            } as Interval);
    });

    it('creates an Interval when the first argument is greater than the second', () => {
        expect(interval(3.14, 2.71))
            .toStrictEqual({
                min: 2.71,
                max: 3.14,
            } as Interval);
    });
});

describe('intervalFromPair', () => {
    it('creates an Interval from a tuple', () => {
        expect(intervalFromPair([2.71, 3.14]))
            .toStrictEqual({
                min: 2.71,
                max: 3.14,
            } as Interval);
    });

    it('creates an Interval from a tuple when the first element is great than the second', () => {
        expect(intervalFromPair([3.14, 2.71]))
            .toStrictEqual({
                min: 2.71,
                max: 3.14,
            } as Interval);
    });
});

describe('isInInterval', () => {
    it('creates a predicate that is false when variable is less than the "from" value', () => {
        expect(isInInterval(range)(2)).toBe(false);
    });

    it('creates a predicate that is true when variable is equal to the "from" value', () => {
        expect(isInInterval(range)(2.71)).toBe(true);
    });

    it(
        'creates a predicate that is true when variable is greater than "from" and less than "to"',
        () => {
            expect(isInInterval(range)(3)).toBe(true);
        },
    );

    it('creates a predicate that is true when variable is equal to the "to" value', () => {
        expect(isInInterval(range)(3.14)).toBe(true);
    });

    it('creates a predicate that is false when variable is greater than the "to" value', () => {
        expect(isInInterval(range)(4)).toBe(false);
    });
});

describe('isInOpenInterval', () => {
    it('creates a predicate that is false when variable is less than the "from" value', () => {
        expect(isInOpenInterval(range)(2)).toBe(false);
    });

    it('creates a predicate that is false when variable is equal to the "from" value', () => {
        expect(isInOpenInterval(range)(2.71)).toBe(false);
    });

    it(
        'creates a predicate that is true when variable is greater than "from" and less than "to"',
        () => {
            expect(isInOpenInterval(range)(3)).toBe(true);
        },
    );

    it('creates a predicate that is false when variable is equal to the "to" value', () => {
        expect(isInOpenInterval(range)(3.14)).toBe(false);
    });

    it('creates a predicate that is false when variable is greater than the "to" value', () => {
        expect(isInOpenInterval(range)(4)).toBe(false);
    });
});

describe('isInOpenMinInterval', () => {
    it('creates a predicate that is false when variable is less than the "from" value', () => {
        expect(isInOpenMinInterval(range)(2)).toBe(false);
    });

    it('creates a predicate that is false when variable is equal to the "from" value', () => {
        expect(isInOpenMinInterval(range)(2.71)).toBe(false);
    });

    it(
        'creates a predicate that is true when variable is greater than "from" and less than "to"',
        () => {
            expect(isInOpenMinInterval(range)(3)).toBe(true);
        },
    );

    it('creates a predicate that is true when variable is equal to the "to" value', () => {
        expect(isInOpenMinInterval(range)(3.14)).toBe(true);
    });

    it('creates a predicate that is false when variable is greater than the "to" value', () => {
        expect(isInOpenMinInterval(range)(4)).toBe(false);
    });
});

describe('isInOpenMaxInterval', () => {
    it('creates a predicate that is false when variable is less than the "from" value', () => {
        expect(isInOpenMaxInterval(range)(2)).toBe(false);
    });

    it('creates a predicate that is true when variable is equal to the "from" value', () => {
        expect(isInOpenMaxInterval(range)(2.71)).toBe(true);
    });

    it(
        'creates a predicate that is true when variable is greater than "from" and less than "to"',
        () => {
            expect(isInOpenMaxInterval(range)(3)).toBe(true);
        },
    );

    it('creates a predicate that is false when variable is equal to the "to" value', () => {
        expect(isInOpenMaxInterval(range)(3.14)).toBe(false);
    });

    it('creates a predicate that is false when variable is greater than the "to" value', () => {
        expect(isInOpenMaxInterval(range)(4)).toBe(false);
    });
});
