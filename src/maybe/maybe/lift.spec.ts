import { constant } from '../../function/function/nullary';
import { decimal } from '../../number/number/base';
import { isGreaterThan } from '../../number/number/order';
import {
    hasAbsentProperty,
    hasDefinedProperty,
    hasNotNullProperty,
    hasNullProperty,
    hasPresentProperty,
    hasUndefinedProperty,
} from '../../object/property/property';
import { isPresent } from '../../value/value';

import { into, onto, or, otherwise, pick, that, through, to, when, which } from './lift';
import { just, Maybe, maybeFrom, nil, nothing } from './maybe';
import { TypeGuardCheck } from './type-guard-check.mock';

const list: Maybe<number>[] = [just(2.71), just(3.14), nothing(), nil()];

function maybeDecimal(value: number): Maybe<string> {
    return just(value).to<string>(decimal);
}

const checkEuler: Maybe<TypeGuardCheck> = just({
    required: 2.71,
    optional: 2.71828,
    option: undefined,
    nullable: 2.718,
    maybe: 2.7182,
} as TypeGuardCheck);

const checkPi: Maybe<TypeGuardCheck> = just<TypeGuardCheck>({
    required: 3.14,
    option: 3.141,
    nullable: null,
    maybe: 3.1415,
    possible: 3.14159,
});

const checks: Maybe<TypeGuardCheck>[] = [checkEuler, checkPi, nothing(), nil()];

describe('onto', () => {
    it('lifts the bind function to the Maybe.onto()', () => {
        expect(list.map(onto(maybeDecimal)))
            .toStrictEqual([just('2.71'), just('3.14'), nothing(), nil()]);
    });
});

describe('to', () => {
    it('lifts the map function to the Maybe.to()', () => {
        expect(list.map(to<number, string>(decimal)))
            .toStrictEqual([just('2.71'), just('3.14'), nothing(), nil()]);
        expect(list.map(to((): string | undefined => undefined)))
            .toStrictEqual([nothing(), nothing(), nothing(), nil()]);
        expect(list.map(to((): string | null => null)))
            .toStrictEqual([nil(), nil(), nothing(), nil()]);
    });
});

describe(into, () => {
    it('lifts the given `reduce` callback to the Maybe.into()', () => {
        expect(list.map(into(isPresent)))
            .toStrictEqual([true, true, false, false]);
    });

    it('can be used with into(maybeFrom) to lift values', () => {
        expect(list.map(into(maybeFrom(isPresent))))
            .toStrictEqual([just(true), just(true), just(false), just(false)]);
    });
});

describe('that', () => {
    it('lifts the filter function to the Maybe.that()', () => {
        expect(list.map(that(isGreaterThan(3))))
            .toStrictEqual([nothing(), just(3.14), nothing(), nil()]);
    });
});

describe('which', () => {
    it('lifts the filter function to the Maybe.which()', () => {
        /* eslint-disable jest/max-expects -- check all test properties */
        expect(checks.map(which(hasPresentProperty('required'))).map(pick('required')))
            .toStrictEqual([just(2.71), just(3.14), nothing(), nil()]);
        expect(checks.map(which(hasAbsentProperty('required'))).map(pick('required')))
            .toStrictEqual([nothing(), nothing(), nothing(), nil()]);
        expect(checks.map(which(hasDefinedProperty('option'))).map(pick('required')))
            .toStrictEqual([nothing(), just(3.14), nothing(), nil()]);
        expect(checks.map(which(hasUndefinedProperty('option'))).map(pick('required')))
            .toStrictEqual([just(2.71), nothing(), nothing(), nil()]);
        expect(checks.map(which(hasDefinedProperty('optional'))).map(pick('required')))
            .toStrictEqual([just(2.71), nothing(), nothing(), nil()]);
        expect(checks.map(which(hasUndefinedProperty('optional'))).map(pick('required')))
            .toStrictEqual([nothing(), just(3.14), nothing(), nil()]);
        expect(checks.map(which(hasNotNullProperty('nullable'))).map(pick('required')))
            .toStrictEqual([just(2.71), nothing(), nothing(), nil()]);
        expect(checks.map(which(hasNullProperty('nullable'))).map(pick('required')))
            .toStrictEqual([nothing(), just(3.14), nothing(), nil()]);
        expect(checks.map(which(hasPresentProperty('maybe'))).map(pick('maybe')))
            .toStrictEqual([just(2.7182), just(3.1415), nothing(), nil()]);
        expect(checks.map(which(hasAbsentProperty('maybe'))).map(pick('maybe')))
            .toStrictEqual([nothing(), nothing(), nothing(), nil()]);
        expect(checks.map(which(hasPresentProperty('possible'))).map(pick('required')))
            .toStrictEqual([nothing(), just(3.14), nothing(), nil()]);
        expect(checks.map(which(hasAbsentProperty('possible'))).map(pick('required')))
            .toStrictEqual([just(2.71), nothing(), nothing(), nil()]);
        /* eslint-enable jest/max-expects */
    });
});

