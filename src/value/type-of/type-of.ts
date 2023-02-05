import { isNull } from '../value';

/**
 * @see https://262.ecma-international.org/7.0/#sec-typeof-operator
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
 */
export type EcmaType = 'undefined' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'object';

const ecmaTypes: Set<EcmaType> = new Set<EcmaType>([
    'undefined',
    'boolean',
    'number',
    'bigint',
    'string',
    'symbol',
    'function',
    'object',
]);

/**
 * Type guards an EcmaType value in compile time
 * (unlike the `as` operator which allows to type cast any string as EcmaType).
 *
 * @throws TypeError - when the value in runtime is not an EcmaType.
 *
 * @since v0.9.0
 */
export function ecmaType(type: EcmaType): EcmaType {
    if (isEcmaType(type)) {
        return type;
    }
    throw new TypeError(`Input "${type as string}" is not an EcmaType`);
}

/**
 * Returns true and narrows the variable type, if the given input string is an EcmaType.
 *
 * @since v0.9.0
 */
export function isEcmaType(input: string): input is EcmaType {
    return ecmaTypes.has(input as EcmaType);
}

/**
 * Extended EcmaType to include checks for "null" and "array".
 *
 * Does not include "any", or "never", as these types cannot be checked in runtime.
 *
 * @see https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
 */
export type TsType = EcmaType | 'null' | 'array' | 'unknown';

const tsTypes: Set<TsType> = new Set<TsType>([
    ...ecmaTypes,
    'null',
    'array',
    'unknown',
]);

/**
 * Type guards a TsType value in compile time
 * (unlike the `as` operator which allows to type cast any string as TsType).
 *
 * @throws TypeError - when the value in runtime is not a TsType.
 *
 * @since v0.9.0
 */
export function tsType(type: TsType): TsType {
    if (isTsType(type)) {
        return type;
    }
    throw new TypeError(`Input "${type as string}" is not a TsType`);
}

/**
 * Returns true and narrows the variable type, if the given input string is a TsType.
 *
 * @since v0.9.0
 */
export function isTsType(input: string): input is TsType {
    return tsTypes.has(input as TsType);
}

/**
 * @see https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
 */
export type TypeOf<T> =
T extends undefined
    ? 'undefined'
    : T extends null
        ? 'null'
        : T extends boolean
            ? 'boolean'
            : T extends number
                ? 'number'
                : T extends bigint
                    ? 'bigint'
                    : T extends string
                        ? 'string'
                        : T extends symbol
                            ? 'symbol'
                            // eslint-disable-next-line @typescript-eslint/ban-types -- type check only
                            : T extends Function
                                ? 'function'
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars -- inferring an array
                                : T extends (infer _U)[]
                                    ? 'array'
                                    // eslint-disable-next-line @typescript-eslint/ban-types -- type check only
                                    : T extends object
                                        ? 'object'
                                        : 'unknown';

export function typeOf<T>(value: T | null | undefined): TypeOf<T> & TsType {
    if (isNull(value)) {
        return 'null' as TypeOf<T> & TsType;
    }
    if (Array.isArray(value)) {
        return 'array' as TypeOf<T> & TsType;
    }
    return typeof value as TypeOf<T> & TsType;
}

export function isTypeOf<T>(type: TsType): (value: T | null | undefined) => boolean {
    return (value: T | null | undefined): boolean => typeOf(value) as TsType === type;
}

export function isNotTypeOf<T>(type: TsType): (value: T | null | undefined) => boolean {
    return (value: T | null | undefined): boolean => typeOf(value) as TsType !== type;
}
