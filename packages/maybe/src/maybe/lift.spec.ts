import { constant } from '@perfective/fp';
import {
    hasAbsentProperty,
    hasDefinedProperty,
    hasNotNullProperty,
    hasNullProperty,
    hasPresentProperty,
    hasUndefinedProperty,
} from '@perfective/object';
import { decimal, isGreaterThan } from '@perfective/real';
import { isPresent } from '@perfective/value';

import { lift, onto, or, otherwise, pick, run, that, to, when, which } from './lift';
import { Maybe, just, nil, nothing } from './maybe';

const list: Maybe<number>[] = [just(2.71), just(3.14), nothing<number>(), nil<number>()];

function justDecimal(value: number): Maybe<string> {
    return just(value).to<string>(decimal);
}

interface TypeGuardCheck<T> {
    readonly required: T;
    readonly optional?: T;
    readonly option: T | undefined;
    readonly nullable: T | null;
    readonly maybe: T | null | undefined;
    readonly possible?: T | null | undefined;
}

const checks: Maybe<TypeGuardCheck<number>>[] = [
    just({
        required: 2.71,
        optional: 2.71828,
        option: undefined,
        nullable: 2.718,
        maybe: 2.7182,
    }),
    just({
        required: 3.14,
        option: 3.141,
        nullable: null,
        maybe: 3.1415,
        possible: 3.14159,
    }),
    nothing(),
    nil(),
];

describe('onto', () => {
    it('lifts the bind function to the Maybe.onto()', () => {
        expect(list.map(onto(justDecimal)))
            .toStrictEqual([just('2.71'), just('3.14'), nothing(), nil()]);
    });
});

describe('to', () => {
    it('lifts the map function to the Maybe.to()', () => {
        expect(list.map(to<number, string>(decimal)))
            .toStrictEqual([just('2.71'), just('3.14'), nothing(), nil()]);
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
    });
});

describe('otherwise', () => {
    it('lifts a fallback function to the Maybe.otherwise()', () => {
        expect(list.map(otherwise(constant(Number.NEGATIVE_INFINITY))).map(v => v.value))
            .toStrictEqual([2.71, 3.14, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY]);
    });

    it('lifts a fallback constant to the Maybe.otherwise()', () => {
        expect(list.map(otherwise(Number.POSITIVE_INFINITY)).map(v => v.value))
            .toStrictEqual([2.71, 3.14, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]);
    });
});

describe('or', () => {
    it('lifts a fallback function to the Maybe.or()', () => {
        expect(list.map(or(constant(Infinity))))
            .toStrictEqual([2.71, 3.14, Infinity, Infinity]);
    });

    it('lifts a fallback constant to the Maybe.or()', () => {
        expect(list.map(or(-0)))
            .toStrictEqual([2.71, 3.14, -0, -0]);
    });

    it('lifts an undefined to the Maybe.or()', () => {
        expect(list.map(or<number>(undefined)))
            .toStrictEqual([2.71, 3.14, undefined, undefined]);
    });

    it('lifts a null to the Maybe.or()', () => {
        expect(list.map(or<number>(null)))
            .toStrictEqual([2.71, 3.14, null, null]);
    });
});

describe('run', () => {
    it('lifts a procedure to the Maybe.run()', () => {
        const a: (number | null | undefined)[] = [];

        expect(list.map(run(v => a.push(v))))
            .toStrictEqual([just(2.71), just(3.14), nothing(), nil()]);
        expect(a)
            .toStrictEqual([2.71, 3.14]);
    });
});

describe('lift', () => {
    it('lifts a map function to the Maybe.lift()', () => {
        expect(list.map(lift(isPresent)))
            .toStrictEqual([just(true), just(true), just(false), just(false)]);
    });
});
