import {
    absentValueOrPanic,
    definedValueOrPanic,
    notNullValueOrPanic,
    nullValueOrPanic,
    presentValueOrPanic,
    undefinedValueOrPanic,
} from './value';

describe('definedValueOrPanic', () => {
    it('creates a function that returns the value when the value is defined', () => {
        expect(definedValueOrPanic()(null))
            .toBeNull();
    });

    it('creates a function that throws an error when the value is undefined', () => {
        expect(() => definedValueOrPanic()())
            .toThrow(Error);
    });
});

describe('undefinedValueOrPanic', () => {
    it('creates a function that returns undefined when the value is undefined', () => {
        expect(undefinedValueOrPanic()())
            .toBeUndefined();
    });

    it('creates a function that throws an error when the value is defined', () => {
        expect(() => undefinedValueOrPanic()(null))
            .toThrow(Error);
    });
});

describe('notNullValueOrPanic', () => {
    it('creates a function that returns the value when the value is not null', () => {
        expect(notNullValueOrPanic()(undefined))
            .toBeUndefined();
    });

    it('creates a function that throws an error when the value is null', () => {
        expect(() => notNullValueOrPanic()(null))
            .toThrow(Error);
    });
});

describe('nullValueOrPanic', () => {
    it('creates a function that returns null when the value is null', () => {
        expect(nullValueOrPanic()(null))
            .toBeNull();
    });

    it('creates a function that throws an error when the value is not null', () => {
        expect(() => nullValueOrPanic()(undefined))
            .toThrow(Error);
    });
});

describe('presentValueOrPanic', () => {
    it('creates a function that returns the value when the value is defined and not null', () => {
        expect(presentValueOrPanic()(false))
            .toBe(false);
    });

    it('creates a function that throws an error when the value is undefined', () => {
        expect(() => presentValueOrPanic()())
            .toThrow(Error);
    });

    it('creates a function that throws an error when the value is null', () => {
        expect(() => presentValueOrPanic()(null))
            .toThrow(Error);
    });
});

describe('absentValueOrPanic', () => {
    it('creates a function that returns undefined when the value is undefined', () => {
        expect(absentValueOrPanic()(undefined))
            .toBeUndefined();
    });

    it('creates a function that returns null when the value is null', () => {
        expect(absentValueOrPanic()(null))
            .toBeNull();
    });

    it('creates a function that throws an error when the value is not null or undefined', () => {
        expect(() => absentValueOrPanic()(false))
            .toThrow(Error);
    });
});
