import { panic } from '@perfective/error';
import { constant, Nullary } from '@perfective/fp';
import {
    hasAbsentProperty,
    hasDefinedProperty,
    hasNotNullProperty,
    hasNullProperty,
    hasPresentProperty,
    hasUndefinedProperty,
    ObjectWithPresent,
} from '@perfective/object';
import { decimal, isGreaterThan, isLessThan } from '@perfective/real';
import { isPresent } from '@perfective/value';

import { TypeGuardCheck, typeGuardCheck } from '../maybe/type-guard-check.mock';

import { None, none, Optional, optional, Some, some } from './optional';
import { Boxed, fallback } from './optional.mock';

describe(some, () => {
    it('can be assigned to Optional', () => {
        const output: Optional<number> = some(0);

        expect(output).toStrictEqual(some(0));
    });

    it('cannot be assigned to None', () => {
        // TS2322: Type 'Some<number>' is not assignable to type 'None<number>'.
        // @ts-expect-error -- None is not Some.
        const output: None<number> = some(0);

        expect(output).toStrictEqual(some(0));
    });
});

describe(Some, () => {
    describe('value', () => {
        it('is a required property and can be assigned to the value type', () => {
            const value: number = some<number>(3.14).value;

            expect(value).toStrictEqual(3.14);
        });
    });

    describe('onto', () => {
        describe('when the "flatMap" function returns Optional', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = some(3.14).onto(constant(optional('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'Optional<string>' is not assignable to type 'Some<string>'.
                // @ts-expect-error -- Some.onto() always returns the result of the given function.
                const output: Some<string> = some(3.14).onto(constant(optional('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional<string>' is not assignable to type 'None<string>'.
                // @ts-expect-error -- Some.onto() always returns the result of the given function.
                const output: None<string> = some(3.14).onto(constant(optional('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });
        });

        describe('when the "flatMap" function returns Some', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<string> = some(3.14).onto(constant(some('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('returns Some the next value', () => {
                const output: Some<string> = some(3.14).onto(constant(some('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional<string>' is not assignable to type 'None<string>'.
                // @ts-expect-error -- Some.onto() always returns the result of the given function.
                const output: None<string> = some(3.14).onto(constant(some('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });
        });

        describe('when the "flatMap" function returns None', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<string> = some(3.14).onto(constant(none<string>()));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Some.onto() always returns the result of the given function.
                const output: Some<string> = some(3.14).onto(constant(none<string>()));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<string> = some(3.14).onto(constant(none<string>()));

                expect(output).toBe(none());
            });
        });
    });

    describe('to', () => {
        describe('when the "map" function may return a present or absent value', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<string> = some(3.14).to(constant(fallback('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Some.to() always returns the result, and result may be absent
                const output: Some<string> = some(3.14).to(constant(fallback('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Some.to() always returns the result, and result may be present
                const output: None<string> = some(3.14).to(constant(fallback('3.14')));

                expect(output).toStrictEqual(some('3.14'));
            });
        });

        describe('when the "map" function returns a present value', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<string> = some(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('returns Some the next value', () => {
                const output: Some<string> = some(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(some('3.14'));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Some' is not assignable to type 'None'.
                // @ts-expect-error -- Some.to() always returns the result, and result is present
                const output: None<string> = some(3.14).to(constant('3.14'));

                expect(output).toStrictEqual(some('3.14'));
            });
        });

        describe('when the "map" function returns null', () => {
            it('can be assigned to Optional (nullable) value', () => {
                const output: Optional<string | null> = some(3.14).to<string | null>(constant(null));

                expect(output).toStrictEqual(some(null));
            });

            it('returns Some (nullable) value', () => {
                const output: Some<string | null> = some(3.14).to<string | null>(constant(null));

                expect(output).toStrictEqual(some(null));
            });

            it('cannot be assigned to None (nullable) value', () => {
                // TS2322: Type 'Some<string | null>' is not assignable to type 'None<string | null>'.
                // @ts-expect-error -- Some.to() always returns the result and result is present.
                const output: None<string | null> = some(3.14).to<string | null>(constant(null));

                expect(output).toStrictEqual(some(null));
            });
        });

        describe('when the "map" function returns undefined', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<string> = some(3.14).to<string>(constant(undefined));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'None' is not assignable to type 'Some'.
                // @ts-expect-error -- Some.to() always returns the result, and result is absent
                const output: Some<string> = some(3.14).to<string>(constant(undefined));

                expect(output).toBe(none());
            });

            it('returns None', () => {
                const output: None<string> = some(3.14).to<string>(constant(undefined));

                expect(output).toBe(none());
            });
        });
    });

    describe('pick', () => {
        it('is an equivalent of the then() chain', () => {
            const input: Some<Boxed<TypeGuardCheck>> = some({ value: typeGuardCheck });

            expect(input.pick('value').pick('required'))
                .toStrictEqual(input.to(i => i.value).to(i => i.required));
        });

        describe('when the property is required', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = some(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(some(3.14));
            });

            it('returns Some the value of the property', () => {
                const output: Some<number> = some(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                //  TS2322: Type 'Some<number>' is not assignable to type 'None<number>'.
                // @ts-expect-error -- Some.pick() returns property value when it is defined.
                const output: None<number> = some(typeGuardCheck).pick('required');

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the property can be absent', () => {
            it('returns Optional the value of the property', () => {
                const output: Optional<number> = some(typeGuardCheck).pick('option');

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                //  TS2322: Type 'Optional<number>' is not assignable to type 'Some<number>'.
                // @ts-expect-error -- Some.pick() returns property value and it can be undefined
                const output: Some<number> = some(typeGuardCheck).pick('option');

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                //  TS2322: Type 'Optional<number>' is not assignable to type 'None<number>'.
                // @ts-expect-error -- Some.pick() returns property value when it is defined
                const output: None<number> = some(typeGuardCheck).pick('option');

                expect(output).toBe(none());
            });
        });
    });

    describe('that', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = some(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Some.that() may return None.
                const output: Some<number> = some(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Some.that() may return Some.
                const output: None<number> = some(3.14).that(isGreaterThan(2.71));

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = some(3.14).that(isLessThan(2.71));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Some.that() may return None.
                const output: Some<number> = some(3.14).that(isLessThan(2.71));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Some.that() may return Some.
                const output: None<number> = some(3.14).that(isLessThan(2.71));

                expect(output).toBe(none());
            });
        });
    });

    describe('which', () => {
        const input: Some<TypeGuardCheck> = some(typeGuardCheck);

        it('combines checked properties', () => {
            const intermediate: Optional<ObjectWithPresent<TypeGuardCheck, 'optional'>> = input
                .which(hasPresentProperty('optional'));
            const output: Optional<ObjectWithPresent<TypeGuardCheck, 'optional' | 'nullable'>> = intermediate
                .which(hasNotNullProperty('nullable'));

            expect(
                output.to(v => `${decimal(v.optional)}:${decimal(v.nullable)}`),
            ).toStrictEqual(
                input
                    .which(hasPresentProperty('optional', 'nullable'))
                    .to(v => `${decimal(v.optional)}:${decimal(v.nullable)}`),
            );
        });

        describe('when the "filter" type guard is true', () => {
            it('returns Some', () => {
                expect(input.which(hasDefinedProperty('required'))).toStrictEqual(input);
                expect(input.which(hasUndefinedProperty('optional'))).toStrictEqual(input);
                expect(input.which(hasNotNullProperty('nullable'))).toStrictEqual(input);
                expect(input.which(hasNullProperty('possible'))).toStrictEqual(input);
                expect(input.which(hasPresentProperty('maybe'))).toStrictEqual(input);
                expect(input.which(hasAbsentProperty('option'))).toStrictEqual(input);
            });

            it('must be assigned to Optional', () => {
                const output: Optional<ObjectWithPresent<TypeGuardCheck, 'maybe'>> = input
                    .which(hasPresentProperty('maybe'));

                expect(output).toStrictEqual(input);
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'Optional<ObjectWithPresent<TypeGuardCheck<number>, "required">>'
                //  is not assignable to type 'Some<TypeGuardCheck<number>>'.
                // @ts-expect-error -- Some.which() may return None.
                const output: Some<TypeGuardCheck> = input.which(hasPresentProperty('required'));

                expect(output).toStrictEqual(input);
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional<ObjectWithPresent<TypeGuardCheck<number>, "nullable">>'
                //  is not assignable to type 'None<ObjectWithPresent<TypeGuardCheck<number>, "nullable">>'.
                // @ts-expect-error -- Some.which() may return None.
                const output: None<ObjectWithPresent<TypeGuardCheck, 'nullable'>> = input
                    .which(hasPresentProperty('nullable'));

                expect(output).toStrictEqual(input);
            });
        });

        describe('when the "filter" type guard is false', () => {
            it('returns None', () => {
                expect(input.which(hasUndefinedProperty('required'))).toBe(none());
                expect(input.which(hasDefinedProperty('optional'))).toBe(none());
                expect(input.which(hasNullProperty('nullable'))).toBe(none());
                expect(input.which(hasNotNullProperty('possible'))).toBe(none());
                expect(input.which(hasAbsentProperty('maybe'))).toBe(none());
                expect(input.which(hasPresentProperty('option'))).toBe(none());
            });

            it('must be assigned to Optional', () => {
                const output: Optional<ObjectWithPresent<TypeGuardCheck, 'maybe' | 'optional'>> = input
                    .which(hasPresentProperty('maybe', 'optional'));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'Optional<ObjectWithPresent<TypeGuardCheck<number>, "option">>'
                //  is not assignable to type 'Some<ObjectWithPresent<TypeGuardCheck<number>, "option">>'.
                // @ts-expect-error -- Some.which may return None.
                const output: Some<ObjectWithPresent<TypeGuardCheck, 'option'>> = input
                    .which(hasPresentProperty('option'));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional<ObjectWithPresent<TypeGuardCheck<number>, "possible">>'
                //  is not assignable to type 'None<ObjectWithPresent<TypeGuardCheck<number>, "possible">>.
                // @ts-expect-error -- Some.which may return Some.
                const output: None<ObjectWithPresent<TypeGuardCheck, 'possible'>> = input
                    .which(hasPresentProperty('possible'));

                expect(output).toBe(none());
            });
        });
    });

    describe('when', () => {
        describe('when the "filter" condition is true', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = some(3.14).when(constant(true));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Some.when() may return None.
                const output: Some<number> = some(3.14).when(constant(true));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Some.when() may return Some.
                const output: None<number> = some(3.14).when(constant(true));

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "filter" condition is false', () => {
            it('must be assigned to Optional', () => {
                const output: Optional<number> = some(3.14).when(constant(false));

                expect(output).toBe(none());
            });

            it('cannot be assigned to Some', () => {
                // TS2322: Type 'Optional' is not assignable to type 'Some'.
                // @ts-expect-error -- Some.when() may return None.
                const output: Some<number> = some(3.14).when(constant(false));

                expect(output).toBe(none());
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Some.when() may return Some.
                const output: None<number> = some(3.14).when(constant(false));

                expect(output).toBe(none());
            });
        });
    });

    describe('otherwise', () => {
        describe('fallback may be present', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = some(3.14).otherwise(fallback(2.71));

                expect(output).toStrictEqual(some(3.14));
            });

            it('returns Some', () => {
                const output: Some<number> = some(3.14).otherwise(fallback(2.71));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Some.otherwise() always returns itself.
                const output: None<number> = some(3.14).otherwise(fallback(2.71));

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('fallback is present', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = some(3.14).otherwise(2.71);

                expect(output).toStrictEqual(some(3.14));
            });

            it('returns Some', () => {
                const output: Some<number> = some(3.14).otherwise(2.71);

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Some.otherwise() always returns itself.
                const output: None<number> = some(3.14).otherwise(2.71);

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = some(3.14).otherwise(constant(2.71));

                expect(output).toStrictEqual(some(3.14));
            });

            it('returns Some', () => {
                const output: Some<number> = some(3.14).otherwise(constant(2.71));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Optional' is not assignable to type 'None'.
                // @ts-expect-error -- Some.otherwise() always returns itself.
                const output: None<number> = some(3.14).otherwise(constant(2.71));

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "fallback" is null', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number | null> = some<number | null>(3.14).otherwise(null);

                expect(output).toStrictEqual(some(3.14));
            });

            it('returns Some null', () => {
                const output: Some<number | null> = some<number | null>(3.14).otherwise(null);

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                //  TS2322: Type 'Some<number | null>' is not assignable to type 'None<number | null>'.
                // @ts-expect-error -- Some.otherwise() always returns itself and null is defined.
                const output: None<number | null> = some<number | null>(3.14).otherwise(null);

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "fallback" returns null', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number | null> = some<number | null>(3.14).otherwise(constant(null));

                expect(output).toStrictEqual(some(3.14));
            });

            it('returns Some', () => {
                const output: Some<number | null> = some<number | null>(3.14).otherwise(constant(null));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Some' is not assignable to type 'None'.
                // @ts-expect-error -- Some.otherwise() always returns itself and null is defined.
                const output: None<number | null> = some<number | null>(3.14).otherwise(constant(null));

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = some(3.14).otherwise(undefined);

                expect(output).toStrictEqual(some(3.14));
            });

            it('returns Some', () => {
                const output: Some<number> = some(3.14).otherwise(undefined);

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Some' is not assignable to type 'None'.
                // @ts-expect-error -- Some.otherwise() always returns itself.
                const output: None<number> = some(3.14).otherwise(undefined);

                expect(output).toStrictEqual(some(3.14));
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('can be assigned to Optional', () => {
                const output: Optional<number> = some(3.14).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(3.14));
            });

            it('returns Some', () => {
                const output: Some<number> = some(3.14).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(3.14));
            });

            it('cannot be assigned to None', () => {
                // TS2322: Type 'Some' is not assignable to type 'None'.
                // @ts-expect-error -- Some.otherwise() always returns itself.
                const output: None<number> = some(3.14).otherwise(constant(undefined));

                expect(output).toStrictEqual(some(3.14));
            });
        });

        it('does not throw an error', () => {
            expect(() => some(3.14).otherwise(panic('Value is absent')))
                .not.toThrow('Value is absent');
        });
    });

    describe('or', () => {
        it('is a shortcut of Optional.otherwise().value', () => {
            expect(some(3.14).or(2.71))
                .toStrictEqual(some(3.14).otherwise(2.71).value);
            expect(some(3.14).or(constant(2.71)))
                .toStrictEqual(some(3.14).otherwise(constant(2.71)).value);
        });

        it('does not throw an error', () => {
            expect(() => some(3.14).or(panic('Value is not present')))
                .not.toThrow('Value is not present');
        });

        describe('fallback is present', () => {
            it('returns the original value', () => {
                const output: string = some('3.14').or('2.71');

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" returns a present value', () => {
            it('returns the original value', () => {
                const output: string = some('3.14').or(constant('2.71'));

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" is null', () => {
            it('returns the original value', () => {
                const output: string | null = some<string | null>('3.14').or(null);

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" returns null', () => {
            it('returns the original value', () => {
                const output: string | null = some<string | null>('3.14').or(constant(null));

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" is undefined', () => {
            it('returns the original value', () => {
                const output: string | null = some('3.14').or(undefined);

                expect(output).toStrictEqual('3.14');
            });
        });

        describe('when the "fallback" returns undefined', () => {
            it('returns the original value', () => {
                const output: string = some('3.14').or(constant(undefined));

                expect(output).toStrictEqual('3.14');
            });
        });
    });

    describe('run', () => {
        let pi: number = 3.14;

        // eslint-disable-next-line func-style -- conflicts with prefer-arrow
        const assignPi = (value: number): Nullary<void> => (): void => {
            pi = value;
        };

        beforeEach(() => {
            pi = 3.14;
        });

        it('runs the given procedure and keeps original value', () => {
            expect(pi).toStrictEqual(3.14);
            expect(some(pi).run(assignPi(3.1415))).toStrictEqual(some(3.14));
            expect(pi).toStrictEqual(3.1415);
        });

        it('can be assigned to Optional', () => {
            const output: Optional<number> = some(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(some(3.14));
        });

        it('returns Some', () => {
            const output: Some<number> = some(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(some(3.14));
        });

        it('cannot be assigned to None', () => {
            // TS2322: Type 'Some' is not assignable to type 'None'.
            // @ts-expect-error -- Some.run returns original Some.
            const output: None<number> = some(pi).run(assignPi(3.1415));

            expect(output).toStrictEqual(some(3.14));
        });
    });

    describe('lift', () => {
        it('accepts functions with strictly-typed input', () => {
            expect(some('3.14').lift(decimal))
                .toStrictEqual(some(3.14));
        });

        it('must be assigned to Optional', () => {
            const output: Optional<boolean> = some(3.14).lift(isPresent);

            expect(output).toStrictEqual(some(true));
        });

        it('cannot be assigned to Some', () => {
            // TS2322: Type 'Optional<number>' is not assignable to type 'Some<boolean>'.
            // @ts-expect-error -- Some.lift() may return None.
            const output: Some<boolean> = some(3.14).lift(constant(2.71));

            expect(output).toStrictEqual(some(2.71));
        });

        it('cannot be assigned to None', () => {
            // TS2322: Type 'Optional<boolean>' is not assignable to type 'None<boolean>'.
            // @ts-expect-error -- None.lift() may return Some.
            const output: None<boolean> = some(3.14).lift<boolean>(constant(null));

            expect(output).toStrictEqual(some(null));
        });
    });
});
