import { constant, empty, fallbackTo, valueOf } from './nullary';

describe('constant', () => {
    it('creates a function that returns a constant value', () => {
        expect(constant(3.14)()).toStrictEqual(3.14);
    });
});

describe('empty', () => {
    it('creates an empty function', () => {
        expect(empty()()).toBeUndefined();
    });
});

describe('fallbackTo', () => {
    it('returns a constant when value is constant', () => {
        expect(fallbackTo(3.14))
            .toStrictEqual(3.14);
    });

    it('returns a result of the fallback function when value is a function', () => {
        expect(fallbackTo(constant(3.14)))
            .toStrictEqual(3.14);
    });
});

describe('valueOf', () => {
    it('returns the value when a value is a constant', () => {
        expect(valueOf(3.14))
            .toStrictEqual(3.14);
    });

    it('returns the result of a function when value is a function', () => {
        expect(valueOf(constant(3.14)))
            .toStrictEqual(3.14);
    });
});
