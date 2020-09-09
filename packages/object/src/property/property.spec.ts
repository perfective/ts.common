import {
    hasAbsentProperty,
    hasDefinedProperty,
    hasNotNullProperty,
    hasNullProperty,
    hasPresentProperty,
    hasUndefinedProperty,
    property,
} from './property';

interface Example {
    a?: number | null;
    b?: string | null;
    c?: boolean | null;
    d?: Record<string, unknown> | null;
}

const optional: Example = {
    a: 0,
    b: '',
};

describe('property', () => {
    describe('property(property)', () => {
        it('picks an existing property value from an object', () => {
            expect(property<Example, 'a'>('a')(optional))
                .toStrictEqual(0);
        });
    });
});

describe('hasDefinedProperty', () => {
    it('returns a function that returns true when object property is defined', () => {
        expect(hasDefinedProperty<Example, 'a'>('a')(optional)).toBe(true);
    });

    it('returns a function that returns false when object property is undefined', () => {
        expect(hasDefinedProperty<Example, 'c'>('c')(optional)).toBe(false);
    });

    it('returns a function that returns true when all provided properties are defined', () => {
        expect(hasDefinedProperty<Example, 'a' | 'b'>('a', 'b')(optional)).toBe(true);
    });

    it('returns a function that returns false when one of the properties is undefined', () => {
        expect(hasDefinedProperty<Example, 'a' | 'c'>('a', 'c')(optional)).toBe(false);
    });
});

describe('hasUndefinedProperty', () => {
    it('returns a function that returns true when object property is undefined', () => {
        expect(hasUndefinedProperty<Example, 'c'>('c')(optional)).toBe(true);
    });

    it('returns a function that returns false when object property is defined', () => {
        expect(hasUndefinedProperty<Example, 'a'>('a')(optional)).toBe(false);
    });

    it('returns a function that returns true when all provided properties are undefined', () => {
        expect(hasUndefinedProperty<Example, 'c' | 'd'>('c', 'd')(optional)).toBe(true);
    });

    it('returns a function that returns false when one of the properties is defined', () => {
        expect(hasUndefinedProperty<Example, 'a' | 'c'>('a', 'c')(optional)).toBe(false);
    });
});

const nullable: Example = {
    a: 0,
    b: '',
    c: null,
    d: null,
};

describe('hasNotNullProperty', () => {
    it('returns a function that returns true when object property is not null', () => {
        expect(hasNotNullProperty<Example, 'a'>('a')(nullable)).toBe(true);
    });

    it('returns a function that returns false when object property is null', () => {
        expect(hasNotNullProperty<Example, 'c'>('c')(nullable)).toBe(false);
    });

    it('returns a function that returns true when all provided properties are not null', () => {
        expect(hasNotNullProperty<Example, 'a' | 'b'>('a', 'b')(nullable)).toBe(true);
    });

    it('returns a function that returns false when one of the properties is null', () => {
        expect(hasNotNullProperty<Example, 'a' | 'c'>('a', 'c')(nullable)).toBe(false);
    });
});

describe('hasNullProperty', () => {
    it('returns a function that returns true when object property is null', () => {
        expect(hasNullProperty<Example, 'c'>('c')(nullable)).toBe(true);
    });

    it('returns a function that returns false when object property is not null', () => {
        expect(hasNullProperty<Example, 'a'>('a')(nullable)).toBe(false);
    });

    it('returns a function that returns true when all provided properties are null', () => {
        expect(hasNullProperty<Example, 'c' | 'd'>('c', 'd')(nullable)).toBe(true);
    });

    it('returns a function that returns false when one of the properties is not null', () => {
        expect(hasNullProperty<Example, 'a' | 'c'>('a', 'c')(nullable)).toBe(false);
    });
});

const absent: Example = {
    a: 0,
    b: '',
    c: null,
};

describe('hasPresentProperty', () => {
    it('returns a function that returns true when object property is defined', () => {
        expect(hasPresentProperty<Example, 'a'>('a')(absent)).toBe(true);
    });

    it('returns a function that returns false when object property is undefined', () => {
        expect(hasPresentProperty<Example, 'd'>('d')(absent)).toBe(false);
    });

    it('returns a function that returns false when object property is null', () => {
        expect(hasPresentProperty<Example, 'c'>('c')(absent)).toBe(false);
    });

    it('returns a function that returns true when all provided properties are defined', () => {
        expect(hasPresentProperty<Example, 'a' | 'b'>('a', 'b')(absent)).toBe(true);
    });

    it('returns a function that returns false when one of the properties is undefined', () => {
        expect(hasPresentProperty<Example, 'a' | 'c'>('a', 'c')(absent)).toBe(false);
    });

    it('returns a function that returns false when one of the properties is null', () => {
        expect(hasPresentProperty<Example, 'a' | 'd'>('a', 'd')(absent)).toBe(false);
    });
});

describe('hasAbsentProperty', () => {
    it('returns a function that returns true when object property is undefined', () => {
        expect(hasAbsentProperty<Example, 'd'>('d')(absent)).toBe(true);
    });

    it('returns a function that returns true when object property is null', () => {
        expect(hasAbsentProperty<Example, 'c'>('c')(absent)).toBe(true);
    });

    it('returns a function that returns false when object property is defined', () => {
        expect(hasAbsentProperty<Example, 'a'>('a')(absent)).toBe(false);
    });

    it('returns a function that returns true when all provided properties are undefined or null', () => {
        expect(hasAbsentProperty<Example, 'c' | 'd'>('c', 'd')(absent)).toBe(true);
    });

    it('returns a function that returns false when one of the properties is defined', () => {
        expect(hasAbsentProperty<Example, 'a' | 'c'>('a', 'c')(absent)).toBe(false);
    });
});
