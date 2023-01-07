import { Unary } from '../../function';
import { constant, Nullary } from '../../function/function/nullary';
import { decimal } from '../../number/number/base';
import { isGreaterThan, isLessThan } from '../../number/number/order';
import { hasAbsentProperty, hasPresentProperty, ObjectWithAbsent } from '../../object/property/property';
import { split } from '../../string/string/lift';
import { output as stringOutput } from '../../string/string/output';
import { isPresent } from '../../value/value';
import { typeGuardCheck } from '../maybe/type-guard-check.mock';

import { None, none, Optional, optional, optionalOf, Some, some } from './optional';
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
    describe('when the value may be present or undefined', () => {
        it('must be assigned to Optional', () => {
            const output: Optional<number> = optional(fallbackOptional(0));

            expect(output).toStrictEqual(some(0));
        });
    });

    describe('when the value is present', () => {
        it('creates Some<T> when value is present', () => {
            expect(optional(fallbackOptional(3.14)))
                .toStrictEqual(some(3.14));
        });

        it('cannot be assigned to Some<T>', () => {
            // @ts-expect-error -- TS2322: Type 'Optional<number>' is not assignable to type 'Some<number>'.
            const output: Some<number> = optional(fallbackOptional(0));

            expect(output).toStrictEqual(some(0));
        });
    });

    describe('when the value is undefined', () => {
        it('returns the memoized "none" None<T> when value is undefined', () => {
            expect(optional(fallbackOptional<number>(undefined)))
                .toStrictEqual(none());
        });

        it('cannot be assigned to None<T>', () => {
            // @ts-expect-error -- TS2322: Type 'Optional<number>' is not assignable to type 'None<number>'.
            const output: None<number> = optional(fallbackOptional<number>(undefined));

            expect(output).toBe(none());
        });
    });
});

describe(optionalOf, () => {
    describe('when the "map" function requires defined input and returns defined output', () => {
        it('returns an unary function that returns Some', () => {
            const output: Unary<number, Some<string[]>> = optionalOf(splitNullableDecimal);

            expect(output(3.14)).toStrictEqual(some(['3', '14']));
        });
    });

    describe('when the "map" function accepts defined or undefined value and returns defined output', () => {
        it('creates an unary function that returns Some', () => {
            // TODO: Figure out why it can also be assigned to Unary<number, Some<boolean>>
            //  or Unary<string | undefined, Some<boolean>>
            const output: Unary<number | null | undefined, Some<boolean>> = optionalOf<number | null, boolean>(
                isPresent,
            );

            expect(output(3.14)).toStrictEqual(some(true));
            expect(output(null)).toStrictEqual(some(false));
            expect(output(undefined)).toStrictEqual(some(false));
        });
    });

    describe('when the "map" function accepts defined or undefined value and returns undefined output', () => {
        it('creates an unary function that returns None', () => {
            // TODO: Figure out why it can also be assigned to Unary<number, None<boolean>>
            const output: Unary<number | null | undefined, None<boolean>> = optionalOf(constant(undefined));

            expect(output(3.14)).toBe(none());
            expect(output(null)).toBe(none());
            expect(output(undefined)).toBe(none());
        });
    });

    describe(
        'when the "map" function accepts defined or undefined value and returns defined or undefined output',
        () => {
            it('creates an unary function that returns Maybe', () => {
            // TODO: Figure out why it can also be assigned to Unary<number, Optional<number>>
                const output: Unary<number | null | undefined, Optional<number | null>> = optionalOf<
                number | null, number | null>(
                    fallbackOptional,
                );

                expect(output(3.14)).toStrictEqual(some(3.14));
                expect(output(null)).toStrictEqual(some(null));
                expect(output(undefined)).toBe(none());
            });
        },
    );
});

