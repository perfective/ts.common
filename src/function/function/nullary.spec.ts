import { constant, empty, isNullary, naught, valueOf } from './nullary';

describe('isNullary', () => {
    it('returns true when the given function accepts three arguments', () => {
        expect(isNullary(() => null))
            .toBe(true);
    });

    it('returns false when the given function accepts at least one argument', () => {
        expect(isNullary((a: number): number => a))
            .toBe(false);
    });
});

describe('constant', () => {
    it('creates a function that returns a constant value', () => {
        expect(constant(3.14)()).toBe(3.14);
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

describe('valueOf', () => {
    it('returns the value when a value is a constant', () => {
        expect(valueOf(3.14))
            .toBe(3.14);
    });

    it('returns the result of a function when value is a function', () => {
        expect(valueOf(constant(3.14)))
            .toBe(3.14);
    });
});
