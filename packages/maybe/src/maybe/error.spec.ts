import { fail, panic } from './error';

describe('fail', () => {
    it('creates a function that throws an Error without a message', () => {
        expect(() => fail()())
            .toThrowError();
    });

    it('creates a function that throws an Error with a message', () => {
        expect(() => fail('Failure')())
            .toThrowError('Failure');
    });
});

describe('panic', () => {
    it('creates a function that throws a custom error', () => {
        expect(() => panic(new TypeError())())
            .toThrow(TypeError);
    });
});
