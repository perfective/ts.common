import { constant, Nullary } from '../../function/function/nullary';
import { decimal } from '../../number/number/base';
import { isGreaterThan, isLessThan } from '../../number/number/order';
import { hasAbsentProperty, hasPresentProperty, ObjectWithAbsent } from '../../object/property/property';
import { split } from '../../string/string/lift';
import { output as stringOutput } from '../../string/string/output';
import { isPresent } from '../../value/value';
import { typeGuardCheck } from '../maybe/type-guard-check.mock';

import { Nil, nil, Nullable, nullable, Only, only } from './nullable';
import { fallbackNullable } from './nullable.mock';

function nullableDecimal(value: number | null): Nullable<string> {
    return nullable(value).to<string>(decimal);
}

function nullableSplit(value: string | null): Nullable<string[]> {
    return nullable(value).to(v => v.split('.'));
}

function identity<T>(value: T): T {
    return value;
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
            const output: Nullable<number> = nullable(fallbackNullable(0));

            expect(output).toStrictEqual(only(0));
        });
    });

    describe('when the value is present', () => {
        it('equals Only() when value is present', () => {
            expect(nullable(fallbackNullable(3.14)))
                .toStrictEqual(only(3.14));
        });

        it('cannot be assigned to Only', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<number>' is not assignable to type 'Only<number>'.
            const output: Only<number> = nullable(fallbackNullable(0));

            expect(output).toStrictEqual(only(0));
        });
    });

    describe('when the value is null', () => {
        it('equals nil() when value is null', () => {
            expect(nullable<number>(fallbackNullable(null)))
                .toStrictEqual(nil());
        });

        it('cannot be assigned to Nil', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<null>' is not assignable to type 'Nil<number>'.
            const output: Nil<number> = nullable(fallbackNullable<number>(null));

            expect(output).toBe(nil());
        });
    });
});

