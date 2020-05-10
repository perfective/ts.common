import { constant, empty, fallbackTo } from './nullary';

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
