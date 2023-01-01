import { ecmaType, isEcmaType, isNotTypeOf, isTsType, isTypeOf, TsType, tsType, typeOf } from './type-of';

describe(ecmaType, () => {
    it('returns the given EcmaType value', () => {
        expect(ecmaType('symbol')).toBe('symbol');
    });

    it('does not compile and throws a runtime error with a non-EcmaType value', () => {
        // @ts-expect-error --TS2345: Argument of type '"null"' is not assignable to parameter of type 'EcmaType'.
        expect(() => ecmaType('null')).toThrow(new TypeError('Input "null" is not an EcmaType'));

        // @ts-expect-error -- TS2345: Argument of type 'undefined' is not assignable to parameter of type 'EcmaType'.
        expect(() => ecmaType(undefined)).toThrow(new TypeError('Input "undefined" is not an EcmaType'));
    });
});

describe(isEcmaType, () => {
    it('returns true if the given input is an EcmaType', () => {
        expect(isEcmaType('undefined')).toBe(true);
    });

    it('returns false if the given input is not an EcmaType', () => {
        expect(isEcmaType('UNDEFINED')).toBe(false);
    });
});

describe(tsType, () => {
    it('returns the given TsType value', () => {
        expect(tsType('null')).toBe('null');
        expect(tsType('array')).toBe('array');
    });

    it('does not compile and throws a runtime error with a non-TsType value', () => {
        // @ts-expect-error -- TS2345: Argument of type '"any"' is not assignable to parameter of type 'TsType'.
        expect(() => tsType('any')).toThrow(new TypeError('Input "any" is not a TsType'));

        // @ts-expect-error -- TS2345: Argument of type 'undefined' is not assignable to parameter of type 'TsType'.
        expect(() => tsType(undefined)).toThrow(new TypeError('Input "undefined" is not a TsType'));
    });
});

describe(isTsType, () => {
    it('returns true if the given input is an EcmaType', () => {
        expect(isTsType('null')).toBe(true);
        expect(isTsType('array')).toBe(true);
    });

    it('returns false if the given input is not a TsType', () => {
        expect(isTsType('any')).toBe(false);
        expect(isTsType('never')).toBe(false);
    });
});

