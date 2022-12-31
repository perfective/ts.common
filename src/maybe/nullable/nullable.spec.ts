import { constant, Nullary } from '../../function/function/nullary';
import { decimal } from '../../number/number/base';
import { isGreaterThan, isLessThan } from '../../number/number/order';
import { hasAbsentProperty, hasPresentProperty, ObjectWithAbsent } from '../../object/property/property';
import { split } from '../../string/string/lift';
import { isPresent } from '../../value/value';
import { typeGuardCheck } from '../maybe/type-guard-check.mock';

import { Nil, nil, Nullable, nullable, Solum, solum } from './nullable';
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
    describe('relations to three monad laws', () => {
        it('is a left-identity for Nullable.onto() as the "bind" operator', () => {
            // Left-identity: unit(a) >>= \x -> f(x) <=> f(a)
            expect(nullable(3.14).onto(nullableDecimal))
                .toStrictEqual(nullableDecimal(3.14));
            expect(nullable(null).onto(nullableDecimal))
                .toStrictEqual(nullableDecimal(null));
        });

        it('is a right-identity for Nullable.onto() as the "bind" operator', () => {
            // Right-identity: ma >>= x -> unit(x) <=> ma
            expect(nullableDecimal(3.14).onto(nullable))
                .toStrictEqual(nullableDecimal(3.14));
            expect(nullableDecimal(null).onto(nullable))
                .toStrictEqual(nullableDecimal(null));
        });

        it('has essentially associative Nullable.onto() as the "bind" operator', () => {
            // Associativity: ma >>= \x -> (f(x) >>= \y -> g(y)) <=> (ma >>= \x -> f(x) >>= \y -> g(y)
            expect(nullable(3.14).onto(x => nullableDecimal(x).onto(nullableSplit)))
                .toStrictEqual(nullable(3.14).onto(nullableDecimal).onto(nullableSplit));
            expect(nullable(null).onto(x => nullableDecimal(x).onto(nullableSplit)))
                .toStrictEqual(nullable(null).onto(nullableDecimal).onto(nullableSplit));
        });
    });

    describe('when the value may be present or null', () => {
        it('must be assigned to Nullable', () => {
            const output: Nullable<number> = nullable(fallbackNullable(0));

            expect(output).toStrictEqual(solum(0));
        });
    });

    describe('when the value is present', () => {
        it('equals solum() when value is present', () => {
            expect(nullable(3.14))
                .toStrictEqual(solum(3.14));
        });

        it('cannot be assigned to Solum', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<number>' is not assignable to type 'Solum<number>'.
            const output: Solum<number> = nullable(0);

            expect(output).toStrictEqual(solum(0));
        });
    });

    describe('when the value is null', () => {
        it('equals nil() when value is null', () => {
            expect(nullable<number>(null))
                .toStrictEqual(nil());
        });

        it('cannot be assigned to Nil', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<null>' is not assignable to type 'Nil<number>'.
            const output: Nil<number> = nullable(null);

            expect(output).toBe(nil());
        });
    });
});

