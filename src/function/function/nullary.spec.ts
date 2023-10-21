import { constant, empty, isNullary, naught, valueOf } from './nullary';

describe(isNullary, () => {
    describe('when the given function accepts three arguments', () => {
        it('returns true', () => {
            expect(isNullary(() => null))
                .toBe(true);
        });
    });

    describe('when the given function accepts at least one argument', () => {
        it('returns false', () => {
            expect(isNullary((a: number): number => a))
                .toBe(false);
        });
    });

    describe('when the first argument is variadic', () => {
        it('returns true', () => {
            expect(isNullary((...a: number[]): number[] => a)).toBe(true);
        });
    });
});

describe(constant, () => {
    describe('constant(value)', () => {
        it('returns a given value', () => {
            expect(constant(3.14)()).toBe(3.14);
        });
    });
});

/* eslint-disable deprecation/deprecation -- TODO: Delete in v0.11.0-alpha */
describe(empty, () => {
    it('creates an empty function', () => {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- testing void return
        expect(empty()()).toBeUndefined();
    });
});
/* eslint-enable deprecation/deprecation */

describe(naught, () => {
    it('returns undefined', () => {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- testing void return
        expect(naught()).toBeUndefined();
    });
});

describe(valueOf, () => {
    describe('when a given value is a constant', () => {
        it('returns the given value', () => {
            expect(valueOf(3.14))
                .toBe(3.14);
        });
    });

    describe('when a given value is a function', () => {
        it('returns the result of the function', () => {
            expect(valueOf(constant(3.14)))
                .toBe(3.14);
        });
    });
});
