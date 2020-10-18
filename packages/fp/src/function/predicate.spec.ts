import { constant } from './nullary';
import { all, atLeast, atMost, either, exactly, is, isNot, negative, neither, not } from './predicate';

const list: number[] = [2.71, 3.14];
const irrational: Record<string, number> = {
    euler: 2.71,
    pi: 3.14,
};

describe('is', () => {
    describe('is(T)', () => {
        it('returns true when value is the same', () => {
            expect(is(3.14)(3.14)).toBe(true);
            expect(is('3.14')('3.14')).toBe(true);
            expect(is(list)(list)).toBe(true);
            expect(is(irrational)(irrational)).toBe(true);
        });

        it('returns false when value is not the same', () => {
            expect(is(2.71)(3.14)).toBe(false);
            expect(is('2.71')('3.14')).toBe(false);
            expect(is(list)([2.71, 3.14])).toBe(false);
            expect(is(irrational)({
                euler: 2.71,
                pi: 3.14,
            })).toBe(false);
        });
    });
});

describe('isNot', () => {
    describe('isNot(T)', () => {
        it('returns false when value is the same', () => {
            expect(isNot(3.14)(3.14)).toBe(false);
            expect(isNot('3.14')('3.14')).toBe(false);
            expect(isNot(list)(list)).toBe(false);
            expect(isNot(irrational)(irrational)).toBe(false);
        });

        it('returns true when value is not the same', () => {
            expect(isNot(2.71)(3.14)).toBe(true);
            expect(isNot('2.71')('3.14')).toBe(true);
            expect(isNot(list)([2.71, 3.14])).toBe(true);
            expect(isNot(irrational)({
                euler: 2.71,
                pi: 3.14,
            })).toBe(true);
        });
    });
});

describe('negative', () => {
    it('negates the given boolean value', () => {
        expect(negative(true)).toStrictEqual(false);
        expect(negative(false)).toStrictEqual(true);
    });

    it('negates the given proposition value', () => {
        expect(negative(constant(true))).toStrictEqual(false);
        expect(negative(constant(false))).toStrictEqual(true);
    });
});

describe('not', () => {
    it('creates a predicate that is true when the input predicate is false', () => {
        expect(not(is(3.14))(2.71)).toBe(true);
    });

    it('creates a predicate that is false when the input predicate is true', () => {
        expect(not(is(3.14))(3.14)).toBe(false);
    });
});

describe('all', () => {
    it('creates a predicate that is true when all the input predicates are true', () => {
        expect(all(is(3.14), is(3.14))(3.14)).toBe(true);
    });

    it('creates a predicate that is false when one of the input predicates is false', () => {
        expect(all(is(3.14), is(2.71))(3.14)).toBe(false);
    });
});

describe('either', () => {
    it('creates a predicate that is true when any of the input predicates is true', () => {
        expect(either(is(3.14), is(2.71))(3.14)).toBe(true);
    });

    it('creates a predicate that is true when neither of the input predicates is true', () => {
        expect(either(is(3.14), is(2.71))(1.41)).toBe(false);
    });
});

describe('neither', () => {
    it('creates a predicate that is true when neither of the input predicates is true', () => {
        expect(neither(is(3.14), is(2.71))(1.41)).toBe(true);
    });

    it('creates a predicate that is false when either of the input predicates is true', () => {
        expect(neither(is(3.14), is(2.71))(2.71)).toBe(false);
    });
});

describe('atLeast', () => {
    it('creates a predicate that is true when the threshold is met', () => {
        expect(atLeast(2, ...[1.41, 1.73, 2.23].map(isNot))(2.23)).toBe(true);
    });

    it('creates a predicate that is false when the threshold is not met', () => {
        expect(atLeast(2, ...[1.41, 1.73, 2.23].map(is))(2.23)).toBe(false);
    });
});

describe('atMost', () => {
    it('creates a predicate that is true when the number of true is below a threshold', () => {
        expect(atMost(1, ...[1.41, 1.73, 2.23].map(is))(2.23)).toBe(true);
    });

    it('creates a predicate that is false when the number of true is above a threshold', () => {
        expect(atMost(1, ...[1.41, 1.73, 2.23].map(isNot))(2.23)).toBe(false);
    });
});

describe('exactly', () => {
    it('creates a predicate that is true when the number of true is matched', () => {
        expect(exactly(2, ...[1.41, 1.73, 2.23].map(isNot))(2.23)).toBe(true);
    });

    it('creates a predicate that is false when the number of true is not matched', () => {
        expect(exactly(2, ...[1.41, 1.73, 2.23].map(is))(2.23)).toBe(false);
    });
});
