import { constant, Nullary } from '../../function/function/nullary';
import { decimal } from '../../number/number/base';
import { isGreaterThan, isLessThan } from '../../number/number/order';
import { hasAbsentProperty, hasPresentProperty, ObjectWithAbsent } from '../../object/property/property';
import { split } from '../../string/string/lift';
import { isPresent } from '../../value/value';
import { typeGuardCheck } from '../maybe/type-guard-check.mock';

import { None, none, Optional, optional, Some, some } from './optional';
import { fallbackOptional } from './optional.mock';

function optionalDecimal(value: number | undefined): Optional<string> {
    return optional(value).to<string>(decimal);
}

function optionalSplit(value: string | undefined): Optional<string[]> {
    return optional(value).to(v => v.split('.'));
}

function identity<T>(value: T): T {
    return value;
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
    describe('relations to three monad laws', () => {
        it('is a left-identity for Nullable.onto() as the "bind" operator', () => {
            // Left-identity: unit(a) >>= \x -> f(x) <=> f(a)
            expect(optional(3.14).onto(optionalDecimal))
                .toStrictEqual(optionalDecimal(3.14));
            expect(optional(undefined).onto(optionalDecimal))
                .toStrictEqual(optionalDecimal(undefined));
        });

        it('is a right-identity for Nullable.onto() as the "bind" operator', () => {
            // Right-identity: ma >>= x -> unit(x) <=> ma
            expect(optionalDecimal(3.14).onto(optional))
                .toStrictEqual(optionalDecimal(3.14));
            expect(optionalDecimal(undefined).onto(optional))
                .toStrictEqual(optionalDecimal(undefined));
        });

        it('has essentially associative Nullable.onto() as the "bind" operator', () => {
            // Associativity: ma >>= \x -> (f(x) >>= \y -> g(y)) <=> (ma >>= \x -> f(x) >>= \y -> g(y)
            expect(optional(3.14).onto(x => optionalDecimal(x).onto(optionalSplit)))
                .toStrictEqual(optional(3.14).onto(optionalDecimal).onto(optionalSplit));
            expect(optional(undefined).onto(x => optionalDecimal(x).onto(optionalSplit)))
                .toStrictEqual(optional(undefined).onto(optionalDecimal).onto(optionalSplit));
        });
    });

    describe('when the value may be present or undefined', () => {
        it('must be assigned to Optional', () => {
            const output: Optional<number> = optional(fallbackOptional(0));

            expect(output).toStrictEqual(some(0));
        });
    });

    describe('when the value is present', () => {
        it('creates Some<T> when value is present', () => {
            expect(optional(3.14))
                .toStrictEqual(some(3.14));
        });

        it('cannot be assigned to Some<T>', () => {
            // @ts-expect-error -- TS2322: Type 'Optional<number>' is not assignable to type 'Some<number>'.
            const output: Some<number> = optional(0);

            expect(output).toStrictEqual(some(0));
        });
    });

    describe('when the value is undefined', () => {
        it('returns the memoized "none" None<T> when value is undefined', () => {
            expect(optional<number>(undefined))
                .toStrictEqual(none());
        });

        it('cannot be assigned to None<T>', () => {
            // @ts-expect-error -- TS2322: Type 'Optional<number>' is not assignable to type 'None<number>'.
            const output: None<number> = optional<number>(undefined);

            expect(output).toBe(none());
        });
    });
});