describe(Nullable, () => {
    describe('value', () => {
        it('is a nullable property and cannot be assigned to the value type', () => {
            // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
            const value: number = nullable<number>(fallbackNullable(3.14)).value;

            expect(value).toBe(3.14);
        });
    });

    describe('onto', () => {
        it('is a left-identity for Nullable.onto() as the "bind" operator', () => {
            // Left-identity: unit(a) >>= \x -> f(x) <=> f(a)
            expect(nullable(fallbackNullable(3.14)).onto(nullableDecimal))
                .toStrictEqual(nullableDecimal(3.14));
            expect(nil<number>().onto(nullableDecimal))
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
            expect(nullable(fallbackNullable(3.14)).onto(x => nullableDecimal(x).onto(nullableSplit)))
                .toStrictEqual(nullable(fallbackNullable(3.14)).onto(nullableDecimal).onto(nullableSplit));
            expect(nil<number>().onto(x => nullableDecimal(x).onto(nullableSplit)))
                .toStrictEqual(nil<number>().onto(nullableDecimal).onto(nullableSplit));
        });

        describe('when the "flatMap" function returns Nullable', () => {
            it('must assigned to Nullable', () => {
                const output: Nullable<string> = nullable(fallbackNullable(3.14))
                    .onto(constant(nullable(fallbackNullable('3.14'))));

                expect(output).toStrictEqual(nullable(fallbackNullable('3.14')));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable<string>' is not assignable to type 'Only<string>'.
                const output: Only<string> = nullable(fallbackNullable(3.14))
                    .onto(constant(nullable(fallbackNullable('3.14'))));

                expect(output).toStrictEqual(nullable(fallbackNullable('3.14')));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable<string>' is not assignable to type 'Nil<string>'.
                const output: Nil<string> = nullable(fallbackNullable(3.14))
                    .onto(constant(nullable(fallbackNullable('3.14'))));

                expect(output).toStrictEqual(nullable(fallbackNullable('3.14')));
            });
        });

        describe('when the "flatMap" function returns Only', () => {
            it('must assigned to Nullable', () => {
                const output: Nullable<string> = nullable(fallbackNullable(3.14)).onto(constant(only('3.14')));

                expect(output).toStrictEqual(only('3.14'));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<string> = nullable(fallbackNullable(3.14)).onto(constant(only('3.14')));

                expect(output).toStrictEqual(only('3.14'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(fallbackNullable(3.14)).onto(constant(only('3.14')));

                expect(output).toStrictEqual(only('3.14'));
            });
        });

        describe('when the "flatMap" function returns Nil', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string> = nullable(fallbackNullable(3.14)).onto(constant(nil<string>()));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<string> = nullable(fallbackNullable(3.14)).onto(constant(nil<string>()));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(fallbackNullable(3.14)).onto(constant(nil<string>()));

                expect(output).toBe(nil());
            });
        });
    });

    describe('to', () => {
        describe('to() is the "fmap" operator for the Nullable type and satisfies functor laws', () => {
            // Functors must preserve identity morphisms:
            //  fmap id = id
            it('preserves identity morphisms', () => {
                expect(nullable(fallbackNullable(3.14)).to(identity)).toStrictEqual(nullable(fallbackNullable(3.14)));
                expect(nullable(fallbackNullable(null)).to(identity)).toStrictEqual(nullable(fallbackNullable(null)));
                expect(nullable(undefined).to(identity)).toStrictEqual(nullable(undefined));
            });

            // Functors preserve composition of morphisms:
            //  fmap (f . g)  ==  fmap f . fmap g
            it('preserved composition of morphisms', () => {
                expect(nullable(fallbackNullable(3.14)).to<string>(undefinedDecimal).to(split('.')))
                    .toStrictEqual(nullable(fallbackNullable(3.14)).to(splitUndefinedDecimal));
                expect(nullable(undefined).to<string>(undefinedDecimal).to(split('.')))
                    .toStrictEqual(nullable(undefined).to(splitUndefinedDecimal));
                expect(nil<number>().to<string>(undefinedDecimal).to(split('.')))
                    .toStrictEqual(nil<number>().to(splitUndefinedDecimal));
            });
        });

        describe('when the "map" function returns a present value', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string> = nullable(fallbackNullable(3.14)).to(constant('3.14'));

                expect(output).toStrictEqual(only('3.14'));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<string> = nullable(fallbackNullable(3.14)).to(constant('3.14'));

                expect(output).toStrictEqual(only('3.14'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(fallbackNullable(3.14)).to(constant('3.14'));

                expect(output).toStrictEqual(only('3.14'));
            });
        });

        describe('when the "map" function may return a present or absent value', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string> = nullable(fallbackNullable(3.14))
                    .to(constant(fallbackNullable('3.14')));

                expect(output).toStrictEqual(only('3.14'));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<string> = nullable(fallbackNullable(3.14)).to(constant(fallbackNullable('3.14')));

                expect(output).toStrictEqual(only('3.14'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(fallbackNullable(3.14)).to(constant(fallbackNullable('3.14')));

                expect(output).toStrictEqual(only('3.14'));
            });
        });

        describe('when the "map" function returns null', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string> = nullable(fallbackNullable(3.14)).to<string>(constant(null));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<string> = nullable(fallbackNullable(3.14)).to<string>(constant(null));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(fallbackNullable(3.14)).to<string>(constant(null));

                expect(output).toBe(nil());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string | undefined> = nullable(fallbackNullable(3.14))
                    .to<string | undefined>(constant(undefined));

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<number | undefined>' is not assignable to type 'Only<number | undefined>'.
                const output: Only<number | undefined> = nullable(fallbackNullable(3.14))
                    .to<number | undefined>(constant(undefined));

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error --TS2322:
                //  Type 'Nullable<number | undefined>' is not assignable to type 'Nil<number | undefined>'.
                const output: Nil<number | undefined> = nullable(fallbackNullable(3.14))
                    .to<number | undefined>(constant(undefined));

                expect(output).toStrictEqual(only(undefined));
            });
        });
    });

    describe('into', () => {
        it('does not accept a "fold" function with a non-nullable value argument', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to parameter of type '(value: string | null) => number | null'.
            const output: number | null = nullable(fallbackNullable('3.14')).into(decimal);

            expect(output).toBe(3.14);
        });

        it('returns the result of the given "fold" function applied to the value of Nullable', () => {
            expect(nullable(fallbackNullable(3.14)).into(stringOutput)).toBe('3.14');
            expect(nullable(fallbackNullable(null)).into(stringOutput)).toBe('null');
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
                const output: Nullable<number> = nullable(fallbackNullable(3.14)).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(only(3.14));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<number> = nullable(fallbackNullable(3.14)).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(only(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable(fallbackNullable(3.14)).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(only(3.14));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = nullable(fallbackNullable(3.14)).that(isLessThan(2.71));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<number> = nullable(fallbackNullable(3.14)).that(isLessThan(2.71));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable(fallbackNullable(3.14)).that(isLessThan(2.71));

                expect(output).toBe(nil());
            });
        });
    });

    describe('which', () => {
        describe('when the "filter" type guard is true', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string> = nullable<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(only('3.14'));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithPresent<string, "length">>' is not assignable to type 'Only<string>'.
                const output: Only<string> = nullable<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(only('3.14'));
            });

            it('cannot be assign to Nil', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithPresent<string, "length">>' is not assignable to type 'Nil<string>'.
                const output: Nil<string> = nullable<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(only('3.14'));
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<ObjectWithAbsent<string, 'length'>> = nullable<string>('3.14')
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithAbsent<string, "length">>'
                //  is not assignable to type 'Only<ObjectWithAbsent<string, "length">>'.
                const output: Only<ObjectWithAbsent<string, 'length'>> = nullable<string>('3.14')
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(nil());
            });

            it('cannot be assign to Nil', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithAbsent<string, "length">>'
                //  is not assignable to type 'Nil<ObjectWithAbsent<string, "length">>'.
                const output: Nil<ObjectWithAbsent<string, 'length'>> = nullable<string>('3.14')
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(nil());
            });
        });
    });

    describe('when', () => {
        describe('when the "condition" is true', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = nullable(fallbackNullable(3.14)).when(constant(true));

                expect(output).toStrictEqual(only(3.14));
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<number> = nullable(fallbackNullable(3.14)).when(constant(true));

                expect(output).toStrictEqual(only(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable(fallbackNullable(3.14)).when(constant(true));

                expect(output).toStrictEqual(only(3.14));
            });
        });

        describe('when the "condition" is false', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = nullable(fallbackNullable(3.14)).when(constant(false));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<number> = nullable(fallbackNullable(3.14)).when(constant(false));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable(fallbackNullable(3.14)).when(constant(false));

                expect(output).toBe(nil());
            });
        });
    });

    describe('otherwise', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable<number | undefined>(fallbackNullable(undefined))
                    .otherwise(2.71);

                expect(output).toStrictEqual(only(undefined));
            });

            it('returns Only value', () => {
                const output: Only<number> = nullable<number>(3.14).otherwise(2.71);

                expect(output).toStrictEqual(only(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Only<number>' is not assignable to type 'Nil<number>'.
                const output: Nil<number> = nullable<number>(3.14).otherwise(2.71);

                expect(output).toStrictEqual(only(3.14));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable<number | undefined>(fallbackNullable(undefined))
                    .otherwise(constant(2.71));

                expect(output).toStrictEqual(only(undefined));
            });

            it('returns Only value', () => {
                const output: Only<number | undefined> = nullable<number | undefined>(fallbackNullable(undefined))
                    .otherwise(constant(2.71));

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Only' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable<number>(3.14).otherwise(constant(2.71));

                expect(output).toStrictEqual(only(3.14));
            });
        });

        describe('when the "fallback" is null', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = nullable<number>(fallbackNullable(null)).otherwise(null);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<number> = nullable(fallbackNullable(3.14)).otherwise(null);

                expect(output).toStrictEqual(only(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable<number | undefined>(fallbackNullable(undefined)).otherwise(null);

                expect(output).toStrictEqual(only(undefined));
            });
        });

        describe('when the "fallback" returns null', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = nullable<number>(fallbackNullable(null)).otherwise(constant(null));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Only', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
                const output: Only<number> = nullable(fallbackNullable(3.14)).otherwise(constant(null));

                expect(output).toStrictEqual(only(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable<number | undefined>(fallbackNullable(undefined))
                    .otherwise(constant(null));

                expect(output).toStrictEqual(only(undefined));
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable<number | undefined>(null).otherwise(undefined);

                expect(output).toStrictEqual(only(undefined));
            });

            it('cannot be assigned to Only', () => {
                const output: Only<number | undefined> = nullable<number | undefined>(3.14).otherwise(undefined);

                expect(output).toStrictEqual(only(3.14));
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
                const output: Only<number | undefined> = nullable<number | undefined>(3.14)
                    .otherwise(constant(undefined));

                expect(output).toStrictEqual(only(3.14));
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
            it('should be assigned to the value type', () => {
                const output: number = nullable(fallbackNullable(3.14)).or(2.71);

                expect(output).toBe(3.14);
            });

            it('can be assigned to the nullable value type', () => {
                const output: number | null = nullable<number>(fallbackNullable(null)).or(2.71);

                expect(output).toBe(2.71);
            });

            it('can be assigned to the optional value type', () => {
                const output: number | undefined = nullable<number | undefined>(fallbackNullable(undefined)).or(2.71);

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('should be assigned to the value type', () => {
                const output: number = nullable(fallbackNullable(3.14)).or(constant(2.71));

                expect(output).toBe(3.14);
            });

            it('can be assigned to the nullable value type', () => {
                const output: number = nullable<number>(fallbackNullable(null)).or(constant(2.71));

                expect(output).toBe(2.71);
            });

            it('can be assigned to the optional value type', () => {
                const output: number | undefined = nullable<number | undefined>(fallbackNullable(undefined))
                    .or(constant(2.71));

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" may be null', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
                const output: number = nullable(fallbackNullable(3.14)).or(fallbackNullable(2.71));

                expect(output).toBe(3.14);
            });

            it('must be assigned to the nullable value type', () => {
                const output: number | null = nullable<number>(fallbackNullable(null)).or(fallbackNullable(2.71));

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to the optional value type', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | undefined'.
                const output: number | undefined = nullable<number | undefined>(fallbackNullable(undefined))
                    .or(fallbackNullable(2.71));

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" is null', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
                const output: number = nullable(fallbackNullable(3.14)).or(null);

                expect(output).toBe(3.14);
            });

            it('cannot be assigned to null type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'null'.
                const output: null = nullable(fallbackNullable(3.14)).or(null);

                expect(output).toBe(3.14);
            });

            it('must be assigned to the nullable value type', () => {
                const output: number | null = nullable<number>(fallbackNullable(null)).or(null);

                expect(output).toBeNull();
            });

            it('cannot be assigned to the optional value type', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | undefined'.
                const output: number | undefined = nullable<number | undefined>(fallbackNullable(undefined)).or(null);

                expect(output).toBeUndefined();
            });
        });
    });

    describe('run', () => {
        let pi: number;

        // eslint-disable-next-line func-style -- conflicts with prefer-arrow
        const assignPi = (value: number): Nullary<void> => (): void => {
            pi = value;
        };

        beforeEach(() => {
            pi = 3.14;
        });

        it('must be assigned to Nullable', () => {
            const output: Nullable<number> = nullable(fallbackNullable(pi)).run(assignPi(3.1415));

            expect(output).toStrictEqual(only(3.14));
        });

        it('cannot be assigned to Only', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Only'.
            const output: Only<number> = nullable(fallbackNullable(pi)).run(assignPi(3.1415));

            expect(output).toStrictEqual(only(3.14));
        });

        it('cannot be assigned to Nil', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<number>' is not assignable to type 'Nil<number>'.
            const output: Nil<number> = nullable(fallbackNullable(pi)).run(assignPi(3.1415));

            expect(output).toStrictEqual(only(3.14));
        });
    });

    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to parameter of type '(value: string | null) => number | null'.
            expect(nullable(fallbackNullable('3.14')).lift(decimal))
                .toStrictEqual(only(3.14));
        });

        it('must be assigned to Nullable', () => {
            const output: Nullable<boolean> = nullable(fallbackNullable(3.14)).lift(isPresent);

            expect(output).toStrictEqual(only(true));
        });

        it('cannot be assigned to Only', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<number>' is not assignable to type 'Only<boolean>'.
            const output: Only<boolean> = nullable(fallbackNullable(3.14)).lift(constant(2.71));

            expect(output).toStrictEqual(only(2.71));
        });

        it('cannot be assigned to Nil', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<boolean>' is not assignable to type 'Nil<boolean>'.
            const output: Nil<boolean> = nullable(fallbackNullable(3.14)).lift<boolean>(constant(null));

            expect(output).toBe(nil());
        });
    });
});
