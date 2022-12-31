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
            // TS2322: Type 'Optional<number>' is not assignable to type 'Some<number>'.
            // @ts-expect-error -- Optional can be None
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
            // TS2322: Type 'Optional<undefined>' is not assignable to type 'None<number>'.
            // @ts-expect-error -- Optional can be Some
            const output: None<number> = optional<number>(undefined);

            expect(output).toBe(none());
        });
    });
});

describe(Optional, () => {
    describe('value', () => {
        it('is an optional property and cannot be assigned to the value type', () => {
            // TS2322: Type 'number | undefined' is not assignable to type 'number'.
            // @ts-expect-error -- Optional.value has to be assigned to "number | undefined".
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
                // TS2322: Type 'Optional<string>' is not assignable to type 'Some<string>'.
                // @ts-expect-error -- Some.onto() always returns the result of the given function.
                const output: Some<string> = optional(3.14).onto(constant(optional('3.14')));

                expect(output).toStrictEqual(optional('3.14'));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional<string>' is not assignable to type 'None<string>'.
                // @ts-expect-error -- Some.onto() always returns the result of the given function.
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
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Optional.onto() may return a result or none.
                const output: Some<string> = optional(3.14).onto(constant(some('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.onto() may return a result or none.
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
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Some.onto() always returns the result of the given function.
                const output: Some<string> = optional(3.14).onto(constant(none<string>()));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.onto() may return a result or none.
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

                // TS2345: Type 'undefined' is not assignable to type 'number'.
                // @ts-expect-error -- Composing the same functions for test clarity
                expect(none().to<string>(nullableDecimal).to(split('.')))
                    // TS2345: Type 'undefined' is not assignable to type 'number'.
                    // @ts-expect-error -- Composing the same functions for test clarity
                    .toStrictEqual(none().to(splitNullableDecimal));
            });
        });

        describe('when the "map" function may return a present or absent value', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(3.14).to(constant(fallbackOptional('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Some.to() always returns the result, and result may be absent.
                const output: Some<string> = optional(3.14).to(constant(fallbackOptional('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Some.to() always returns the result, and result may be present.
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
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Some.to() always returns the result, and result may be absent.
                const output: Some<string> = optional(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Some.to() always returns the result, and result may be present.
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
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Some.to() always returns the result, and result may be absent.
                const output: Some<string> = optional(3.14).to<string>(constant(null));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- Some.to() always returns the result, and result may be present.
                const output: None<string> = optional(3.14).to<string>(constant(null));

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(3.14).to<string>(constant(undefined));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Some.to() always returns the result, and result may be absent.
                const output: Some<string> = optional(3.14).to<string>(constant(undefined));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Some.to() always returns the result, and result may be present.
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
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Optional.pick() may not have a value to pick from
                const output: Some<number> = optional(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.pick() may not have a value to pick from
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
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Optional.pick() may not have a value to pick from.
                const output: Some<number> = optional(typeGuardCheck).pick('option');

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.pick() may not have a value to pick from.
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
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Optional.that() may return None.
                const output: Some<number> = optional(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.that() may return Some.
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
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Optional.that() may return None.
                const output: Some<number> = optional(3.14).that(isLessThan(2.71));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.that() may return Some.
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
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Optional.which() may return None.
                const output: Some<string> = optional<string>('3.14').which(hasPresentProperty('length'));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assign to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.which() may return Some.
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
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Optional.which() may return None.
                const output: Some<ObjectWithAbsent<string, 'length'>> = optional<string>('3.14')
                    .which(hasAbsentProperty('length'));

                expect(output).toBe(none());
            });

            it('cannot be assign to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.which() may return Some.
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
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Optional.when() may return None.
                const output: Some<number> = optional(3.14).when(constant(true));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.when() may return Some.
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
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Optional.when() may return None.
                const output: Some<number> = optional(3.14).when(constant(false));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.when() may return Some.
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
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.otherwise() is always present if fallback is present.
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
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.otherwise() is always present if fallback is present.
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
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Optional.otherwise() may return None if the value is absent.
                const output: Some<number> = optional<number>(3.14).otherwise(null);

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to null', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.otherwise() may return Some if the value is present.
                const output: None<number> = optional<number>(undefined).otherwise(null);

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "fallback" returns null', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional<number | null>(null).otherwise(constant(null));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Optional.otherwise() may return None if the value is absent.
                const output: Some<number> = optional<number>(3.14).otherwise(constant(null));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to null', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.otherwise() may return Some if the value is present.
                const output: None<number> = optional<number>(undefined).otherwise(constant(null));

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional<number | null>(null).otherwise(undefined);

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Optional.otherwise() may return None if the value is absent.
                const output: Some<number> = optional<number>(3.14).otherwise(undefined);

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to undefined', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.otherwise() may return Some if the value is present.
                const output: None<number> = optional<number>(null).otherwise(undefined);

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional<number | null>(null).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Optional.otherwise() may return None if the value is absent.
                const output: Some<number> = optional<number>(3.14).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to undefined', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Optional.otherwise() may return Some if the value is present.
                const output: None<number> = optional<number>(null).otherwise(constant(undefined));

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
                // TS2322: Type 'number | undefined' is not assignable to type 'number'.
                // @ts-expect-error -- fallback may be undefined
                const output: number = optional(3.14).or(fallbackOptional(2.71));

                expect(output).toBe(3.14);
            });

            it('cannot be assigned to the nullable value type', () => {
                // TS2322: Type 'number | undefined' is not assignable to type 'number | null'.
                // @ts-expect-error -- fallback may be undefined
                const output: number | null = optional<number>(null).or(fallbackOptional(2.71));

                expect(output).toBeNull();
            });

            it('must be assigned to the optional value type', () => {
                const output: number | undefined = optional<number>(undefined).or(fallbackOptional(2.71));

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('cannot be assigned to the value type', () => {
                // TS2322: Type 'number | undefined' is not assignable to type 'number'.
                // @ts-expect-error -- fallback is undefined
                const output: number = optional(3.14).or(undefined);

                expect(output).toBe(3.14);
            });

            it('cannot be assigned to the nullable value type', () => {
                // TS2322: Type 'number | undefined' is not assignable to type 'number | null'.
                // @ts-expect-error -- fallback is undefined
                const output: number | null = optional<number>(null).or(undefined);

                expect(output).toBeNull();
            });

            it('must be assigned to the optional value type', () => {
                const output: number | undefined = optional<number>(undefined).or(undefined);

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the undefined type', () => {
                // TS2322: Type 'number | undefined' is not assignable to type 'number | null'.
                // @ts-expect-error -- fallback is undefined
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
            // TS2322: Type 'Optional' is not assignable to type 'Some'.
            // @ts-expect-error -- Optional.run may return original None.
            const output: Some<number> = optional(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(some(3.14));
        });

        it('cannot be assigned to None', () => {
            // TS2322: Type 'Optional' is not assignable to type 'None'.
            // @ts-expect-error -- Optional.run may return original Some.
            const output: None<number> = optional(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(some(3.14));
        });
    });

    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            // TS2345: Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to parameter of type '(value: string | undefined) => number | null | undefined'.
            // @ts-expect-error -- Optional.lift may pass null or undefined into the function.
            expect(optional('3.14').lift(decimal))
                .toStrictEqual(some(3.14));
        });

        it('must be assigned to Optional', () => {
            const output: Optional<boolean> = optional(3.14).lift(isPresent);

            expect(output).toStrictEqual(some(true));
        });

        it('cannot be assigned to Some', () => {
            // TS2322: Type 'Optional<number>' is not assignable to type 'Some<boolean>'.
            // @ts-expect-error -- Optional.lift() may return None.
            const output: Some<boolean> = optional(3.14).lift(constant(2.71));

            expect(output).toStrictEqual(some(2.71));
        });

        it('cannot be assigned to None', () => {
            // TS2322: Type 'Optional<boolean>' is not assignable to type 'None<boolean>'.
            // @ts-expect-error -- Optional.lift() may return Some.
            const output: None<boolean> = optional(3.14).lift<boolean>(constant(null));

            expect(output).toStrictEqual(some(null));
        });
    });
});