describe(Nullable, () => {
    describe('value', () => {
        it('is a nullable property and cannot be assigned to the value type', () => {
            // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
            const value: number = nullable<number>(3.14).value;

            expect(value).toBe(3.14);
        });
    });

    describe('onto', () => {
        describe('when the "flatMap" function returns Nullable', () => {
            it('must assigned to Nullable', () => {
                const output: Nullable<string> = nullable(3.14).onto(constant(nullable('3.14')));

                expect(output).toStrictEqual(nullable('3.14'));
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable<string>' is not assignable to type 'Solum<string>'.
                const output: Solum<string> = nullable(3.14).onto(constant(nullable('3.14')));

                expect(output).toStrictEqual(nullable('3.14'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable<string>' is not assignable to type 'Nil<string>'.
                const output: Nil<string> = nullable(3.14).onto(constant(nullable('3.14')));

                expect(output).toStrictEqual(nullable('3.14'));
            });
        });

        describe('when the "flatMap" function returns Solum', () => {
            it('must assigned to Nullable', () => {
                const output: Nullable<string> = nullable(3.14).onto(constant(solum('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<string> = nullable(3.14).onto(constant(solum('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(3.14).onto(constant(solum('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });
        });

        describe('when the "flatMap" function returns Nil', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<string> = nullable(3.14).onto(constant(nil<string>()));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<string> = nullable(3.14).onto(constant(nil<string>()));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(3.14).onto(constant(nil<string>()));

                expect(output).toBe(nil());
            });
        });
    });

    describe('to', () => {
        describe('to() is the "fmap" operator for the Nullable type and satisfies functor laws', () => {
            // Functors must preserve identity morphisms:
            //  fmap id = id
            it('preserves identity morphisms', () => {
                expect(nullable(3.14).to(identity)).toStrictEqual(nullable(3.14));
                expect(nullable(null).to(identity)).toStrictEqual(nullable(null));
                expect(nullable(undefined).to(identity)).toStrictEqual(nullable(undefined));
            });

            // Functors preserve composition of morphisms:
            //  fmap (f . g)  ==  fmap f . fmap g
            it('preserved composition of morphisms', () => {
                expect(nullable(3.14).to<string>(undefinedDecimal).to(split('.')))
                    .toStrictEqual(nullable(3.14).to(splitUndefinedDecimal));
                expect(nullable(undefined).to<string>(undefinedDecimal).to(split('.')))
                    .toStrictEqual(nullable(undefined).to(splitUndefinedDecimal));
                expect(nil<number>().to<string>(undefinedDecimal).to(split('.')))
                    .toStrictEqual(nil<number>().to(splitUndefinedDecimal));
            });
        });

        describe('when the "map" function returns a present value', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string> = nullable(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<string> = nullable(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(solum('3.14'));
            });
        });

        describe('when the "map" function may return a present or absent value', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string> = nullable(3.14).to(constant(fallbackNullable('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<string> = nullable(3.14).to(constant(fallbackNullable('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(3.14).to(constant(fallbackNullable('3.14')));

                expect(output).toStrictEqual(solum('3.14'));
            });
        });

        describe('when the "map" function returns null', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string> = nullable(3.14).to<string>(constant(null));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<string> = nullable(3.14).to<string>(constant(null));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<string> = nullable(3.14).to<string>(constant(null));

                expect(output).toBe(nil());
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string | undefined> = nullable(3.14).to<string | undefined>(constant(undefined));

                expect(output).toStrictEqual(solum(undefined));
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<number | undefined>' is not assignable to type 'Solum<number | undefined>'.
                const output: Solum<number | undefined> = nullable(3.14).to<number | undefined>(constant(undefined));

                expect(output).toStrictEqual(solum(undefined));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error --TS2322:
                //  Type 'Nullable<number | undefined>' is not assignable to type 'Nil<number | undefined>'.
                const output: Nil<number | undefined> = nullable(3.14).to<number | undefined>(constant(undefined));

                expect(output).toStrictEqual(solum(undefined));
            });
        });
    });

    describe('pick', () => {
        describe('when the property is required', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = nullable(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<number> = nullable(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        describe('when the property can be absent', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable(typeGuardCheck).pick('option');

                expect(output).toStrictEqual(solum(undefined));
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<number | undefined>' is not assignable to type 'Solum<number>'.
                const output: Solum<number> = nullable(typeGuardCheck).pick('option');

                expect(output).toStrictEqual(solum(undefined));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<number | undefined>' is not assignable to type 'Nil<number>'.
                const output: Nil<number> = nullable(typeGuardCheck).pick('option');

                expect(output).toStrictEqual(solum(undefined));
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = nullable(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<number> = nullable(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = nullable(3.14).that(isLessThan(2.71));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<number> = nullable(3.14).that(isLessThan(2.71));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable(3.14).that(isLessThan(2.71));

                expect(output).toBe(nil());
            });
        });
    });

    describe('which', () => {
        describe('when the "filter" type guard is true', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<string> = nullable<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithPresent<string, "length">>' is not assignable to type 'Solum<string>'.
                const output: Solum<string> = nullable<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(solum('3.14'));
            });

            it('cannot be assign to Nil', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithPresent<string, "length">>' is not assignable to type 'Nil<string>'.
                const output: Nil<string> = nullable<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(solum('3.14'));
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<ObjectWithAbsent<string, 'length'>> = nullable<string>('3.14')
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Nullable<ObjectWithAbsent<string, "length">>'
                //  is not assignable to type 'Solum<ObjectWithAbsent<string, "length">>'.
                const output: Solum<ObjectWithAbsent<string, 'length'>> = nullable<string>('3.14')
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
                const output: Nullable<number> = nullable(3.14).when(constant(true));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<number> = nullable(3.14).when(constant(true));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable(3.14).when(constant(true));

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        describe('when the "condition" is false', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = nullable(3.14).when(constant(false));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<number> = nullable(3.14).when(constant(false));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable(3.14).when(constant(false));

                expect(output).toBe(nil());
            });
        });
    });

    describe('otherwise', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable<number | undefined>(undefined).otherwise(2.71);

                expect(output).toStrictEqual(solum(undefined));
            });

            it('returns Solum value', () => {
                const output: Solum<number> = nullable<number>(3.14).otherwise(2.71);

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Solum<number>' is not assignable to type 'Nil<number>'.
                const output: Nil<number> = nullable<number>(3.14).otherwise(2.71);

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable<number | undefined>(undefined)
                    .otherwise(constant(2.71));

                expect(output).toStrictEqual(solum(undefined));
            });

            it('returns Solum value', () => {
                const output: Solum<number | undefined> = nullable<number | undefined>(undefined)
                    .otherwise(constant(2.71));

                expect(output).toStrictEqual(solum(undefined));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Solum' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable<number>(3.14).otherwise(constant(2.71));

                expect(output).toStrictEqual(solum(3.14));
            });
        });

        describe('when the "fallback" is null', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = nullable<number>(null).otherwise(null);

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<number> = nullable<number>(3.14).otherwise(null);

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable<number | undefined>(undefined).otherwise(null);

                expect(output).toStrictEqual(solum(undefined));
            });
        });

        describe('when the "fallback" returns null', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number> = nullable<number>(null).otherwise(constant(null));

                expect(output).toBe(nil());
            });

            it('cannot be assigned to Solum', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
                const output: Solum<number> = nullable<number>(3.14).otherwise(constant(null));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Nil'.
                const output: Nil<number> = nullable<number | undefined>(undefined).otherwise(constant(null));

                expect(output).toStrictEqual(solum(undefined));
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable<number | undefined>(null).otherwise(undefined);

                expect(output).toStrictEqual(solum(undefined));
            });

            it('cannot be assigned to Solum', () => {
                const output: Solum<number | undefined> = nullable<number | undefined>(3.14).otherwise(undefined);

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Solum<number | undefined>' is not assignable to type 'Nil<number | undefined>'.
                const output: Nil<number | undefined> = nullable<number | undefined>(null).otherwise(undefined);

                expect(output).toStrictEqual(solum(undefined));
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('must be assigned to Nullable', () => {
                const output: Nullable<number | undefined> = nullable<number | undefined>(null)
                    .otherwise(constant(undefined));

                expect(output).toStrictEqual(solum(undefined));
            });

            it('cannot be assigned to Solum', () => {
                const output: Solum<number | undefined> = nullable<number | undefined>(3.14)
                    .otherwise(constant(undefined));

                expect(output).toStrictEqual(solum(3.14));
            });

            it('cannot be assigned to Nil', () => {
                // @ts-expect-error --TS2322:
                //  Type 'Solum<number | undefined>' is not assignable to type 'Nil<number | undefined>'.
                const output: Nil<number | undefined> = nullable<number | undefined>(null)
                    .otherwise(constant(undefined));

                expect(output).toStrictEqual(solum(undefined));
            });
        });
    });

    describe('or', () => {
        describe('when the "fallback" is a present value', () => {
            it('should be assigned to the value type', () => {
                const output: number = nullable(3.14).or(2.71);

                expect(output).toBe(3.14);
            });

            it('can be assigned to the nullable value type', () => {
                const output: number | null = nullable<number>(null).or(2.71);

                expect(output).toBe(2.71);
            });

            it('can be assigned to the optional value type', () => {
                const output: number | undefined = nullable<number | undefined>(undefined).or(2.71);

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('should be assigned to the value type', () => {
                const output: number = nullable(3.14).or(constant(2.71));

                expect(output).toBe(3.14);
            });

            it('can be assigned to the nullable value type', () => {
                const output: number = nullable<number>(null).or(constant(2.71));

                expect(output).toBe(2.71);
            });

            it('can be assigned to the optional value type', () => {
                const output: number | undefined = nullable<number | undefined>(undefined).or(constant(2.71));

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" may be null', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
                const output: number = nullable(3.14).or(fallbackNullable(2.71));

                expect(output).toBe(3.14);
            });

            it('must be assigned to the nullable value type', () => {
                const output: number | null = nullable<number>(null).or(fallbackNullable(2.71));

                expect(output).toBe(2.71);
            });

            it('cannot be assigned to the optional value type', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | undefined'.
                const output: number | undefined = nullable<number | undefined>(undefined).or(fallbackNullable(2.71));

                expect(output).toBeUndefined();
            });
        });

        describe('when the "fallback" is null', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'number'.
                const output: number = nullable(3.14).or(null);

                expect(output).toBe(3.14);
            });

            it('cannot be assigned to null type', () => {
                // @ts-expect-error -- TS2322: Type 'number | null' is not assignable to type 'null'.
                const output: null = nullable(3.14).or(null);

                expect(output).toBe(3.14);
            });

            it('must be assigned to the nullable value type', () => {
                const output: number | null = nullable<number>(null).or(null);

                expect(output).toBeNull();
            });

            it('cannot be assigned to the optional value type', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | undefined'.
                const output: number | undefined = nullable<number | undefined>(undefined).or(null);

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
            const output: Nullable<number> = nullable(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(solum(3.14));
        });

        it('cannot be assigned to Solum', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable' is not assignable to type 'Solum'.
            const output: Solum<number> = nullable(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(solum(3.14));
        });

        it('cannot be assigned to Nil', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<number>' is not assignable to type 'Nil<number>'.
            const output: Nil<number> = nullable(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(solum(3.14));
        });
    });

    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to parameter of type '(value: string | null) => number | null'.
            expect(nullable('3.14').lift(decimal))
                .toStrictEqual(solum(3.14));
        });

        it('must be assigned to Nullable', () => {
            const output: Nullable<boolean> = nullable(3.14).lift(isPresent);

            expect(output).toStrictEqual(solum(true));
        });

        it('cannot be assigned to Solum', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<number>' is not assignable to type 'Solum<boolean>'.
            const output: Solum<boolean> = nullable(3.14).lift(constant(2.71));

            expect(output).toStrictEqual(solum(2.71));
        });

        it('cannot be assigned to Nil', () => {
            // @ts-expect-error -- TS2322: Type 'Nullable<boolean>' is not assignable to type 'Nil<boolean>'.
            const output: Nil<boolean> = nullable(3.14).lift<boolean>(constant(null));

            expect(output).toBe(nil());
        });
    });
});