describe(Optional, () => {
    describe('value', () => {
        it('is an optional property and cannot be assigned to the value type', () => {
            // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
            const value: number = optional<number>(3.14).value;

            expect(value).toBe(3.14);
        });
    });

    describe('onto', () => {
        describe('when the "flatMap" function returns Optional', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(3.14).onto(constant(optional('3.14')));

                expect(output).toStrictEqual(optional('3.14'));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional<string>' is not assignable to type 'Some<string>'.
                const output: Some<string> = optional(3.14).onto(constant(optional('3.14')));

                expect(output).toStrictEqual(optional('3.14'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional<string>' is not assignable to type 'None<string>'.
                const output: None<string> = optional(3.14).onto(constant(optional('3.14')));

                expect(output).toStrictEqual(optional('3.14'));
            });
        });

        describe('when the "flatMap" function returns Some', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(3.14).onto(constant(some('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string> = optional(3.14).onto(constant(some('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string> = optional(3.14).onto(constant(some('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });
        });

        describe('when the "flatMap" function returns None', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(3.14).onto(constant(none<string>()));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string> = optional(3.14).onto(constant(none<string>()));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string> = optional(3.14).onto(constant(none<string>()));

                expect(output).toBe(none());
            });
        });
    });

    describe('to', () => {
        describe('to() is the "fmap" operator for the Optional type and satisfies functor laws', () => {
            // Functors must preserve identity morphisms:
            //  fmap id = id
            it('preserves identity morphisms', () => {
                expect(optional(3.14).to(identity)).toStrictEqual(optional(3.14));
                expect(optional(null).to(identity)).toStrictEqual(optional(null));
                expect(optional(undefined).to(identity)).toStrictEqual(optional(undefined));
            });

            // Functors preserve composition of morphisms:
            //  fmap (f . g)  ==  fmap f . fmap g
            it('preserved composition of morphisms', () => {
                expect(optional(3.14).to<string>(nullableDecimal).to(split('.')))
                    .toStrictEqual(optional(3.14).to(splitNullableDecimal));
                expect(optional(null).to<string>(nullableDecimal).to(split('.')))
                    .toStrictEqual(optional(null).to(splitNullableDecimal));
                expect(none<number>().to<string>(nullableDecimal).to(split('.')))
                    .toStrictEqual(none<number>().to(splitNullableDecimal));
            });
        });

        describe('when the "map" function may return a present or absent value', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(3.14).to(constant(fallbackOptional('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string> = optional(3.14).to(constant(fallbackOptional('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string> = optional(3.14).to(constant(fallbackOptional('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });
        });

        describe('when the "map" function returns a present value', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string> = optional(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string> = optional(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(some('3.14'));
            });
        });

        describe('when the "map" function returns null', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string | null> = optional(3.14).to<string | null>(constant(null));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Optional<number | null>' is not assignable to type 'Some<number | null>'.
                const output: Some<number | null> = optional(3.14).to<number | null>(constant(null));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number | null> = optional(3.14).to<number | null>(constant(null));

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(3.14).to<string>(constant(undefined));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string> = optional(3.14).to<string>(constant(undefined));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string> = optional(3.14).to<string>(constant(undefined));

                expect(output).toBe(none());
            });
        });
    });

    describe('pick', () => {
        describe('when the property is required', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = optional(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the property can be absent', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = optional(typeGuardCheck).pick('option');

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional(typeGuardCheck).pick('option');

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional(typeGuardCheck).pick('option');

                expect(output).toBe(none());
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = optional(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = optional(3.14).that(isLessThan(2.71));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional(3.14).that(isLessThan(2.71));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional(3.14).that(isLessThan(2.71));

                expect(output).toBe(none());
            });
        });
    });

    describe('which', () => {
        describe('when the "filter" type guard is true', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Optional<ObjectWithPresent<string, "length">>' is not assignable to type 'Some<string>'.
                const output: Some<string> = optional<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assign to None', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Optional<ObjectWithPresent<string, "length">>' is not assignable to type 'None<string>'.
                const output: None<string> = optional<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(some('3.14'));
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
                const output: Optional<number> = optional(3.14).when(constant(true));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional(3.14).when(constant(true));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional(3.14).when(constant(true));

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = optional(3.14).when(constant(false));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional(3.14).when(constant(false));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional(3.14).when(constant(false));

                expect(output).toBe(none());
            });
        });
    });

    describe('otherwise', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = optional<number>(undefined).otherwise(2.71);

                expect(output).toStrictEqual(some(2.71));
            });

            it('returns Some value', () => {
                const output: Some<number> = optional<number>(3.14).otherwise(2.71);

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some<number>' is not assignable to type 'None<number>'.
                const output: None<number> = optional<number>(3.14).otherwise(2.71);

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = optional<number>(undefined).otherwise(constant(2.71));

                expect(output).toStrictEqual(some(2.71));
            });

            it('returns Some value', () => {
                const output: Some<number> = optional<number>(undefined).otherwise(constant(2.71));

                expect(output).toStrictEqual(some(2.71));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
                const output: None<number> = optional<number>(3.14).otherwise(constant(2.71));

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "fallback" is null', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional<number | null>(null).otherwise(null);

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to Some', () => {
                const output: Some<number | null> = optional<number | null>(3.14).otherwise(null);

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Some<number | null>' is not assignable to type 'None<number | null>'.
                const output: None<number | null> = optional<number | null>(undefined)
                    .otherwise(null);

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "fallback" returns null', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional<number | null>(null).otherwise(constant(null));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to Some', () => {
                const output: Some<number | null> = optional<number | null>(3.14)
                    .otherwise(constant(null));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Some<number | null>' is not assignable to type 'None<number | null>'.
                const output: None<number | null> = optional<number | null>(undefined)
                    .otherwise(constant(null));

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional<number | null>(null).otherwise(undefined);

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional<number>(3.14).otherwise(undefined);

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional<number | null>(null).otherwise(undefined);

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional<number | null>(null).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional<number>(3.14).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional<number | null>(null).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(null));
            });
        });
    });

    describe('or', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to the value type when the original value is present', () => {
                const output: number = optional(3.14).or(2.71);

                expect(output).toBe(3.14);
            });

            it('can be assigned to the value type when the original value is null', () => {
                const output: number | null = optional<number | null>(null).or(2.71);

                expect(output).toBeNull();
            });

            it('can be assigned to the value type when the original value is undefined', () => {
                const output: number = optional<number>(undefined).or(2.71);

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to the value type when the original value is present', () => {
                const output: number = optional(3.14).or(constant(2.71));

                expect(output).toBe(3.14);
            });

            it('can be assigned to the value type when the original value is null', () => {
                const output: number | null = optional<number | null>(null).or(constant(2.71));

                expect(output).toBeNull();
            });

            it('can be assigned to the value type when the original value is undefined', () => {
                const output: number = optional<number>(undefined).or(constant(2.71));

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" may be undefined', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = optional(3.14).or(fallbackOptional(2.71));

                expect(output).toBe(3.14);
            });

            it('cannot be assigned to the nullable value type', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | null'.
                const output: number | null = optional<number | null>(null).or(fallbackOptional(2.71));

                expect(output).toBeNull();
            });

            it('must be assigned to the optional value type', () => {
                const output: number | undefined = optional<number>(undefined).or(fallbackOptional(2.71));

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = optional(3.14).or(undefined);

                expect(output).toBe(3.14);
            });

            it('cannot be assigned to the nullable value type', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | null'.
                const output: number | null = optional<number | null>(null).or(undefined);

                expect(output).toBeNull();
            });

            it('must be assigned to the optional value type', () => {
                const output: number | undefined = optional<number>(undefined).or(undefined);

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the undefined type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'undefined'.
                const output: undefined = optional<number>(2.71).or(undefined);

                expect(output).toBe(2.71);
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

        it('must be assigned to Optional', () => {
            const output: Optional<number> = optional(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(some(3.14));
        });

        it('cannot be assign to Some', () => {
            // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
            const output: Some<number> = optional(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(some(3.14));
        });

        it('cannot be assigned to None', () => {
            // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
            const output: None<number> = optional(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(some(3.14));
        });
    });

    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to parameter of type '(value: string | undefined) => number | null | undefined'.
            expect(optional('3.14').lift(decimal)).toStrictEqual(some(3.14));
        });

        it('must be assigned to Optional', () => {
            const output: Optional<boolean> = optional(3.14).lift(isPresent);

            expect(output).toStrictEqual(some(true));
        });

        it('cannot be assigned to Some', () => {
            // @ts-expect-error -- TS2322: Type 'Optional<number>' is not assignable to type 'Some<number>'.
            const output: Some<number> = optional(3.14).lift(constant(2.71));

            expect(output).toStrictEqual(some(2.71));
        });

        it('cannot be assigned to None', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Optional<number | null>' is not assignable to type 'None<number | null>'.
            const output: None<number | null> = optional(3.14).lift<number | null>(constant(null));

            expect(output).toStrictEqual(some(null));
        });
    });
});
