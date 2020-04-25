import { hasDefinedProperty, hasUndefinedProperty } from './property';

interface Example {
    a?: number;
    b?: string;
    c?: boolean;
    d?: object;
}

const example: Example = {
    a: 0,
    b: '',
};

describe('hasDefinedProperty', () => {
    it('returns true when object property is defined', () => {
        expect(hasDefinedProperty(example, 'a')).toBe(true);
    });

    it('returns false when object property is undefined', () => {
        expect(hasDefinedProperty(example, 'c')).toBe(false);
    });

    it('returns true when all provided properties are defined', () => {
        expect(hasDefinedProperty(example, 'a', 'b')).toBe(true);
    });

    it('returns false when one of the properties is undefined', () => {
        expect(hasDefinedProperty(example, 'a', 'c')).toBe(false);
    });
});

describe('hasUndefinedProperty', () => {
    it('returns true when object property is undefined', () => {
        expect(hasUndefinedProperty(example, 'c')).toBe(true);
    });

    it('returns false when object property is undefined', () => {
        expect(hasUndefinedProperty(example, 'a')).toBe(false);
    });

    it('returns true when all provided properties are undefined', () => {
        expect(hasUndefinedProperty(example, 'c', 'd')).toBe(true);
    });

    it('returns false when one of the properties is defined', () => {
        expect(hasUndefinedProperty(example, 'a', 'c')).toBe(false);
    });
});
