import { constant, empty, valueOf } from './nullary';

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
