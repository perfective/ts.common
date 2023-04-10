import { Predicate } from '../../boolean';
import { Unary } from '../../function';
import { ascending } from '../../number/number/order';
import { isPresent } from '../../value/value';

import {
    by,
    hasAbsentProperty,
    hasDefinedProperty,
    hasNotNullProperty,
    hasNullProperty,
    hasPresentProperty,
    hasUndefinedProperty,
    property,
} from './property';

interface Pair {
    first: number | null | undefined;
    second?: string | null;
}

describe(property, () => {
    describe('property(property)', () => {
        const output: Unary<Pair, number | null | undefined> = property<Pair, 'first'>('first');

        it('returns a value of a given property from a object', () => {
            expect(output({
                first: 0,
            })).toBe(0);
        });
    });

    describe('property(property, condition)', () => {
        const output: Predicate<Pair> = property<Pair, 'first'>('first', isPresent);

        describe('when the `property` of a given argument satisfies the `condition`', () => {
            it('returns true', () => {
                expect(output({
                    first: 0,
                })).toBe(true);
            });
        });

        describe('when the `property` of a given argument fails the `condition`', () => {
            it('returns false', () => {
                expect(output({
                    first: null,
                })).toBe(false);
            });
        });
    });
});

describe(by, () => {
    describe('by(property, order)', () => {
        const comparator = by<{ first: number; }, 'first'>('first', ascending);

        it('sorts given values with the given `order` callback applied to the given `property`', () => {
            expect([{ first: 1 }, { first: 0 }, { first: -1 }].sort(comparator))
                .toStrictEqual([{ first: -1 }, { first: 0 }, { first: 1 }]);
        });
    });
});

describe(hasDefinedProperty, () => {
    describe('hasDefinedProperty(property)', () => {
        const typeGuard = hasDefinedProperty<Pair, 'first'>('first');

        describe('when a given argument has defined `property`', () => {
            it('returns true', () => {
                expect(typeGuard({
                    first: null,
                })).toBe(true);
            });
        });

        describe('when a given argument has undefined `property`', () => {
            it('returns false', () => {
                expect(typeGuard({
                    first: undefined,
                })).toBe(false);
            });
        });
    });

    describe('hasDefinedProperty(property, ...properties)', () => {
        const typeGuard = hasDefinedProperty<Pair, 'first' | 'second'>('first', 'second');

        describe('when a given argument has all given `properties` defined', () => {
            it('returns true', () => {
                expect(typeGuard({
                    first: null,
                    second: null,
                })).toBe(true);
            });
        });

        describe('when a given argument has at least one of the `properties` undefined', () => {
            it('returns false', () => {
                expect(typeGuard({
                    first: null,
                })).toBe(false);
            });
        });
    });
});

describe(hasUndefinedProperty, () => {
    describe('hasUndefinedProperty(property)', () => {
        const typeGuard = hasUndefinedProperty<Pair, 'first'>('first');

        describe('when a given argument has undefined `property`', () => {
            it('returns true', () => {
                expect(typeGuard({
                    first: undefined,
                })).toBe(true);
            });
        });

        describe('when a given argument has defined `property`', () => {
            it('returns false', () => {
                expect(typeGuard({
                    first: null,
                })).toBe(false);
            });
        });
    });

    describe('hasUndefinedProperty(property, ...properties)', () => {
        const typeGuard = hasUndefinedProperty<Pair, 'first' | 'second'>('first', 'second');

        describe('when a given argument has all `properties` undefined', () => {
            it('returns true', () => {
                expect(typeGuard({
                    first: undefined,
                })).toBe(true);
            });
        });

        describe('when a given arguments has at least one of the `properties` defined', () => {
            it('returns false', () => {
                expect(typeGuard({
                    first: null,
                })).toBe(false);
            });
        });
    });
});

describe(hasNotNullProperty, () => {
    describe('hasNotNullProperty(property)', () => {
        const typeGuard = hasNotNullProperty<Pair, 'first'>('first');

        describe('when a given argument has the `property` not null', () => {
            it('returns true', () => {
                expect(typeGuard({
                    first: undefined,
                })).toBe(true);
            });
        });

        describe('when a given argument has the `property` equal null', () => {
            it('returns false', () => {
                expect(typeGuard({
                    first: null,
                })).toBe(false);
            });
        });
    });

    describe('hasNotNullProperty(property, ...properties)', () => {
        const typeGuard = hasNotNullProperty<Pair, 'first' | 'second'>('first', 'second');

        describe('when a given argument has all `properties` not null', () => {
            it('returns true', () => {
                expect(typeGuard({
                    first: undefined,
                    second: '',
                })).toBe(true);
            });
        });

        describe('when a given argument has at least one of the `properties` equal null', () => {
            it('returns false', () => {
                expect(typeGuard({
                    first: 0,
                    second: null,
                })).toBe(false);
            });
        });
    });
});