// NOTE: Explicitly defining each constant with a type to verify correct TypeOf<T> type
describe('typeof', () => {
    describe('typeOf<T>', () => {
        it('is of type TsType for the "any" type', () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- testing types
            const output: TsType = typeOf<any>({});

            expect(output).toBe('object' as TsType);
        });

        it('is of type "unknown" for the "unknown" type', () => {
            const output: 'unknown' = typeOf<unknown>(null);

            expect(output).toBe('null' as TsType);
        });

        it('returns a union type for a union type', () => {
            const output: 'undefined' | 'null' = typeOf<undefined | null>(undefined);

            expect(output).toBe('undefined' as TsType);
        });

        it('cannot be assigned to a different Type', () => {
            // @ts-expect-error -- TS2322: Type '"undefined"' is not assignable to type '"null"'.
            const output: 'null' = typeOf(undefined);

            expect(output).toBe('undefined' as TsType);
        });
    });

    describe('typeOf(undefined)', () => {
        it('returns "undefined" when value is undefined', () => {
            const output: 'undefined' = typeOf(undefined);

            expect(output).toBe('undefined' as TsType);
        });

        it('returns "undefined" when value is void', () => {
            // eslint-disable-next-line no-void -- testing undefined value
            const output: 'undefined' = typeOf(void 0);

            expect(output).toBe('undefined' as TsType);
        });
    });

    describe('typeOf(null)', () => {
        it('returns "null" when value is null', () => {
            const output: 'null' = typeOf(null);

            expect(output).toBe('null' as TsType);
        });
    });

    describe('typeOf(boolean)', () => {
        it('returns "boolean" when value is false', () => {
            const output: 'boolean' = typeOf(false);

            expect(output).toBe('boolean' as TsType);
        });

        it('returns "boolean" when value is true', () => {
            const output: 'boolean' = typeOf(true);

            expect(output).toBe('boolean' as TsType);
        });
    });

    describe('typeOf(number)', () => {
        it('returns "number" when value is NaN', () => {
            const output: 'number' = typeOf(Number.NaN);

            expect(output).toBe('number' as TsType);
        });

        it('returns "number" when value is a number', () => {
            const output: 'number' = typeOf(0);

            expect(output).toBe('number' as TsType);
        });

        it('returns "number" when value is +Infinity', () => {
            const output: 'number' = typeOf(Number.POSITIVE_INFINITY);

            expect(output).toBe('number' as TsType);
        });

        it('returns "number" when value is -Infinity', () => {
            expect(typeOf(Number.NEGATIVE_INFINITY)).toBe('number' as TsType);
        });

        it('returns "number" when value is MIN_SAFE_INTEGER', () => {
            expect(typeOf(Number.MIN_SAFE_INTEGER)).toBe('number' as TsType);
        });

        it('returns "number" when value is MAX_SAFE_INTEGER', () => {
            expect(typeOf(Number.MAX_SAFE_INTEGER)).toBe('number' as TsType);
        });

        it('returns "number" when value is MIN_VALUE', () => {
            expect(typeOf(Number.MIN_VALUE)).toBe('number' as TsType);
        });

        it('returns "number" when value is MAX_VALUE', () => {
            expect(typeOf(Number.MAX_VALUE)).toBe('number' as TsType);
        });

        it('returns "number" when value is EPSILON', () => {
            expect(typeOf(Number.EPSILON)).toBe('number' as TsType);
        });
    });

    describe('typeOf(bigint)', () => {
        it('returns "bigint" when value is a BigInt', () => {
            const output: 'bigint' = typeOf(BigInt(0));

            expect(output).toBe('bigint' as TsType);
        });
    });

    describe('typeOf(string)', () => {
        it('returns "string" when value is a string', () => {
            const output: 'string' = typeOf('');

            expect(output).toBe('string' as TsType);
        });
    });

    describe('typeOf(symbol)', () => {
        it('returns "symbol" when value is a symbol', () => {
            const output: 'symbol' = typeOf(Symbol('TypeOf'));

            expect(output).toBe('symbol' as TsType);
        });
    });

    describe('typeOf(function)', () => {
        it('returns "function" when value is a function', () => {
            const output: 'function' = typeOf(typeOf);

            expect(output).toBe('function' as TsType);
        });
    });

    describe('typeOf(array)', () => {
        it('returns "array" when value is an array', () => {
            const output: 'array' = typeOf([]);

            expect(output).toBe('array' as TsType);
        });
    });

    describe('typeOf(object)', () => {
        it('returns "object" when value is not an array', () => {
            const output: 'object' = typeOf(new Date());

            expect(output).toBe('object' as TsType);
        });

        it('returns TsType when value is a null object', () => {
            const output: TsType = typeOf(Object.create(null));

            expect(output).toBe('object' as TsType);
        });
    });
});

describe('isTypeOf', () => {
    describe('isTypeOf(type)', () => {
        it('returns true when the type of the given value matches the given type', async () => {
            const isNull: boolean = await Promise.resolve(null).then(isTypeOf('null'));

            expect(isNull).toBe(true);

            const isArray: boolean = await Promise.resolve(Array.from({ length: 1 })).then(isTypeOf('array'));

            expect(isArray).toBe(true);

            const isObject: boolean = await Promise.resolve(new Date()).then(isTypeOf('object'));

            expect(isObject).toBe(true);
        });

        it('returns false when the type of the given value matches the given type', async () => {
            const isUndefined: boolean = await Promise.resolve(null).then(isTypeOf('undefined'));

            expect(isUndefined).toBe(false);

            const isString: boolean = await Promise.resolve(0).then(isTypeOf('string'));

            expect(isString).toBe(false);
        });
    });
});

describe('isNotTypeOf', () => {
    describe('isNotTypeOf(type)', () => {
        it('returns false when the type of the given value matches the given type', async () => {
            const isNull: boolean = await Promise.resolve(null).then(isNotTypeOf('null'));

            expect(isNull).toBe(false);

            const isArray: boolean = await Promise.resolve(Array.from({ length: 1 })).then(isNotTypeOf('array'));

            expect(isArray).toBe(false);

            const isObject: boolean = await Promise.resolve(new Date()).then(isNotTypeOf('object'));

            expect(isObject).toBe(false);
        });

        it('returns true when the type of the given value matches the given type', async () => {
            const isUndefined: boolean = await Promise.resolve(null).then(isNotTypeOf('undefined'));

            expect(isUndefined).toBe(true);

            const isString: boolean = await Promise.resolve(0).then(isNotTypeOf('string'));

            expect(isString).toBe(true);
        });
    });
});