describe(Optional, () => {
    describe('value', () => {
        it('is an optional property and cannot be assigned to the value type', () => {
            // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
            const value: number = optional(fallbackOptional(3.14)).value;

            expect(value).toBe(3.14);
        });
    });

    describe('onto', () => {
        it('is a left-identity for Nullable.onto() as the "bind" operator', () => {
            // Left-identity: unit(a) >>= \x -> f(x) <=> f(a)
            expect(optional(fallbackOptional(3.14)).onto(optionalDecimal))
                .toStrictEqual(optionalDecimal(3.14));
            expect(none<number>().onto(optionalDecimal))
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
            expect(optional(fallbackOptional(3.14)).onto(x => optionalDecimal(x).onto(optionalSplit)))
                .toStrictEqual(optional(fallbackOptional(3.14)).onto(optionalDecimal).onto(optionalSplit));
            expect(none<number>().onto(x => optionalDecimal(x).onto(optionalSplit)))
                .toStrictEqual(none<number>().onto(optionalDecimal).onto(optionalSplit));
        });

        describe('when the "flatMap" function returns Optional', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(fallbackOptional(3.14))
                    .onto(constant(optional(fallbackOptional('3.14'))));

                expect(output).toStrictEqual(optional(fallbackOptional('3.14')));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional<string>' is not assignable to type 'Some<string>'.
                const output: Some<string> = optional(fallbackOptional(3.14))
                    .onto(constant(optional(fallbackOptional('3.14'))));

                expect(output).toStrictEqual(optional(fallbackOptional('3.14')));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional<string>' is not assignable to type 'None<string>'.
                const output: None<string> = optional(fallbackOptional(3.14))
                    .onto(constant(optional(fallbackOptional('3.14'))));

                expect(output).toStrictEqual(optional(fallbackOptional('3.14')));
            });
        });

        describe('when the "flatMap" function returns Some', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(fallbackOptional(3.14)).onto(constant(some('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string> = optional(fallbackOptional(3.14)).onto(constant(some('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string> = optional(fallbackOptional(3.14)).onto(constant(some('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });
        });

        describe('when the "flatMap" function returns None', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(fallbackOptional(3.14)).onto(constant(none<string>()));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string> = optional(fallbackOptional(3.14)).onto(constant(none<string>()));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string> = optional(fallbackOptional(3.14)).onto(constant(none<string>()));

                expect(output).toBe(none());
            });
        });
    });

    describe('to', () => {
        describe('to() is the "fmap" operator for the Optional type and satisfies functor laws', () => {
            // Functors must preserve identity morphisms:
            //  fmap id = id
            it('preserves identity morphisms', () => {
                expect(optional(fallbackOptional(3.14)).to(identity)).toStrictEqual(optional(fallbackOptional(3.14)));
                expect(optional(null).to(identity)).toStrictEqual(optional(null));
                expect(optional(undefined).to(identity)).toStrictEqual(optional(undefined));
            });

            // Functors preserve composition of morphisms:
            //  fmap (f . g)  ==  fmap f . fmap g
            it('preserved composition of morphisms', () => {
                expect(optional(fallbackOptional(3.14)).to<string>(nullableDecimal).to(split('.')))
                    .toStrictEqual(optional(fallbackOptional(3.14)).to(splitNullableDecimal));
                expect(optional(null).to<string>(nullableDecimal).to(split('.')))
                    .toStrictEqual(optional(null).to(splitNullableDecimal));
                expect(none<number>().to<string>(nullableDecimal).to(split('.')))
                    .toStrictEqual(none<number>().to(splitNullableDecimal));
            });
        });

        describe('when the "map" function may return a present or absent value', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(fallbackOptional(3.14))
                    .to(constant(fallbackOptional('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string> = optional(fallbackOptional(3.14)).to(constant(fallbackOptional('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string> = optional(fallbackOptional(3.14)).to(constant(fallbackOptional('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });
        });

        describe('when the "map" function returns a present value', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(fallbackOptional(3.14)).to(constant('3.14'));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string> = optional(fallbackOptional(3.14)).to(constant('3.14'));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string> = optional(fallbackOptional(3.14)).to(constant('3.14'));

                expect(output).toStrictEqual(some('3.14'));
            });
        });

        describe('when the "map" function returns null', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string | null> = optional(fallbackOptional(3.14))
                    .to<string | null>(constant(null));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'Optional<number | null>' is not assignable to type 'Some<number | null>'.
                const output: Some<number | null> = optional(fallbackOptional(3.14)).to<number | null>(constant(null));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number | null> = optional(fallbackOptional(3.14)).to<number | null>(constant(null));

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = optional(fallbackOptional(3.14)).to<string>(constant(undefined));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<string> = optional(fallbackOptional(3.14)).to<string>(constant(undefined));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<string> = optional(fallbackOptional(3.14)).to<string>(constant(undefined));

                expect(output).toBe(none());
            });
        });
    });

    describe('into', () => {
        it('does not accept a "fold" function with a non-optional value argument', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to parameter of type '(value: string | undefined) => number | null'.
            const output: number | null = optional(fallbackOptional('3.14')).into(decimal);

            expect(output).toBe(3.14);
        });

        it('returns the result of the given "fold" function applied to the value of Optional', () => {
            expect(optional(fallbackOptional(3.14)).into(stringOutput)).toBe('3.14');
            expect(optional(undefined).into(stringOutput)).toBe('undefined');
        });

        it('can be used to return Optional', () => {
            const output: Optional<boolean> = optional(fallbackOptional(3.14)).into(optionalOf(isPresent));

            expect(output).toStrictEqual(some(true));
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
                const output: Optional<number> = optional(fallbackOptional(3.14)).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional(fallbackOptional(3.14)).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional(fallbackOptional(3.14)).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = optional(fallbackOptional(3.14)).that(isLessThan(2.71));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional(fallbackOptional(3.14)).that(isLessThan(2.71));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional(fallbackOptional(3.14)).that(isLessThan(2.71));

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
                const output: Optional<number> = optional(fallbackOptional(3.14)).when(constant(true));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional(fallbackOptional(3.14)).when(constant(true));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional(fallbackOptional(3.14)).when(constant(true));

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = optional(fallbackOptional(3.14)).when(constant(false));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional(fallbackOptional(3.14)).when(constant(false));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional(fallbackOptional(3.14)).when(constant(false));

                expect(output).toBe(none());
            });
        });
    });

    describe('otherwise', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = optional(fallbackOptional<number>(undefined)).otherwise(2.71);

                expect(output).toStrictEqual(some(2.71));
            });

            it('returns Some value', () => {
                const output: Some<number> = optional<number>(fallbackOptional(3.14)).otherwise(2.71);

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some<number>' is not assignable to type 'None<number>'.
                const output: None<number> = optional<number>(fallbackOptional(3.14)).otherwise(2.71);

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = optional(fallbackOptional<number>(undefined))
                    .otherwise(constant(2.71));

                expect(output).toStrictEqual(some(2.71));
            });

            it('returns Some value', () => {
                const output: Some<number> = optional(fallbackOptional<number>(undefined)).otherwise(constant(2.71));

                expect(output).toStrictEqual(some(2.71));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Some' is not assignable to type 'None'.
                const output: None<number> = optional<number>(fallbackOptional(3.14)).otherwise(constant(2.71));

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "fallback" is null', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional<number | null>(fallbackOptional(null)).otherwise(null);

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
                const output: Optional<number | null> = optional<number | null>(fallbackOptional(null))
                    .otherwise(constant(null));

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
                const output: Optional<number | null> = optional<number | null>(fallbackOptional(null))
                    .otherwise(undefined);

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional<number>(fallbackOptional(3.14)).otherwise(undefined);

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional<number | null>(fallbackOptional(null)).otherwise(undefined);

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number | null> = optional<number | null>(fallbackOptional(null))
                    .otherwise(constant(undefined));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to Some', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
                const output: Some<number> = optional<number>(fallbackOptional(3.14)).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
                const output: None<number> = optional<number | null>(fallbackOptional(null))
                    .otherwise(constant(undefined));

                expect(output).toStrictEqual(some(null));
            });
        });
    });

    describe('or', () => {
        describe('when the "fallback" is a present value', () => {
            it('can be assigned to the value type when the original value is present', () => {
                const output: number = optional(fallbackOptional(3.14)).or(2.71);

                expect(output).toBe(3.14);
            });

            it('can be assigned to the value type when the original value is null', () => {
                const output: number | null = optional<number | null>(fallbackOptional(null)).or(2.71);

                expect(output).toBeNull();
            });

            it('can be assigned to the value type when the original value is undefined', () => {
                const output: number = optional(fallbackOptional<number>(undefined)).or(2.71);

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to the value type when the original value is present', () => {
                const output: number = optional(fallbackOptional(3.14)).or(constant(2.71));

                expect(output).toBe(3.14);
            });

            it('can be assigned to the value type when the original value is null', () => {
                const output: number | null = optional<number | null>(fallbackOptional(null)).or(constant(2.71));

                expect(output).toBeNull();
            });

            it('can be assigned to the value type when the original value is undefined', () => {
                const output: number = optional(fallbackOptional<number>(undefined)).or(constant(2.71));

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" may be undefined', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = optional(fallbackOptional(3.14)).or(fallbackOptional(2.71));

                expect(output).toBe(3.14);
            });

            it('cannot be assigned to the nullable value type', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | null'.
                const output: number | null = optional<number | null>(fallbackOptional(null))
                    .or(fallbackOptional(2.71));

                expect(output).toBeNull();
            });

            it('must be assigned to the optional value type', () => {
                const output: number | undefined = optional(fallbackOptional<number>(undefined))
                    .or(fallbackOptional(2.71));

                expect(output).toBe(2.71);
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('cannot be assigned to the value type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'number'.
                const output: number = optional(fallbackOptional(3.14)).or(undefined);

                expect(output).toBe(3.14);
            });

            it('cannot be assigned to the nullable value type', () => {
                // @ts-expect-error -- TS2322:
                //  Type 'number | null | undefined' is not assignable to type 'number | null'.
                const output: number | null = optional<number | null>(fallbackOptional(null)).or(undefined);

                expect(output).toBeNull();
            });

            it('must be assigned to the optional value type', () => {
                const output: number | undefined = optional(fallbackOptional<number>(undefined)).or(undefined);

                expect(output).toBeUndefined();
            });

            it('cannot be assigned to the undefined type', () => {
                // @ts-expect-error -- TS2322: Type 'number | undefined' is not assignable to type 'undefined'.
                const output: undefined = optional<number>(fallbackOptional(2.71)).or(undefined);

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
            const output: Optional<number> = optional(fallbackOptional(pi)).run(assignPi(3.1415));

            expect(output).toStrictEqual(some(3.14));
        });

        it('cannot be assign to Some', () => {
            // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'Some'.
            const output: Some<number> = optional(fallbackOptional(pi)).run(assignPi(3.1415));

            expect(output).toStrictEqual(some(3.14));
        });

        it('cannot be assigned to None', () => {
            // @ts-expect-error -- TS2322: Type 'Optional' is not assignable to type 'None'.
            const output: None<number> = optional(fallbackOptional(pi)).run(assignPi(3.1415));

            expect(output).toStrictEqual(some(3.14));
        });
    });

    /* eslint-disable deprecation/deprecation -- to be removed in v0.10.0 */
    describe('lift', () => {
        it('does not accept functions with strictly-typed input', () => {
            // @ts-expect-error -- TS2345:
            //  Argument of type '{ (value: number): string; (value: string): number | null; }'
            //  is not assignable to parameter of type '(value: string | undefined) => number | null | undefined'.
            expect(optional(fallbackOptional('3.14')).lift(decimal)).toStrictEqual(some(3.14));
        });

        it('must be assigned to Optional', () => {
            const output: Optional<boolean> = optional(fallbackOptional(3.14)).lift(isPresent);

            expect(output).toStrictEqual(some(true));
        });

        it('cannot be assigned to Some', () => {
            // @ts-expect-error -- TS2322: Type 'Optional<number>' is not assignable to type 'Some<number>'.
            const output: Some<number> = optional(fallbackOptional(3.14)).lift(constant(2.71));

            expect(output).toStrictEqual(some(2.71));
        });

        it('cannot be assigned to None', () => {
            // @ts-expect-error -- TS2322:
            //  Type 'Optional<number | null>' is not assignable to type 'None<number | null>'.
            const output: None<number | null> = optional(fallbackOptional(3.14)).lift<number | null>(constant(null));

            expect(output).toStrictEqual(some(null));
        });
    });
    /* eslint-enable deprecation/deprecation */
});
