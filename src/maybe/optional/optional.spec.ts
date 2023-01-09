import { Unary } from '../../function';
import { constant, Nullary } from '../../function/function/nullary';
import { decimal } from '../../number/number/base';
import { hasAbsentProperty, hasPresentProperty, ObjectWithAbsent } from '../../object/property/property';
import { split } from '../../string/string/lift';
import { isNotNull, isNull, isPresent } from '../../value/value';
import {
    identity,
    safeDecimalOutput,
    strictDecimalOutput,
    unsafeDecimalOutput,
    unsafeNumber,
} from '../maybe/maybe.mock';
import { typeGuardCheck } from '../maybe/type-guard-check.mock';

import { None, none, Optional, optional, optionalOf, Some, some } from './optional';
import { fallbackOptional, noneDecimalOutput, optionalDecimalOutput, someDecimalOutput } from './optional.mock';

function optionalDecimal(value: number | null | undefined): Optional<string> {
    return optional(value).to<string>(safeDecimalOutput);
}

function optionalSplit(value: string | undefined): Optional<string[]> {
    return optional(value).to(v => v.split('.'));
}

function nullableDecimal(value: number | null): string {
    if (isPresent(value)) {
        return decimal(value);
    }
    return '';
}

function splitNullableDecimal(value: number | null): string[] {
    return split('.')(nullableDecimal(value));
}

describe(optional, () => {
    describe('when the value may be present or undefined', () => {
        it('must be assigned to Optional', () => {
            const output: Optional<number | null> = optional(unsafeNumber(0));

            expect(output).toStrictEqual(some(0));
        });
    });

    describe('when the value is present', () => {
        it('creates Some<T> when value is present', () => {
            expect(optional(unsafeNumber(0)))
                .toStrictEqual(some(0));
        });

        it('cannot be assigned to Some<T>', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Optional<number | null>' is not assignable to type 'Some<number | null>'.
            const output: Some<number | null> = optional(unsafeNumber(0));

            expect(output).toStrictEqual(some(0));
        });
    });

    describe('when the value is undefined', () => {
        it('returns the memoized "none" None<T> when value is undefined', () => {
            expect(optional(unsafeNumber(undefined)))
                .toStrictEqual(none());
        });

        it('cannot be assigned to None<T>', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Optional<number | null>' is not assignable to type 'None<number | null>'.
            const output: None<number | null> = optional(unsafeNumber(undefined));

            expect(output).toBe(none());
        });
    });
});

describe(optionalOf, () => {
    describe('when the "map" function requires defined input and returns defined output', () => {
        it('returns an unary function that returns Some', () => {
            const output: Unary<number, Some<string>> = optionalOf(strictDecimalOutput);

            expect(output(0)).toStrictEqual(some('0'));
        });
    });

    describe('when the "map" function accepts defined or undefined value and returns defined output', () => {
        it('creates an unary function that returns Some', () => {
            const output: Unary<number | null | undefined, Some<string>> = optionalOf(safeDecimalOutput);

            expect(output(0)).toStrictEqual(some('0'));
            expect(output(null)).toStrictEqual(some('null'));
            expect(output(undefined)).toStrictEqual(some('undefined'));
        });
    });

    describe('when the "map" function accepts defined or undefined value and returns undefined output', () => {
        it('creates an unary function that returns None', () => {
            const output: Unary<number | null | undefined, None<string>> = optionalOf(constant(undefined));

            expect(output(0)).toBe(none());
            expect(output(null)).toBe(none());
            expect(output(undefined)).toBe(none());
        });
    });

    describe(
        'when the "map" function accepts defined or undefined value and returns defined or undefined output',
        () => {
            it('creates an unary function that returns Maybe', () => {
                const output: Unary<number | null | undefined, Optional<string | null>> = optionalOf(
                    unsafeDecimalOutput,
                );

                expect(output(0)).toStrictEqual(some('0'));
                expect(output(null)).toStrictEqual(some(null));
                expect(output(undefined)).toBe(none());
            });
        },
    );
});

