import { isGreaterThan, isLessThan } from '../../number/number/order';

import { all, atLeast, atMost, either, exactly, is, isNot, neither, not, Predicate } from './predicate';

describe(is, () => {
    describe('is(T)', () => {
        const isZero: Predicate<number> = is(0);

        describe('when value is the same', () => {
            it('returns true', () => {
                expect(isZero(0)).toBe(true);
            });
        });

        describe('when value is not the same', () => {
            it('returns false', () => {
                expect(isZero(3.14)).toBe(false);
            });
        });
    });
});

describe(isNot, () => {
    describe('isNot(T)', () => {
        const isNotZero: Predicate<number> = isNot(0);

        describe('when value is the same', () => {
            it('returns false', () => {
                expect(isNotZero(0)).toBe(false);
            });
        });

        describe('when value is not the same', () => {
            it('returns true', () => {
                expect(isNotZero(1)).toBe(true);
            });
        });
    });
});

describe(not, () => {
    describe('not(Predicate)', () => {
        const isZero: Predicate<number> = is(0);
        const notIsZero: Predicate<number> = not(isZero);

        describe('when the input predicate is false', () => {
            it('returns true', () => {
                expect(isZero(2.71)).toBe(false);
                expect(notIsZero(2.71)).toBe(true);
            });
        });

        describe('when the input predicate is true', () => {
            it('returns false', () => {
                expect(isZero(0)).toBe(true);
                expect(notIsZero(0)).toBe(false);
            });
        });
    });
});

describe(all, () => {
    describe('all(...Predicate[])', () => {
        const isBetweenZeroAndOne: Predicate<number> = all(isGreaterThan(0), isLessThan(1));

        describe('when all the input predicates are true', () => {
            it('returns true', () => {
                expect(isBetweenZeroAndOne(0.5)).toBe(true);
            });
        });

        describe('when one of the input predicates is false', () => {
            it('returns false', () => {
                expect(isBetweenZeroAndOne(3.14)).toBe(false);
            });
        });
    });
});

describe(either, () => {
    describe('either(...Predicate[])', () => {
        const isZeroOrPi: Predicate<number> = either(is(0), is(3.14));

        describe('when any of the input predicates is true', () => {
            it('returns true', () => {
                expect(isZeroOrPi(0)).toBe(true);
                expect(isZeroOrPi(3.14)).toBe(true);
            });
        });

        describe('when neither of the input predicates is true', () => {
            it('returns false', () => {
                expect(isZeroOrPi(1)).toBe(false);
            });
        });
    });
});

describe(neither, () => {
    describe('neither(...Predicate[])', () => {
        const neitherZeroOrPi: Predicate<number> = neither(is(0), is(3.14));

        describe('when neither of the input predicates is true', () => {
            it('returns true', () => {
                expect(neitherZeroOrPi(1)).toBe(true);
            });
        });

        describe('when either of the input predicates is true', () => {
            it('returns false', () => {
                expect(neitherZeroOrPi(0)).toBe(false);
                expect(neitherZeroOrPi(3.14)).toBe(false);
            });
        });
    });
});

describe(atLeast, () => {
    describe('atLeast(number, ...Predicate[])', () => {
        const atLeastTwo: Predicate<number> = atLeast(2, isNot(0), isLessThan(1), isGreaterThan(2));

        describe('when the number of matching predicates is equal or above a givne minimum', () => {
            it('returns true', () => {
                expect(atLeastTwo(3)).toBe(true);
            });
        });

        describe('when the number of matching predicates is below a given minimum', () => {
            it('returns false', () => {
                expect(atLeastTwo(0)).toBe(false);
            });
        });
    });
});

describe(atMost, () => {
    describe('atMost(number, ...Predicate[])', () => {
        const atMostTwo: Predicate<number> = atMost(2, isGreaterThan(1), isGreaterThan(2), is(3));

        describe('when the number of matching predicates is below or equal a given maximum', () => {
            it('returns true', () => {
                expect(atMostTwo(2)).toBe(true);
                expect(atMostTwo(4)).toBe(true);
            });
        });

        describe('when the number of matching predicates is above a given maximum', () => {
            it('returns false', () => {
                expect(atMostTwo(3)).toBe(false);
            });
        });
    });
});

describe(exactly, () => {
    const exactlyTwo: Predicate<number> = exactly(2, isGreaterThan(1), isGreaterThan(2), is(3));

    describe('exactly(number, ...Predicate[])', () => {
        describe('when the number of matching predicates is exactly a given count', () => {
            it('returns true', () => {
                expect(exactlyTwo(4)).toBe(true);
            });
        });

        describe('when the number of matching predicates is below a given count', () => {
            it('returns false', () => {
                expect(exactlyTwo(2)).toBe(false);
            });
        });

        describe('when the number of matching predicates is above a given count', () => {
            it('returns false', () => {
                expect(exactlyTwo(3)).toBe(false);
            });
        });
    });
});
