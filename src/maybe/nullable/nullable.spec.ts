import { constant, Void } from '../../function/function/nullary';
import { same } from '../../function/function/unary';
import { decimal } from '../../number/number/base';
import { hasAbsentProperty, hasPresentProperty, ObjectWithAbsent } from '../../object/property/property';
import { split } from '../../string/string/lift';
import { isDefined, isPresent, isUndefined } from '../../value/value';
import {
    safeDecimalOutput,
    strictDecimalOutput,
    unsafe,
    unsafeDecimalOutput,
    unsafeNumber,
} from '../maybe/maybe.mock';
import { typeGuardCheck } from '../maybe/type-guard-check.mock';

import { Nil, nil, Nullable, nullable, Only, only } from './nullable';
import { fallbackNullable, nilDecimalOutput, nullableDecimalOutput, onlyDecimalOutput } from './nullable.mock';

/* eslint-disable deprecation/deprecation -- TODO: Remove in v0.10.0 */

function nullableDecimal(value: number | null | undefined): Nullable<string> {
    return nullable<number | undefined>(value).to<string>(safeDecimalOutput);
}

function nullableSplit(value: string | null): Nullable<string[]> {
    return nullable(value).to(v => v.split('.'));
}

function undefinedDecimal(value: number | undefined): string {
    if (isPresent(value)) {
        return decimal(value);
    }
    return '';
}

function splitUndefinedDecimal(value: number | undefined): string[] {
    return split('.')(undefinedDecimal(value));
}

describe(nullable, () => {
    describe('when the value may be present or null', () => {
        it('must be assigned to Nullable', () => {
            const output: Nullable<number | undefined> = nullable<number | undefined>(unsafeNumber(0));

            expect(output).toStrictEqual(only(0));
        });
    });

    describe('when the value is present', () => {
        it('equals Only() when value is present', () => {
            expect(nullable(unsafeNumber(0)))
                .toStrictEqual(only(0));
        });

        it('cannot be assigned to Only', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<number>' is not assignable to type 'Only<number>'.
            const output: Only<number | undefined> = nullable(unsafeNumber(0));

            expect(output).toStrictEqual(only(0));
        });
    });

    describe('when the value is null', () => {
        it('equals nil() when value is null', () => {
            expect(nullable<number | undefined>(unsafeNumber(null)))
                .toStrictEqual(nil());
        });

        it('cannot be assigned to Nil', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<null>' is not assignable to type 'Nil<number>'.
            const output: Nil<number | undefined> = nullable(unsafeNumber(null));

            expect(output).toBe(nil());
        });
    });
});

