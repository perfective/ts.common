import { testCase } from '../../jest';
import { isGreaterThan, isLessThan } from '../../number/number/order';

import {
    all,
    atLeast,
    atMost,
    either,
    exactly,
    is,
    isBoolean,
    isFalsy,
    isNot,
    isNotBoolean,
    isTruthy,
    neither,
    not,
    Predicate,
} from './predicate';

describe(isBoolean, () => {
    describe.each([
        testCase(true, true),
        testCase(false, true),
        testCase(undefined, false),
        testCase(null, false),
        testCase('string', '', false),
        testCase('number', 0, false),
        testCase('array', [], false),
        testCase('object', {}, false),
    ])('when a given value is $name', ({ input, output }) => {
        it(`returns ${String(output)}`, () => {
            expect(isBoolean(input)).toBe(output);
        });
    });
});

describe(isNotBoolean, () => {
    describe.each([
        testCase(true, false),
        testCase(false, false),
        testCase(undefined, true),
        testCase(null, true),
        testCase('string', '', true),
        testCase('number', 0, true),
        testCase('array', [], true),
        testCase('object', {}, true),
    ])('when a given value is $name', ({ input, output }) => {
        it(`returns ${String(output)}`, () => {
            expect(isNotBoolean(input)).toBe(output);
        });
    });
});

describe(isTruthy, () => {
    describe('when the value is true', () => {
        it('returns true', () => {
            expect(isTruthy(true)).toBe(true);
        });
    });

    describe('when the value is false', () => {
        it('returns false', () => {
            expect(isTruthy(false)).toBe(false);
        });
    });

    describe('when the value is undefined', () => {
        it('returns false', () => {
            expect(isTruthy(undefined)).toBe(false);
        });
    });

    describe('when the value is null', () => {
        it('returns false', () => {
            expect(isTruthy(null)).toBe(false);
        });
    });

    describe('when the value is an empty string', () => {
        it('returns false', () => {
            expect(isTruthy('')).toBe(false);
        });
    });

    describe('when the value is a non-empty string', () => {
        it('returns true', () => {
            expect(isTruthy('0')).toBe(true);
        });
    });

    describe('when the value is NaN', () => {
        it('returns false', () => {
            expect(isTruthy(Number.NaN)).toBe(false);
        });
    });

    describe('when the value is zero', () => {
        it('returns false', () => {
            expect(isTruthy(0)).toBe(false);
            expect(isTruthy(-0)).toBe(false);
        });
    });

    describe('when the value is a non-zero number', () => {
        it('returns true', () => {
            expect(isTruthy(Number.MAX_SAFE_INTEGER)).toBe(true);
            expect(isTruthy(Number.MAX_VALUE)).toBe(true);
            expect(isTruthy(Number.MIN_VALUE)).toBe(true);
            expect(isTruthy(Number.POSITIVE_INFINITY)).toBe(true);
            expect(isTruthy(Number.NEGATIVE_INFINITY)).toBe(true);
        });
    });

    describe('when the value is zero BigInt', () => {
        it('returns false', () => {
            expect(isTruthy(BigInt(0))).toBe(false);
        });
    });

    describe('when the value is non-zero BigInt', () => {
        it('returns true', () => {
            expect(isTruthy(BigInt(Number.MAX_SAFE_INTEGER))).toBe(true);
        });
    });

    describe('when the value is an empty object', () => {
        it('returns true', () => {
            expect(isTruthy({})).toBe(true);
        });
    });

    describe('when the value is an empty array', () => {
        it('returns true', () => {
            expect(isTruthy([])).toBe(true);
        });
    });

    describe('when the value is an empty RegExp', () => {
        it('returns true', () => {
            expect(isTruthy(new RegExp('', 'u'))).toBe(true);
        });
    });
});

describe(isFalsy, () => {
    describe('when the value is true', () => {
        it('returns false', () => {
            expect(isFalsy(true)).toBe(false);
        });
    });

    describe('when the value is false', () => {
        it('returns true', () => {
            expect(isFalsy(false)).toBe(true);
        });
    });

    describe('when the value is undefined', () => {
        it('returns true', () => {
            expect(isFalsy(undefined)).toBe(true);
        });
    });

    describe('when the value is null', () => {
        it('returns true', () => {
            expect(isFalsy(null)).toBe(true);
        });
    });

    describe('when the value is an empty string', () => {
        it('returns true', () => {
            expect(isFalsy('')).toBe(true);
        });
    });

    describe('when the value is a non-empty string', () => {
        it('returns false', () => {
            expect(isFalsy('0')).toBe(false);
        });
    });

    describe('when the value is NaN', () => {
        it('returns true', () => {
            expect(isFalsy(Number.NaN)).toBe(true);
        });
    });

    describe('when the value is zero', () => {
        it('returns true', () => {
            expect(isFalsy(0)).toBe(true);
            expect(isFalsy(-0)).toBe(true);
        });
    });

    describe('when the value is a non-zero number', () => {
        it('returns false', () => {
            expect(isFalsy(Number.MAX_SAFE_INTEGER)).toBe(false);
            expect(isFalsy(Number.MAX_VALUE)).toBe(false);
            expect(isFalsy(Number.MIN_VALUE)).toBe(false);
            expect(isFalsy(Number.POSITIVE_INFINITY)).toBe(false);
            expect(isFalsy(Number.NEGATIVE_INFINITY)).toBe(false);
        });
    });

    describe('when the value is zero BigInt', () => {
        it('returns true', () => {
            expect(isFalsy(BigInt(0))).toBe(true);
        });
    });

    describe('when the value is non-zero BigInt', () => {
        it('returns false', () => {
            expect(isFalsy(BigInt(Number.MAX_SAFE_INTEGER))).toBe(false);
        });
    });

    describe('when the value is an empty object', () => {
        it('returns false', () => {
            expect(isFalsy({})).toBe(false);
        });
    });

    describe('when the value is an empty array', () => {
        it('returns false', () => {
            expect(isFalsy([])).toBe(false);
        });
    });

    describe('when the value is an empty RegExp', () => {
        it('returns false', () => {
            expect(isFalsy(new RegExp('', 'u'))).toBe(false);
        });
    });
});

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

        describe('when the number of matching predicates is equal or above a given minimum', () => {
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