describe(hasNullProperty, () => {
    describe('hasNullProperty(property)', () => {
        const typeGuard = hasNullProperty<Pair, 'first'>('first');

        describe('when a given argument has the `property` equal null', () => {
            it('returns true', () => {
                expect(typeGuard({
                    first: null,
                })).toBe(true);
            });
        });

        describe('when a given argument has the `property` not null', () => {
            it('returns false', () => {
                expect(typeGuard({
                    first: 0,
                })).toBe(false);
            });
        });
    });

    describe('hasNullProperty(property, ...properties)', () => {
        const typeGuard = hasNullProperty<Pair, 'first' | 'second'>('first', 'second');

        describe('when a given argument has all `properties` equal null', () => {
            it('returns true', () => {
                expect(typeGuard({
                    first: null,
                    second: null,
                })).toBe(true);
            });
        });

        describe('when a given argument has at least one of the `properties` not null', () => {
            it('returns false', () => {
                expect(typeGuard({
                    first: null,
                })).toBe(false);
            });
        });
    });
});

describe(hasPresentProperty, () => {
    describe('hasPresentProperty(property)', () => {
        const typeGuard = hasPresentProperty<Pair, 'first'>('first');

        describe('when a given argument has the `property` defined', () => {
            it('returns true', () => {
                expect(typeGuard({
                    first: 0,
                })).toBe(true);
            });
        });

        describe('when a given argument has the `property` undefined', () => {
            it('returns false', () => {
                expect(typeGuard({
                    first: undefined,
                })).toBe(false);
            });
        });

        describe('when a given argument has the `property` equal null', () => {
            it('returns false', () => {
                expect(typeGuard({
                    first: null,
                })).toBe(false);
            });
        });
    });

    describe('hasPresentProperty(property, ...properties)', () => {
        const typeGuard = hasPresentProperty<Pair, 'first' | 'second'>('first', 'second');

        describe('when a given argument has all `properties` defined', () => {
            it('returns true', () => {
                expect(typeGuard({
                    first: 0,
                    second: '',
                })).toBe(true);
            });
        });

        describe('when a given argument has one of the `properties` undefined', () => {
            it('returns false', () => {
                expect(typeGuard({
                    first: undefined,
                    second: '',
                })).toBe(false);
            });
        });

        describe('when a given argument has one of the `properties` equal null', () => {
            it('returns false', () => {
                expect(typeGuard({
                    first: null,
                    second: '',
                })).toBe(false);
            });
        });
    });
});

describe(hasAbsentProperty, () => {
    describe('hasAbsentProperty(property)', () => {
        const typeGuard = hasAbsentProperty<Pair, 'first'>('first');

        describe('when a given argument has the `property` undefined', () => {
            it('returns true', () => {
                expect(typeGuard({
                    first: undefined,
                })).toBe(true);
            });
        });

        describe('when a given argument has the `property` equal null', () => {
            it('returns true', () => {
                expect(typeGuard({
                    first: null,
                })).toBe(true);
            });
        });

        describe('when a given argument has the `property` defined', () => {
            it('returns false', () => {
                expect(typeGuard({
                    first: 0,
                })).toBe(false);
            });
        });
    });

    describe('hasAbsentProperty(property, ...properties)', () => {
        const typeGuard = hasAbsentProperty<Pair, 'first' | 'second'>('first', 'second');

        describe('when a given argument has all the `properties` null or undefined', () => {
            it('returns true', () => {
                expect(typeGuard({
                    first: undefined,
                    second: null,
                })).toBe(true);
            });
        });

        describe('when a given argument has at least on of the `properties` defined and not null', () => {
            it('returns false', () => {
                expect(typeGuard({
                    first: undefined,
                    second: '',
                })).toBe(false);
                expect(typeGuard({
                    first: 0,
                    second: null,
                })).toBe(false);
            });
        });
    });
});