describe(Nullable, () => {
    describe('value', () => {
        it('is a nullable property and cannot be assigned to the value type', () => {
            // @ts-expect-error -- TS2322: Type 'number | null | undefined' is not assignable to type 'number'.
            const value: number = nullable<number | undefined>(unsafeNumber(0)).value;

            expect(value).toBe(0);
        });
    });

    describe('onto', () => {
        it('is a left-identity for Nullable.onto() as the "bind" operator', () => {
            // Left-identity: unit(a) >>= \x -> f(x) <=> f(a)
            expect(nullable<number | undefined>(unsafeNumber(0)).onto(nullableDecimal))
                .toStrictEqual(nullableDecimal(0));
            expect(nullable<number | undefined>(unsafeNumber(null)).onto(nullableDecimal))
                .toStrictEqual(nullableDecimal(null));
        });

        it('is a right-identity for Nullable.onto() as the "bind" operator', () => {
            // Right-identity: ma >>= x -> unit(x) <=> ma
            expect(nullableDecimal(3.14).onto(nullable))
                .toStrictEqual(nullableDecimal(3.14));
            expect(nil<number>().onto(nullable))
                .toStrictEqual(nullableDecimal(null));
        });

        it('has essentially associative Nullable.onto() as the "bind" operator', () => {
            // Associativity: ma >>= \x -> (f(x) >>= \y -> g(y)) <=> (ma >>= \x -> f(x) >>= \y -> g(y)
            expect(nullable(unsafeNumber(0)).onto(x => nullableDecimal(x).onto(nullableSplit)))
                .toStrictEqual(nullable(unsafeNumber(0)).onto(nullableDecimal).onto(nullableSplit));
            expect(nil<number>().onto(x => nullableDecimal(x).onto(nullableSplit)))
                .toStrictEqual(nil<number>().onto(nullableDecimal).onto(nullableSplit));
        });

        describe('when the "flatMap" function returns Nullable', () => {
            it('must assigned to Nullable', () => {
                const output: Nullable<string> = nullable(unsafeNumber(0)).onto(nullableDecimalOutput);

                expect(output).toStrictEqual(only('0'));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable<string>' is not assignable to type 'Only<string>'.
                const output: Only<string> = nullable(unsafeNumber(0)).onto(nullableDecimalOutput);

                expect(output).toStrictEqual(only('0'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable<string>' is not assignable to type 'Nil<string>'.
                const output: Nil<string> = nullable(unsafeNumber(0)).onto(nullableDecimalOutput);

                expect(output).toStrictEqual(only('0'));
            });
        });

        describe('when the "flatMap" function returns Only', () => {
            it('must assigned to Nullable', () => {
                const output: Nullable<string> = nullable(unsafeNumber(undefined)).onto(onlyDecimalOutput);

                expect(output).toStrictEqual(only('undefined'));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<string> = nullable(unsafeNumber(undefined)).onto(onlyDecimalOutput);

                expect(output).toStrictEqual(only('undefined'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(unsafeNumber(undefined)).onto(onlyDecimalOutput);

                expect(output).toStrictEqual(only('undefined'));
            });
        });

        describe('when the "flatMap" function returns Nil', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string> = nullable(unsafeNumber(0)).onto(nilDecimalOutput);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<string> = nullable(unsafeNumber(0)).onto(nilDecimalOutput);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(unsafeNumber(0)).onto(nilDecimalOutput);

                expect(output).toBe(nil());
            });
        });
    });

    describe('to', () => {
        describe('to() is the "fmap" operator for the Nullable type and satisfies functor laws', () => {
            // Functors must preserve identity morphisms:
            //  fmap id = id
            it('preserves identity morphisms', () => {
                expect(nullable(unsafeNumber(0)).to(same)).toStrictEqual(nullable(unsafeNumber(0)));
                expect(nullable(unsafeNumber(null)).to(same)).toStrictEqual(nullable(unsafeNumber(null)));
                expect(nullable(undefined).to(same)).toStrictEqual(nullable(undefined));
            });

            // Functors preserve composition of morphisms:
            //  fmap (f . g)  ==  fmap f . fmap g
            it('preserved composition of morphisms', () => {
                expect(nullable(unsafeNumber(0)).to<string>(undefinedDecimal).to(split('.')))
                    .toStrictEqual(nullable(unsafeNumber(0)).to(splitUndefinedDecimal));
                expect(nullable(undefined).to<string>(undefinedDecimal).to(split('.')))
                    .toStrictEqual(nullable(undefined).to(splitUndefinedDecimal));
                expect(nil<number>().to<string>(undefinedDecimal).to(split('.')))
                    .toStrictEqual(nil<number>().to(splitUndefinedDecimal));
            });
        });

        describe('when the "map" function returns a present value', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string> = nullable(unsafeNumber(0)).to(safeDecimalOutput);

                expect(output).toStrictEqual(only('0'));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<string> = nullable(unsafeNumber(0)).to(safeDecimalOutput);

                expect(output).toStrictEqual(only('0'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(unsafeNumber(0)).to(safeDecimalOutput);

                expect(output).toStrictEqual(only('0'));
            });
        });

        describe('when the "map" function may return a present or absent value', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string | undefined> = nullable(unsafeNumber(0)).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(only('0'));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<string | undefined> = nullable(unsafeNumber(0)).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(only('0'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(unsafeNumber(0)).to(unsafeDecimalOutput);

                expect(output).toStrictEqual(only('0'));
            });
        });

        describe('when the "map" function returns null', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string> = nullable(unsafeNumber(0)).to<string>(constant(null));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<string> = nullable(unsafeNumber(0)).to<string>(constant(null));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(unsafeNumber(0)).to<string>(constant(null));

                expect(output).toBe(nil());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string | undefined> = nullable(unsafeNumber(0))
                    .to<string | undefined>(constant(undefined));

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<number | undefined>' is not assignable to type 'Only<number | undefined>'.
                const output: Only<number | undefined> = nullable(unsafeNumber(0))
                    .to<number | undefined>(constant(undefined));

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error --TS2322:
                //  Type 'Nullable<number | undefined>' is not assignable to type 'Nil<number | undefined>'.
                const output: Nil<number | undefined> = nullable(unsafeNumber(0))
                    .to<number | undefined>(constant(undefined));

                expect(output).toStrictEqual(only(undefined));
            });
        });
    });

    describe('pick', () => {
        describe('when the property is required', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = nullable(fallbackNullable(typeGuardCheck)).pick('required');

                expect(output).toStrictEqual(only(3.14));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<number> = nullable(fallbackNullable(typeGuardCheck)).pick('required');

                expect(output).toStrictEqual(only(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable(fallbackNullable(typeGuardCheck)).pick('required');

                expect(output).toStrictEqual(only(3.14));
            });
        });

        describe('when the property can be absent', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable(fallbackNullable(typeGuardCheck)).pick('option');

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<number | undefined>' is not assignable to type 'Only<number>'.
                const output: Only<number> = nullable(fallbackNullable(typeGuardCheck)).pick('option');

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<number | undefined>' is not assignable to type 'Nil<number>'.
                const output: Nil<number> = nullable(fallbackNullable(typeGuardCheck)).pick('option');

                expect(output).toStrictEqual(only(undefined));
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable(unsafeNumber(0)).that(isDefined);

                expect(output).toStrictEqual(only(0));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<number | undefined> = nullable(unsafeNumber(0)).that(isDefined);

                expect(output).toStrictEqual(only(0));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number | undefined> = nullable(unsafeNumber(0)).that(isDefined);

                expect(output).toStrictEqual(only(0));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable(unsafeNumber(0)).that(isUndefined);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<number | undefined> = nullable(unsafeNumber(0)).that(isUndefined);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number | undefined> = nullable(unsafeNumber(0)).that(isUndefined);

                expect(output).toBe(nil());
            });
        });
    });

    describe('which', () => {
        describe('when the "filter" type guard is true', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string> = nullable<string>('').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(only(''));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithPresent<string, "length">>' is not assignable to type 'Only<string>'.
                const output: Only<string> = nullable<string>('').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(only(''));
            });

            it('cannot be assign to Nil', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithPresent<string, "length">>' is not assignable to type 'Nil<string>'.
                const output: Nil<string> = nullable<string>('').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(only(''));
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<ObjectWithAbsent<string, 'length'>> = nullable<string>('')
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithAbsent<string, "length">>'
                //  is not assignable to type 'Only<ObjectWithAbsent<string, "length">>'.
                const output: Only<ObjectWithAbsent<string, 'length'>> = nullable<string>('')
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(nil());
            });

            it('cannot be assign to Nil', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithAbsent<string, "length">>'
                //  is not assignable to type 'Nil<ObjectWithAbsent<string, "length">>'.
                const output: Nil<ObjectWithAbsent<string, 'length'>> = nullable<string>('')
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(nil());
            });
        });
    });

    describe('when', () => {
        describe('when the "condition" is true', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable(unsafeNumber(0)).when(constant(true));

                expect(output).toStrictEqual(only(0));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<number | undefined> = nullable(unsafeNumber(0)).when(constant(true));

                expect(output).toStrictEqual(only(0));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number | undefined> = nullable(unsafeNumber(0)).when(constant(true));

                expect(output).toStrictEqual(only(0));
            });
        });

        describe('when the "condition" is false', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable(unsafeNumber(0)).when(constant(false));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<number | undefined> = nullable(unsafeNumber(0)).when(constant(false));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number | undefined> = nullable(unsafeNumber(0)).when(constant(false));

                expect(output).toBe(nil());
            });
        });
    });

    describe('otherwise', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable(unsafeNumber(undefined)).otherwise(1);

                expect(output).toStrictEqual(only(undefined));
            });

            it('returns Only value', () => {
                const output: Only<number | undefined> = nullable(unsafeNumber(undefined)).otherwise(1);

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Only<number | undefined>' is not assignable to type 'Nil<number | undefined>'.
                const output: Nil<number | undefined> = nullable(unsafeNumber(undefined)).otherwise(1);

                expect(output).toStrictEqual(only(undefined));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable(unsafeNumber(undefined)).otherwise(constant(0));

                expect(output).toStrictEqual(only(undefined));
            });

            it('returns Only value', () => {
                const output: Only<number | undefined> = nullable(unsafeNumber(undefined)).otherwise(constant(0));

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Only' is not assignable to type 'Nil'.
                const output: Nil<number | undefined> = nullable(unsafeNumber(undefined)).otherwise(constant(0));

                expect(output).toStrictEqual(only(undefined));
            });
        });

        describe('when the "fallback" is null', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable(unsafeNumber(undefined)).otherwise(null);

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<number | undefined> = nullable(unsafeNumber(undefined)).otherwise(null);

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number | undefined> = nullable(unsafeNumber(undefined)).otherwise(null);

                expect(output).toStrictEqual(only(undefined));
            });
        });

        describe('when the "fallback" returns null', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable(unsafeNumber(undefined))
                    .otherwise(constant(null));

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<number | undefined> = nullable(unsafeNumber(undefined)).otherwise(constant(null));

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number | undefined> = nullable(unsafeNumber(undefined)).otherwise(constant(null));

                expect(output).toStrictEqual(only(undefined));
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable<number | undefined>(null).otherwise(undefined);

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Only', () => {
                const output: Only<number | undefined> = nullable<number | undefined>(null).otherwise(undefined);

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Only<number | undefined>' is not assignable to type 'Nil<number | undefined>'.
                const output: Nil<number | undefined> = nullable<number | undefined>(null).otherwise(undefined);

                expect(output).toStrictEqual(only(undefined));
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable<number | undefined>(null)
                    .otherwise(constant(undefined));

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Only', () => {
                const output: Only<number | undefined> = nullable<number | undefined>(null)
                    .otherwise(constant(undefined));

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error --TS2322:
                //  Type 'Only<number | undefined>' is not assignable to type 'Nil<number | undefined>'.
                const output: Nil<number | undefined> = nullable<number | undefined>(null)
                    .otherwise(constant(undefined));

                expect(output).toStrictEqual(only(undefined));
            });
        });
    });

    describe('or', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to the value type', () => {
                const output: number | undefined = nullable(unsafeNumber(null)).or(undefined);

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to the value type', () => {
                const output: number | undefined = nullable(unsafeNumber(null)).or(constant(0));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" may be null', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | undefined | null' is not assignable to type 'number | undefined'.
                const output: number | undefined = nullable(unsafeNumber(null)).or(unsafeNumber(0));

                expect(output).toBe(0);
            });

            it('must be assigned to the nullable value type', () => {
                const output: number | null | undefined = nullable(unsafeNumber(null)).or(fallbackNullable(0));

                expect(output).toBe(0);
            });
        });

        describe('when the "fallback" is null', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | undefined'.
                const output: number | undefined = nullable(unsafeNumber(0)).or(null);

                expect(output).toBe(0);
            });

            it('cannot be assigned to null type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null | undefined' is not assignable to type 'null'.
                const output: null = nullable(unsafeNumber(0)).or(null);

                expect(output).toBe(0);
            });

            it('must be assigned to the nullable value type', () => {
                const output: number | null | undefined = nullable(unsafeNumber(0)).or(null);

                expect(output).toBe(0);
            });
        });
    });

    describe('run', () => {
        let value: number;

        function assignValue(update: number): Void {
            return (): void => {
                value = update;
            };
        }

        beforeEach(() => {
            value = 0;
        });

        it('must be assigned to Nullable', () => {
            const output: Nullable<number | undefined> = nullable(unsafeNumber(value)).run(assignValue(1));

            expect(output).toStrictEqual(only(0));
        });

        it('cannot be assigned to Only', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
            const output: Only<number | undefined> = nullable(unsafeNumber(value)).run(assignValue(1));

            expect(output).toStrictEqual(only(0));
        });

        it('cannot be assigned to Nil', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<number>' is not assignable to type 'Nil<number>'.
            const output: Nil<number | undefined> = nullable(unsafeNumber(value)).run(assignValue(1));

            expect(output).toStrictEqual(only(0));
        });
    });

    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '(input: number) => string'
            //  is not assignable to
            //  parameter of type '(value: number | null | undefined) => string | null'.
            expect(nullable(unsafe(0)).lift(strictDecimalOutput))
                .toStrictEqual(only('0'));
        });

        it('must be assigned to Nullable', () => {
            const output: Nullable<string | undefined> = nullable(unsafeNumber(0)).lift(unsafeDecimalOutput);

            expect(output).toStrictEqual(only('0'));
        });

        it('cannot be assigned to Only', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Nullable<string | undefined>' is not assignable to type 'Only<string | undefined>'.
            const output: Only<string | undefined> = nullable(unsafeNumber(0)).lift(unsafeDecimalOutput);

            expect(output).toStrictEqual(only('0'));
        });

        it('cannot be assigned to Nil', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Nullable<string | undefined>' is not assignable to type 'Nil<string | undefined>'.
            const output: Nil<string | undefined> = nullable(unsafeNumber(0)).lift(unsafeDecimalOutput);

            expect(output).toStrictEqual(only('0'));
        });
    });
});

/* eslint-enable deprecation/deprecation */
