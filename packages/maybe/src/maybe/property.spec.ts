import {
    hasDefinedProperty,
    hasNotNullProperty,
    hasNullProperty,
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

    it('returns false when object property is undefined', () => {
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
    it('returns true when object property is defined', () => {
        expect(hasNotNullProperty(nullable, 'a')).toBe(true);
    });

    it('returns false when object property is undefined', () => {
        expect(hasNotNullProperty(nullable, 'c')).toBe(false);
    });

    it('returns true when all provided properties are defined', () => {
        expect(hasNotNullProperty(nullable, 'a', 'b')).toBe(true);
    });

    it('returns false when one of the properties is undefined', () => {
        expect(hasNotNullProperty(nullable, 'a', 'c')).toBe(false);
    });
});

describe('hasNullProperty', () => {
    it('returns true when object property is undefined', () => {
        expect(hasNullProperty(nullable, 'c')).toBe(true);
    });

    it('returns false when object property is undefined', () => {
        expect(hasNullProperty(nullable, 'a')).toBe(false);
    });

    it('returns true when all provided properties are undefined', () => {
        expect(hasNullProperty(nullable, 'c', 'd')).toBe(true);
    });

    it('returns false when one of the properties is defined', () => {
        expect(hasNullProperty(nullable, 'a', 'c')).toBe(false);
    });
});