describe(Optional, () => {
    describe('value', () => {
        it('is an optional property and cannot be assigned to the value type', () => {
            // @ts-expect-error -- TS2322: Type 'number | null | undefined' is not assignable to type 'number'.
            const value: number = optional(unsafeNumber(0)).value;

            expect(value).toBe(0);
        });
    });

    describe('onto', () => {
        it('is a left-identity for Nullable.onto() as the "bind" operator', () => {
            // Left-identity: unit(a) >>= \x -> f(x) <=> f(a)
            expect(optional(unsafeNumber(0)).onto(optionalDecimal))
                .toStrictEqual(optionalDecimal(0));
            expect(none<number>().onto(optionalDecimal))
                .toStrictEqual(optionalDecimal(undefined));
        });

        it('is a right-identity for Nullable.onto() as the "bind" operator', () => {
            // Right-identity: ma >>= x -> unit(x) <=> ma
            expect(optionalDecimalOutput(0).onto(optional))
                .toStrictEqual(optionalDecimal(0));
            expect(none().onto(optional))
                .toStrictEqual(optionalDecimal(undefined));
        });

        it('has essentially associative Nullable.onto() as the "bind" operator', () => {
            // Associativity: ma >>= \x -> (f(x) >>= \y -> g(y)) <=> (ma >>= \x -> f(x) >>= \y -> g(y)
            expect(optional(unsafeNumber(0)).onto(x => optionalDecimalOutput(x).onto(optionalSplit)))
                .toStrictEqual(optional(unsafeNumber(0)).onto(optionalDecimalOutput).onto(optionalSplit));
            expect(none<number>().onto(x => optionalDecimalOutput(x).onto(optionalSplit)))
                .toStrictEqual(none<number>().onto(optionalDecimalOutput).onto(optionalSplit));
        });

        describe('when the "flatMap" function returns Optional', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(unsafeNumber(0)).onto(optionalDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional<string>' is not assignable to type 'Some<string>'.
                const output: Some<string> = optional(unsafeNumber(0)).onto(optionalDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional<string>' is not assignable to type 'None<string>'.
                const output: None<string> = optional(unsafeNumber(0)).onto(optionalDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });
        });

        describe('when the "flatMap" function returns Some', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(unsafeNumber(0)).onto(someDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string> = optional(unsafeNumber(0)).onto(someDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string> = optional(unsafeNumber(0)).onto(someDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });
        });

        describe('when the "flatMap" function returns None', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(unsafeNumber(0)).onto(noneDecimalOutput);

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string> = optional(unsafeNumber(0)).onto(noneDecimalOutput);

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string> = optional(unsafeNumber(0)).onto(noneDecimalOutput);

                expect(output).toBe(none());
            });
        });
    });

    describe('to', () => {
        describe('to() is the "fmap" operator for the Optional type and satisfies functor laws', () => {
            // Functors must preserve identity morphisms:
            //  fmap id = id
            it('preserves identity morphisms', () => {
                expect(optional(unsafeNumber(0)).to(identity)).toStrictEqual(optional(unsafeNumber(0)));
                expect(optional(null).to(identity)).toStrictEqual(optional(null));
                expect(optional(undefined).to(identity)).toStrictEqual(optional(undefined));
            });

            // Functors preserve composition of morphisms:
            //  fmap (f . g)  ==  fmap f . fmap g
            it('preserved composition of morphisms', () => {
                expect(optional(unsafeNumber(0)).to<string>(nullableDecimal).to(split('.')))
                    .toStrictEqual(optional(unsafeNumber(0)).to(splitNullableDecimal));
                expect(optional(null).to<string>(nullableDecimal).to(split('.')))
                    .toStrictEqual(optional(null).to(splitNullableDecimal));
                expect(none<number>().to<string>(nullableDecimal).to(split('.')))
                    .toStrictEqual(none<number>().to(splitNullableDecimal));
            });
        });

        describe('when the "map" function may return a present or absent value', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string | null> = optional(unsafeNumber(0)).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string | null> = optional(unsafeNumber(0)).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string | null> = optional(unsafeNumber(0)).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });
        });

        describe('when the "map" function returns a present value', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(unsafeNumber(0)).to(safeDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string> = optional(unsafeNumber(0)).to(safeDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string> = optional(unsafeNumber(0)).to(safeDecimalOutput);

                expect(output).toStrictEqual(some('0'));
            });
        });

        describe('when the "map" function returns null', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string | null> = optional(unsafeNumber(0)).to(constant<string | null>(null));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Optional<string | null>' is not assignable to type 'Some<string | null>'.
                const output: Some<string | null> = optional(unsafeNumber(0)).to(constant<string | null>(null));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string | null> = optional(unsafeNumber(0)).to(constant<number | null>(null));

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(unsafeNumber(0)).to(constant<string | undefined>(undefined));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string> = optional(unsafeNumber(0)).to(constant<string | undefined>(undefined));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string> = optional(unsafeNumber(0)).to(constant<string | undefined>(undefined));

                expect(output).toBe(none());
            });
        });
    });

    describe('into', () => {
        it('does not accept a "fold" function with a non-optional value argument', () => {
            // @ts-expect-error -- TS2345:
            // Argument of type '(input: number) => string'
            // is not assignable to
            // parameter of type '(value: number | null | undefined) => string'.
            const output: string = optional(unsafeNumber(0)).into(strictDecimalOutput);

            expect(output).toBe('0');
        });

        it('returns the result of the given "fold" function applied to the value of Optional', () => {
            expect(optional(unsafeNumber(0)).into(safeDecimalOutput)).toBe('0');
            expect(optional(unsafeNumber(undefined)).into(safeDecimalOutput)).toBe('undefined');
        });

        it('can be used to return Optional', () => {
            const output: Optional<string | null> = optional(unsafeNumber(0))
                .into(optionalOf(unsafeDecimalOutput));

            expect(output).toStrictEqual(some('0'));
        });
    });

    describe('pick', () => {
        describe('when the property is required', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = optional(fallbackOptional(typeGuardCheck)).pick('required');

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional(fallbackOptional(typeGuardCheck)).pick('required');

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional(fallbackOptional(typeGuardCheck)).pick('required');

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the property can be absent', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = optional(fallbackOptional(typeGuardCheck)).pick('option');

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional(fallbackOptional(typeGuardCheck)).pick('option');

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional(fallbackOptional(typeGuardCheck)).pick('option');

                expect(output).toBe(none());
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional(unsafeNumber(0)).that(isNotNull);

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number | null> = optional(unsafeNumber(0)).that(isNotNull);

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number | null> = optional(unsafeNumber(0)).that(isNotNull);

                expect(output).toStrictEqual(some(0));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional(unsafeNumber(0)).that(isNull);

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number | null> = optional(unsafeNumber(0)).that(isNull);

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number | null> = optional(unsafeNumber(0)).that(isNull);

                expect(output).toBe(none());
            });
        });
    });

    describe('which', () => {
        describe('when the "filter" type guard is true', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional('').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(some(''));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Optional<ObjectWithPresent<string, "length">>' is not assignable to type 'Some<string>'.
                const output: Some<string> = optional('').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(some(''));
            });

            it('cannot be assign to None', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Optional<ObjectWithPresent<string, "length">>' is not assignable to type 'None<string>'.
                const output: None<string> = optional('').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(some(''));
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<ObjectWithAbsent<string, 'length'>> = optional<string>('3.14')
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Optional<ObjectWithAbsent<string, "length">>'
                //  is not assignable to type 'Some<ObjectWithAbsent<string, "length">>'.
                const output: Some<ObjectWithAbsent<string, 'length'>> = optional<string>('3.14')
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(none());
            });

            it('cannot be assign to None', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Optional<ObjectWithAbsent<string, "length">>'
                //  is not assignable to type 'None<ObjectWithAbsent<string, "length">>'.
                const output: None<ObjectWithAbsent<string, 'length'>> = optional<string>('3.14')
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(none());
            });
        });
    });

    describe('when', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional(unsafeNumber(0)).when(constant(true));

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number | null> = optional(unsafeNumber(0)).when(constant(true));

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number | null> = optional(unsafeNumber(0)).when(constant(true));

                expect(output).toStrictEqual(some(0));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional(unsafeNumber(0)).when(constant(false));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number | null> = optional(unsafeNumber(0)).when(constant(false));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number | null> = optional(unsafeNumber(0)).when(constant(false));

                expect(output).toBe(none());
            });
        });
    });

    describe('otherwise', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number | null> = optional(unsafeNumber(undefined)).otherwise(0);

                expect(output).toStrictEqual(some(0));
            });

            it('returns Some value', () => {
                const output: Some<number | null> = optional(unsafeNumber(undefined)).otherwise(0);

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some<number>' is not assignable to type 'None<number>'.
                const output: None<number | null> = optional(unsafeNumber(undefined)).otherwise(0);

                expect(output).toStrictEqual(some(0));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number | null> = optional(unsafeNumber(undefined)).otherwise(constant(0));

                expect(output).toStrictEqual(some(0));
            });

            it('returns Some value', () => {
                const output: Some<number | null> = optional(unsafeNumber(undefined)).otherwise(constant(0));

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
                const output: None<number | null> = optional(unsafeNumber(undefined)).otherwise(constant(0));

                expect(output).toStrictEqual(some(0));
            });
        });

        describe('when the "fallback" is null', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional(unsafeNumber(0)).otherwise(null);

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to Some', () => {
                const output: Some<number | null> = optional(unsafeNumber(0)).otherwise(null);

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Some<number | null>' is not assignable to type 'None<number | null>'.
                const output: None<number | null> = optional(unsafeNumber(0)).otherwise(null);

                expect(output).toStrictEqual(some(0));
            });
        });

        describe('when the "fallback" returns null', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional(unsafeNumber(0)).otherwise(constant(null));

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to Some', () => {
                const output: Some<number | null> = optional(unsafeNumber(0)).otherwise(constant(null));

                expect(output).toStrictEqual(some(0));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Some<number | null>' is not assignable to type 'None<number | null>'.
                const output: None<number | null> = optional(unsafeNumber(0)).otherwise(constant(null));

                expect(output).toStrictEqual(some(0));
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional(unsafeNumber(null)).otherwise(undefined);

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional(unsafeNumber(null)).otherwise(undefined);

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional(unsafeNumber(null)).otherwise(undefined);

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional(unsafeNumber(null)).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional(unsafeNumber(null)).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional(unsafeNumber(null)).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(null));
            });
        });
    });

    describe('or', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to the value type when the original value is present', () => {
                const output: number | null = optional(unsafeNumber(0)).or(1);

                expect(output).toBe(0);
            });

            it('can be assigned to the value type when the original value is null', () => {
                const output: number | null = optional(unsafeNumber(0)).or(1);

                expect(output).toBe(0);
            });

            it('can be assigned to the value type when the original value is undefined', () => {
                const output: number | null = optional(unsafeNumber(0)).or(1);

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null' is not assignable to type 'number'.
                const output: number = optional(unsafeNumber(null)).or(constant(1));

                expect(output).toBeNull();
            });

            it('can be assigned to the nullable value type', () => {
                const output: number | null = optional(unsafeNumber(null)).or(constant(1));

                expect(output).toBeNull();
            });
        });

        describe('when the "fallback" may be undefined', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null | undefined' is not assignable to type 'number'.
                const output: number = optional(unsafeNumber(0)).or(unsafeNumber(1));

                expect(output).toBe(0);
            });

            it('cannot be assigned to the nullable value type', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | null'.
                const output: number | null = optional(unsafeNumber(0)).or(unsafeNumber(1));

                expect(output).toBe(0);
            });

            it('must be assigned to the nullable and optional value type', () => {
                const output: number | null | undefined = optional(unsafeNumber(0)).or(unsafeNumber(1));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = optional(unsafeNumber(null)).or(undefined);

                expect(output).toBeNull();
            });

            it('cannot be assigned to the nullable value type', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | null'.
                const output: number | null = optional(unsafeNumber(null)).or(undefined);

                expect(output).toBeNull();
            });

            it('must be assigned to the nullable and optional value type', () => {
                const output: number | null | undefined = optional(unsafeNumber(null)).or(undefined);

                expect(output).toBeNull();
            });

            it('cannot be assigned to the undefined type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null | undefined' is not assignable to type 'undefined'.
                const output: undefined = optional(unsafeNumber(null)).or(undefined);

                expect(output).toBeNull();
            });
        });
    });

    describe('run', () => {
        let value: number;

        // eslint-disable-next-line func-style -- conflicts with prefer-arrow
        const assignValue = (update: number): Nullary<void> => (): void => {
            value = update;
        };

        beforeEach(() => {
            value = 0;
        });

        it('must be assigned to Optional', () => {
            const output: Optional<number | null> = optional(unsafeNumber(0)).run(assignValue(1));

            expect(output).toStrictEqual(some(0));
            expect(value).toBe(1);
        });

        it('cannot be assign to Some', () => {
            // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
            const output: Some<number> = optional(unsafeNumber(0)).run(assignValue(1));

            expect(output).toStrictEqual(some(0));
        });

        it('cannot be assigned to None', () => {
            // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
            const output: None<number> = optional(unsafeNumber(0)).run(assignValue(1));

            expect(output).toStrictEqual(some(0));
        });
    });

    /* eslint-disable deprecation/deprecation -- to be removed in v0.10.0 */
    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '(input: number) => string'
            //  is not assignable to
            //  parameter of type '(value: number | null | undefined) => string | undefined'.
            expect(optional(unsafeNumber(0)).lift(strictDecimalOutput))
                .toStrictEqual(some('0'));
        });

        it('must be assigned to Optional', () => {
            const output: Optional<string | null> = optional(unsafeNumber(0)).lift(unsafeDecimalOutput);

            expect(output).toStrictEqual(some('0'));
        });

        it('cannot be assigned to Some', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Optional<string | null>' is not assignable to type 'Some<string | null>'.
            const output: Some<string | null> = optional(unsafeNumber(0)).lift(unsafeDecimalOutput);

            expect(output).toStrictEqual(some('0'));
        });

        it('cannot be assigned to None', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Optional<string | null>' is not assignable to type 'None<string | null>'.
            const output: None<string | null> = optional(unsafeNumber(0)).lift(unsafeDecimalOutput);

            expect(output).toStrictEqual(some('0'));
        });
    });
    /* eslint-enable deprecation/deprecation */
});