describe('when', () => {
    it('lifts the filter function to the Maybe.when()', () => {
        expect(list.map(when(false)))
            .toStrictEqual([nothing(), nothing(), nothing(), nil()]);
    });
});

describe('pick', () => {
    it('lifts the property selector to the Maybe.pick()', () => {
        expect(checks.map(pick('maybe')))
            .toStrictEqual([just(2.7182), just(3.1415), nothing(), nil()]);
        expect(checks.map(pick(() => 'maybe')))
            .toStrictEqual([just(2.7182), just(3.1415), nothing(), nil()]);
        expect(checks.map(pick(constant<keyof TypeGuardCheck>('maybe'))))
            .toStrictEqual([just(2.7182), just(3.1415), nothing(), nil()]);
    });
});

describe('otherwise', () => {
    it('lifts a fallback function to the Maybe.otherwise()', () => {
        expect(list.map(otherwise(constant(Number.NEGATIVE_INFINITY))).map(v => v.value))
            .toStrictEqual([2.71, 3.14, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY]);
        expect(list.map(otherwise<number>(constant(null))).map(v => v.value))
            .toStrictEqual([2.71, 3.14, null, null]);
        expect(list.map(otherwise<number>(constant(undefined))).map(v => v.value))
            .toStrictEqual([2.71, 3.14, undefined, undefined]);
    });

    it('lifts a fallback constant to the Maybe.otherwise()', () => {
        expect(list.map(otherwise(Number.POSITIVE_INFINITY)).map(v => v.value))
            .toStrictEqual([2.71, 3.14, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]);
        expect(list.map(otherwise<number>(null)).map(v => v.value))
            .toStrictEqual([2.71, 3.14, null, null]);
        expect(list.map(otherwise<number>(undefined)).map(v => v.value))
            .toStrictEqual([2.71, 3.14, undefined, undefined]);
    });
});

describe('or', () => {
    it('lifts a fallback constant to the Maybe.or()', () => {
        expect(list.map(or(-0)))
            .toStrictEqual([2.71, 3.14, -0, -0]);
    });

    it('lifts a fallback function to the Maybe.or()', () => {
        expect(list.map(or(constant(Number.POSITIVE_INFINITY))))
            .toStrictEqual([2.71, 3.14, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]);
        expect(list.map(or<number>((): number | null | undefined => Number.POSITIVE_INFINITY)))
            .toStrictEqual([2.71, 3.14, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]);
        expect(list.map(or<number>((): number | null => Number.POSITIVE_INFINITY)))
            .toStrictEqual([2.71, 3.14, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]);
        expect(list.map(or<number>((): number | undefined => Number.POSITIVE_INFINITY)))
            .toStrictEqual([2.71, 3.14, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]);
    });

    it('lifts a fallback to null to the Maybe.or()', () => {
        expect(list.map(or<number>(null)))
            .toStrictEqual([2.71, 3.14, null, null]);
    });

    it('lifts a fallback that returns null to the Maybe.or()', () => {
        expect(list.map(or<number>((): null | undefined => null)))
            .toStrictEqual([2.71, 3.14, null, null]);
        expect(list.map(or<number>(() => null)))
            .toStrictEqual([2.71, 3.14, null, null]);
    });

    it('lifts a fallback to undefined to the Maybe.or()', () => {
        expect(list.map(or<number>(undefined)))
            .toStrictEqual([2.71, 3.14, undefined, undefined]);
    });

    it('lifts a fallback that returns undefined to the Maybe.or()', () => {
        expect(list.map(or<number>(() => undefined)))
            .toStrictEqual([2.71, 3.14, undefined, undefined]);
    });
});

describe('through', () => {
    it('lifts a procedure to the Maybe.through()', () => {
        const a: (number | null | undefined)[] = [];

        expect(list.map(through(v => a.push(v))))
            .toStrictEqual([just(2.71), just(3.14), nothing(), nil()]);
        expect(a)
            .toStrictEqual([2.71, 3.14]);
    });
});
