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
} from './error';

describe('definedValueOrThrow', () => {
    it('returns the value when the value is defined', () => {
        expect(definedValueOrThrow(null, 'Undefined value'))
            .toBeNull();
    });

    it('throws an error when the value is undefined', () => {
        expect(() => definedValueOrThrow(undefined, 'Undefined value'))
            .toThrow(new Error('Undefined value'));
        expect(() => definedValueOrThrow(undefined, new TypeError()))
            .toThrow(TypeError);
    });
});

describe('definedValueOrPanic', () => {
    it('creates a function that returns the value when the value is defined', () => {
        expect(definedValueOrPanic('Undefined value')(null))
            .toBeNull();
    });

    it('creates a function that throws an error when the value is undefined', () => {
        expect(() => definedValueOrPanic('Undefined value')(undefined))
            .toThrow(Error);
    });
});

describe('undefinedValueOrThrow', () => {
    it('returns the value when the value is undefined', () => {
        expect(undefinedValueOrThrow(undefined, 'Defined value'))
            .toBeUndefined();
    });

    it('throws an error when the value is defined', () => {
        expect(() => undefinedValueOrThrow(null, 'Defined value'))
            .toThrow(new Error('Defined value'));
        expect(() => undefinedValueOrThrow(null, new TypeError()))
            .toThrow(TypeError);
    });
});

describe('undefinedValueOrPanic', () => {
    it('creates a function that returns undefined when the value is undefined', () => {
        expect(undefinedValueOrPanic('Defined value')(undefined))
            .toBeUndefined();
    });

    it('creates a function that throws an error when the value is defined', () => {
        expect(() => undefinedValueOrPanic('Defined value')(null))
            .toThrow(Error);
    });
});

describe('notNullValueOrThrow', () => {
    it('returns the value when the value is not null', () => {
        expect(notNullValueOrThrow(undefined, 'Null value'))
            .toBeUndefined();
    });

    it('throws an error when the value is null', () => {
        expect(() => notNullValueOrThrow(null, 'Null value'))
            .toThrow(new Error('Null value'));
        expect(() => notNullValueOrThrow(null, new TypeError()))
            .toThrow(TypeError);
    });
});

describe('notNullValueOrPanic', () => {
    it('creates a function that returns the value when the value is not null', () => {
        expect(notNullValueOrPanic('Null value')(undefined))
            .toBeUndefined();
    });

    it('creates a function that throws an error when the value is null', () => {
        expect(() => notNullValueOrPanic('Null value')(null))
            .toThrow(Error);
    });
});

describe('nullValueOrThrow', () => {
    it('returns the value when the value is null', () => {
        expect(nullValueOrThrow(null, 'Not null value'))
            .toBeNull();
    });

    it('throws an error when the value is not null', () => {
        expect(() => nullValueOrThrow(undefined, 'Not null value'))
            .toThrow(new Error('Not null value'));
        expect(() => nullValueOrThrow(undefined, new TypeError()))
            .toThrow(TypeError);
    });
});

describe('nullValueOrPanic', () => {
    it('creates a function that returns null when the value is null', () => {
        expect(nullValueOrPanic('Not null value')(null))
            .toBeNull();
    });

    it('creates a function that throws an error when the value is not null', () => {
        expect(() => nullValueOrPanic('Not null value')(undefined))
            .toThrow(Error);
    });
});

describe('presentValueOrThrow', () => {
    it('returns the value when the value is present', () => {
        expect(presentValueOrThrow(false, 'Absent value'))
            .toBe(false);
    });

    it('throws an error when the value is absent', () => {
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
        expect(presentValueOrPanic('Absent value')(false))
            .toBe(false);
    });

    it('creates a function that throws an error when the value is undefined', () => {
        expect(() => presentValueOrPanic('Absent value')(undefined))
            .toThrow(Error);
    });

    it('creates a function that throws an error when the value is null', () => {
        expect(() => presentValueOrPanic('Absent value')(null))
            .toThrow(Error);
    });
});

describe('absentValueOrThrow', () => {
    it('returns the value when the value is absent', () => {
        expect(absentValueOrThrow(undefined, 'Present value'))
            .toBeUndefined();
        expect(absentValueOrThrow(null, 'Present value'))
            .toBeNull();
    });

    it('throws an error when the value is present', () => {
        expect(() => absentValueOrThrow(false, 'Present value'))
            .toThrow(new Error('Present value'));
        expect(() => absentValueOrThrow(false, new TypeError()))
            .toThrow(TypeError);
    });
});

describe('absentValueOrPanic', () => {
    it('creates a function that returns undefined when the value is undefined', () => {
        expect(absentValueOrPanic('Present value')(undefined))
            .toBeUndefined();
    });

    it('creates a function that returns null when the value is null', () => {
        expect(absentValueOrPanic('Present value')(null))
            .toBeNull();
    });

    it('creates a function that throws an error when the value is not null or undefined', () => {
        expect(() => absentValueOrPanic('Present value')(false))
            .toThrow(Error);
    });
});
