import {
    hasAbsentProperty,
    hasDefinedProperty,
    hasNotNullProperty,
    hasNullProperty, hasPresentProperty,
    hasUndefinedProperty,
} from './property';

interface Example {
    a?: number | null;
    b?: string | null;
    c?: boolean | null;
    d?: object | null;
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
