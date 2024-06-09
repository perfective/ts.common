// eslint-disable-next-line max-classes-per-file -- provide example classes required for testing
import { describe, expect, it } from '@jest/globals';

import { TypeGuard } from '../type-guard/type-guard';

import { isInstanceOf, isNotInstanceOf } from './instance';

abstract class Abstraction {
    public abstract name(): string;
}

class Base extends Abstraction {
    public name(): string {
        return 'Base';
    }
}

class Extension
    extends Base {
    public override name(): string {
        return 'Extension';
    }
}

describe(isInstanceOf, () => {
    describe('isInstanceOf() an abstract class', () => {
        const isAbstraction: TypeGuard<unknown, Abstraction> = isInstanceOf(Abstraction);

        describe('when given a child concrete class instance', () => {
            it('returns true', () => {
                expect(isAbstraction(new Base())).toBe(true);
                expect(isAbstraction(new Extension())).toBe(true);
            });
        });

        describe('when given an unrelated concrete class instance', () => {
            it('returns false', () => {
                expect(isAbstraction('')).toBe(false);
                expect(isAbstraction(new Map())).toBe(false);
            });
        });
    });

    describe('isInstanceOf() a concrete class', () => {
        const isBase: TypeGuard<unknown, Base> = isInstanceOf(Base);
        const isError: TypeGuard<unknown, Error> = isInstanceOf(Error);

        describe('when given an instance of the same class', () => {
            it('returns true', () => {
                expect(isBase(new Base())).toBe(true);
                expect(isError(new Error('Error'))).toBe(true);
            });
        });

        describe('when given an instance of a child class', () => {
            it('returns true', () => {
                expect(isBase(new Extension())).toBe(true);
                expect(isError(new TypeError('Error'))).toBe(true);
            });
        });

        describe('when given an instance of an unrelated class', () => {
            const isExtension: TypeGuard<unknown, Extension> = isInstanceOf(Extension);
            // Unclear why without the type hint the return type is TypeGuard<unknown, Error>.
            const isTypeError: TypeGuard<unknown, TypeError> = isInstanceOf<TypeError>(TypeError);

            it('returns false', () => {
                expect(isExtension(new Base())).toBe(false);
                expect(isTypeError(new Error('Error'))).toBe(false);
            });
        });
    });
});

describe(isNotInstanceOf, () => {
    describe('isNotInstanceOf() an abstract class', () => {
        const isNotAbstraction = isNotInstanceOf(Abstraction);

        describe('when given a child concrete class instance', () => {
            it('returns false', () => {
                expect(isNotAbstraction(new Base())).toBe(false);
                expect(isNotAbstraction(new Extension())).toBe(false);
            });
        });

        describe('when given an unrelated concrete class instance', () => {
            it('returns true', () => {
                expect(isNotAbstraction('')).toBe(true);
                expect(isNotAbstraction(new Map())).toBe(true);
            });
        });
    });

    describe('isNotInstanceOf() a concrete class', () => {
        const isNotBase = isNotInstanceOf(Base);
        const isNotError = isNotInstanceOf(Error);

        describe('when given an instance of the same class', () => {
            it('returns false', () => {
                expect(isNotBase(new Base())).toBe(false);
                expect(isNotError(new Error('Error'))).toBe(false);
            });
        });

        describe('when given an instance of a child class', () => {
            it('returns false', () => {
                expect(isNotBase(new Extension())).toBe(false);
                expect(isNotError(new TypeError('Error'))).toBe(false);
            });
        });

        describe('when given an instance of an unrelated class', () => {
            const isNotExtension = isNotInstanceOf(Extension);
            const isNotTypeError = isNotInstanceOf(TypeError);

            it('returns true', () => {
                expect(isNotExtension(new Base())).toBe(true);
                expect(isNotTypeError(new Error('Error'))).toBe(true);
            });
        });
    });
});
