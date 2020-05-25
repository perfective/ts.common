import { panic, throws } from './panic';

describe('throws', () => {
    it('throws an Error without a message', () => {
        expect(throws)
            .toThrow(Error);
    });

    it('throws an Error with a message', () => {
        expect(() => throws('Failure'))
            .toThrow(new Error('Failure'));
    });

    it('throws a custom error', () => {
        expect(() => throws(new TypeError()))
            .toThrow(TypeError);
    });
});

describe('panic', () => {
    it('creates a function that throws an Error without a message', () => {
        expect(() => panic()())
            .toThrow(Error);
    });

    it('creates a function that throws an Error with a message', () => {
        expect(() => panic('Failure')())
            .toThrow(new Error('Failure'));
    });

    it('creates a function that throws a custom error', () => {
        expect(() => panic(new TypeError())())
            .toThrow(TypeError);
    });
});
