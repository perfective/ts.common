import {
    absentProperty,
    definedProperty,
    hasAbsentProperty,
    hasDefinedProperty,
    hasNotNullProperty,
    hasNullProperty,
    hasPresentProperty,
    hasUndefinedProperty,
    notNullProperty,
    nullProperty,
    presentProperty,
    undefinedProperty,
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

describe('hasDefinedProperty', () => {
    it('returns true when object property is defined', () => {
        expect(hasDefinedProperty(optional, 'a')).toBe(true);
    });

    it('returns false when object property is undefined', () => {
        expect(hasDefinedProperty(optional, 'c')).toBe(false);
    });

    it('returns true when all provided properties are defined', () => {
        expect(hasDefinedProperty(optional, 'a', 'b')).toBe(true);
    });

    it('returns false when one of the properties is undefined', () => {
        expect(hasDefinedProperty(optional, 'a', 'c')).toBe(false);
    });
});

describe('definedProperty', () => {
    it('returns a function that returns true when object property is defined', () => {
        expect(definedProperty<Example, 'a'>('a')(optional)).toBe(true);
    });

    it('returns a function that returns false when object property is undefined', () => {
        expect(definedProperty<Example, 'c'>('c')(optional)).toBe(false);
    });

    it('returns a function that returns true when all provided properties are defined', () => {
        expect(definedProperty<Example, 'a' | 'b'>('a', 'b')(optional)).toBe(true);
    });

    it('returns a function that returns false when one of the properties is undefined', () => {
        expect(definedProperty<Example, 'a' | 'c'>('a', 'c')(optional)).toBe(false);
    });
});

describe('hasUndefinedProperty', () => {
    it('returns true when object property is undefined', () => {
        expect(hasUndefinedProperty(optional, 'c')).toBe(true);
    });

    it('returns false when object property is defined', () => {
        expect(hasUndefinedProperty(optional, 'a')).toBe(false);
    });

    it('returns true when all provided properties are undefined', () => {
        expect(hasUndefinedProperty(optional, 'c', 'd')).toBe(true);
    });

    it('returns false when one of the properties is defined', () => {
        expect(hasUndefinedProperty(optional, 'a', 'c')).toBe(false);
    });
});

describe('undefinedProperty', () => {
    it('returns a function that returns true when object property is undefined', () => {
        expect(undefinedProperty<Example, 'c'>('c')(optional)).toBe(true);
    });

    it('returns a function that returns false when object property is defined', () => {
        expect(undefinedProperty<Example, 'a'>('a')(optional)).toBe(false);
    });

    it('returns a function that returns true when all provided properties are undefined', () => {
        expect(undefinedProperty<Example, 'c' | 'd'>('c', 'd')(optional)).toBe(true);
    });

    it('returns a function that returns false when one of the properties is defined', () => {
        expect(undefinedProperty<Example, 'a' | 'c'>('a', 'c')(optional)).toBe(false);
    });
});

const nullable: Example = {
    a: 0,
    b: '',
    c: null,
    d: null,
};

describe('hasNotNullProperty', () => {
    it('returns true when object property is not null', () => {
        expect(hasNotNullProperty(nullable, 'a')).toBe(true);
    });

    it('returns false when object property is null', () => {
        expect(hasNotNullProperty(nullable, 'c')).toBe(false);
    });

    it('returns true when all provided properties are not null', () => {
        expect(hasNotNullProperty(nullable, 'a', 'b')).toBe(true);
    });

    it('returns false when one of the properties is null', () => {
        expect(hasNotNullProperty(nullable, 'a', 'c')).toBe(false);
    });
});

describe('notNullProperty', () => {
    it('returns a function that returns true when object property is not null', () => {
        expect(notNullProperty<Example, 'a'>('a')(nullable)).toBe(true);
    });

    it('returns a function that returns false when object property is null', () => {
        expect(notNullProperty<Example, 'c'>('c')(nullable)).toBe(false);
    });

    it('returns a function that returns true when all provided properties are not null', () => {
        expect(notNullProperty<Example, 'a' | 'b'>('a', 'b')(nullable)).toBe(true);
    });

    it('returns a function that returns false when one of the properties is null', () => {
        expect(notNullProperty<Example, 'a' | 'c'>('a', 'c')(nullable)).toBe(false);
    });
});

describe('hasNullProperty', () => {
    it('returns true when object property is null', () => {
        expect(hasNullProperty(nullable, 'c')).toBe(true);
    });

    it('returns false when object property is not null', () => {
        expect(hasNullProperty(nullable, 'a')).toBe(false);
    });

    it('returns true when all provided properties are null', () => {
        expect(hasNullProperty(nullable, 'c', 'd')).toBe(true);
    });

    it('returns false when one of the properties is not null', () => {
        expect(hasNullProperty(nullable, 'a', 'c')).toBe(false);
    });
});

describe('nullProperty', () => {
    it('returns a function that returns true when object property is null', () => {
        expect(nullProperty<Example, 'c'>('c')(nullable)).toBe(true);
    });

    it('returns a function that returns false when object property is not null', () => {
        expect(nullProperty<Example, 'a'>('a')(nullable)).toBe(false);
    });

    it('returns a function that returns true when all provided properties are null', () => {
        expect(nullProperty<Example, 'c' | 'd'>('c', 'd')(nullable)).toBe(true);
    });

    it('returns a function that returns false when one of the properties is not null', () => {
        expect(nullProperty<Example, 'a' | 'c'>('a', 'c')(nullable)).toBe(false);
    });
});

const absent: Example = {
    a: 0,
    b: '',
    c: null,
};

describe('hasPresentProperty', () => {
    it('returns true when object property is defined', () => {
        expect(hasPresentProperty(absent, 'a')).toBe(true);
    });

    it('returns false when object property is undefined', () => {
        expect(hasPresentProperty(absent, 'd')).toBe(false);
    });

    it('returns false when object property is null', () => {
        expect(hasPresentProperty(absent, 'c')).toBe(false);
    });

    it('returns true when all provided properties are defined', () => {
        expect(hasPresentProperty(absent, 'a', 'b')).toBe(true);
    });

    it('returns false when one of the properties is undefined', () => {
        expect(hasPresentProperty(absent, 'a', 'c')).toBe(false);
    });

    it('returns false when one of the properties is null', () => {
        expect(hasPresentProperty(absent, 'a', 'd')).toBe(false);
    });
});

describe('presentProperty', () => {
    it('returns a function that returns true when object property is defined', () => {
        expect(presentProperty<Example, 'a'>('a')(absent)).toBe(true);
    });

    it('returns a function that returns false when object property is undefined', () => {
        expect(presentProperty<Example, 'd'>('d')(absent)).toBe(false);
    });

    it('returns a function that returns false when object property is null', () => {
        expect(presentProperty<Example, 'c'>('c')(absent)).toBe(false);
    });

    it('returns a function that returns true when all provided properties are defined', () => {
        expect(presentProperty<Example, 'a' | 'b'>('a', 'b')(absent)).toBe(true);
    });

    it('returns a function that returns false when one of the properties is undefined', () => {
        expect(presentProperty<Example, 'a' | 'c'>('a', 'c')(absent)).toBe(false);
    });

    it('returns a function that returns false when one of the properties is null', () => {
        expect(presentProperty<Example, 'a' | 'd'>('a', 'd')(absent)).toBe(false);
    });
});

describe('hasAbsentProperty', () => {
    it('returns true when object property is undefined', () => {
        expect(hasAbsentProperty(absent, 'd')).toBe(true);
    });

    it('returns true when object property is null', () => {
        expect(hasAbsentProperty(absent, 'c')).toBe(true);
    });

    it('returns false when object property is defined', () => {
        expect(hasAbsentProperty(absent, 'a')).toBe(false);
    });

    it('returns true when all provided properties are undefined or null', () => {
        expect(hasAbsentProperty(absent, 'c', 'd')).toBe(true);
    });

    it('returns false when one of the properties is defined', () => {
        expect(hasAbsentProperty(absent, 'a', 'c')).toBe(false);
    });
});

describe('absentProperty', () => {
    it('returns a function that returns true when object property is undefined', () => {
        expect(absentProperty<Example, 'd'>('d')(absent)).toBe(true);
    });

    it('returns a function that returns true when object property is null', () => {
        expect(absentProperty<Example, 'c'>('c')(absent)).toBe(true);
    });

    it('returns a function that returns false when object property is defined', () => {
        expect(absentProperty<Example, 'a'>('a')(absent)).toBe(false);
    });

    it(
        'returns a function that returns true when all provided properties are undefined or null',
        () => {
            expect(absentProperty<Example, 'c' | 'd'>('c', 'd')(absent)).toBe(true);
        },
    );

    it('returns a function that returns false when one of the properties is defined', () => {
        expect(absentProperty<Example, 'a' | 'c'>('a', 'c')(absent)).toBe(false);
    });
});
