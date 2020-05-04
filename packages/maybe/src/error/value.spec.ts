import {
    absentValueOrPanic,
    absentValueOrThrow,
    definedValueOrPanic,
    definedValueOrThrow,
    notNullValueOrPanic,
    notNullValueOrThrow,
    nullValueOrPanic,
    nullValueOrThrow,
    presentValueOrPanic,
    presentValueOrThrow,
    undefinedValueOrPanic,
    undefinedValueOrThrow,
} from './value';

describe('definedValueOrThrow', () => {
    it('returns the value when the value is defined', () => {
        expect(definedValueOrThrow(null))
            .toBeNull();
    });

    it('throws an error when the value is undefined', () => {
        expect(() => definedValueOrThrow(undefined))
            .toThrow(Error);
        expect(() => definedValueOrThrow(undefined, 'Undefined value'))
            .toThrow(new Error('Undefined value'));
        expect(() => definedValueOrThrow(undefined, new TypeError()))
            .toThrow(TypeError);
    });
});

describe('definedValueOrPanic', () => {
    it('creates a function that returns the value when the value is defined', () => {
        expect(definedValueOrPanic()(null))
            .toBeNull();
    });

    it('creates a function that throws an error when the value is undefined', () => {
        expect(() => definedValueOrPanic()(undefined))
            .toThrow(Error);
    });
});

describe('undefinedValueOrThrow', () => {
    it('returns the value when the value is undefined', () => {
        expect(undefinedValueOrThrow(undefined))
            .toBeUndefined();
    });

    it('throws an error when the value is defined', () => {
        expect(() => undefinedValueOrThrow(null))
            .toThrow(Error);
        expect(() => undefinedValueOrThrow(null, 'Defined value'))
            .toThrow(new Error('Defined value'));
        expect(() => undefinedValueOrThrow(null, new TypeError()))
            .toThrow(TypeError);
    });
});

describe('undefinedValueOrPanic', () => {
    it('creates a function that returns undefined when the value is undefined', () => {
        expect(undefinedValueOrPanic()(undefined))
            .toBeUndefined();
    });

    it('creates a function that throws an error when the value is defined', () => {
        expect(() => undefinedValueOrPanic()(null))
            .toThrow(Error);
    });
});

describe('notNullValueOrThrow', () => {
    it('returns the value when the value is not null', () => {
        expect(notNullValueOrThrow(undefined))
            .toBeUndefined();
    });

    it('throws an error when the value is null', () => {
        expect(() => notNullValueOrThrow(null))
            .toThrow(Error);
        expect(() => notNullValueOrThrow(null, 'Null value'))
            .toThrow(new Error('Null value'));
        expect(() => notNullValueOrThrow(null, new TypeError()))
            .toThrow(TypeError);
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

describe('nullValueOrThrow', () => {
    it('returns the value when the value is null', () => {
        expect(nullValueOrThrow(null))
            .toBeNull();
    });

    it('throws an error when the value is not null', () => {
        expect(() => nullValueOrThrow(undefined))
            .toThrow(Error);
        expect(() => nullValueOrThrow(undefined, 'Not null value'))
            .toThrow(new Error('Not null value'));
        expect(() => nullValueOrThrow(undefined, new TypeError()))
            .toThrow(TypeError);
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

describe('presentValueOrThrow', () => {
    it('returns the value when the value is present', () => {
        expect(presentValueOrThrow(false))
            .toBe(false);
    });

    it('throws an error when the value is absent', () => {
        expect(() => presentValueOrThrow(null))
            .toThrow(Error);
        expect(() => presentValueOrThrow(undefined))
            .toThrow(Error);
        expect(() => presentValueOrThrow(null, 'Null value'))
            .toThrow(new Error('Null value'));
        expect(() => presentValueOrThrow(undefined, 'Undefined value'))
            .toThrow(new Error('Undefined value'));
        expect(() => presentValueOrThrow(null, new TypeError()))
            .toThrow(TypeError);
        expect(() => presentValueOrThrow(undefined, new TypeError()))
            .toThrow(TypeError);
    });
});

describe('presentValueOrPanic', () => {
    it('creates a function that returns the value when the value is defined and not null', () => {
        expect(presentValueOrPanic()(false))
            .toBe(false);
    });

    it('creates a function that throws an error when the value is undefined', () => {
        expect(() => presentValueOrPanic()(undefined))
            .toThrow(Error);
    });

    it('creates a function that throws an error when the value is null', () => {
        expect(() => presentValueOrPanic()(null))
            .toThrow(Error);
    });
});

describe('absentValueOrThrow', () => {
    it('returns the value when the value is absent', () => {
        expect(absentValueOrThrow(undefined))
            .toBeUndefined();
        expect(absentValueOrThrow(null))
            .toBeNull();
    });

    it('throws an error when the value is present', () => {
        expect(() => absentValueOrThrow(false))
            .toThrow(Error);
        expect(() => absentValueOrThrow(false, 'Present value'))
            .toThrow(new Error('Present value'));
        expect(() => absentValueOrThrow(false, new TypeError()))
            .toThrow(TypeError);
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
