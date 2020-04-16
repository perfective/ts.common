import { panic } from './error';

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
