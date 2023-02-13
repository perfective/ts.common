import { defined, isAbsent, isDefined, isNotNull, isNull, isPresent, isUndefined, notNull, present } from './value';

describe(defined, () => {
    describe('when a value is defined', () => {
        it('returns the given value', () => {
            expect(defined(null)).toBeNull();
        });
    });

    describe('when a value is undefined', () => {
        it('throws an error', () => {
            expect(() => defined(undefined)).toThrow(TypeError);
            expect(() => defined(undefined)).toThrow('Value is undefined');
        });
    });
});

describe('isDefined', () => {
    it('returns true when value is defined', () => {
        expect(isDefined('')).toBe(true);
        expect(isDefined(0)).toBe(true);
        expect(isDefined(false)).toBe(true);
        expect(isDefined(null)).toBe(true);
    });

    it('returns false when value is undefined', () => {
        expect(isDefined(undefined)).toBe(false);
    });
});

describe('isUndefined', () => {
    it('returns false when value is defined', () => {
        expect(isUndefined('')).toBe(false);
        expect(isUndefined(0)).toBe(false);
        expect(isUndefined(false)).toBe(false);
        expect(isUndefined(null)).toBe(false);
    });

    it('returns true when value is undefined', () => {
        expect(isUndefined(undefined)).toBe(true);
    });
});

describe(notNull, () => {
    describe('when a value is not null', () => {
        it('returns the given value', () => {
            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- testing an edge case
            expect(notNull(undefined)).toBeUndefined();
        });
    });

    describe('when a value is null', () => {
        it('throws an error', () => {
            expect(() => notNull(null)).toThrow(TypeError);
            expect(() => notNull(null)).toThrow('Value is null');
        });
    });
});

describe('isNotNull', () => {
    it('returns true when value is not null', () => {
        expect(isNotNull('')).toBe(true);
        expect(isNotNull(0)).toBe(true);
        expect(isNotNull(false)).toBe(true);
        expect(isNotNull(undefined)).toBe(true);
    });

    it('returns false when value is null', () => {
        expect(isNotNull(null)).toBe(false);
    });
});

describe('isNull', () => {
    it('returns false when value is not null', () => {
        expect(isNull('')).toBe(false);
        expect(isNull(0)).toBe(false);
        expect(isNull(false)).toBe(false);
        expect(isNull(undefined)).toBe(false);
    });

    it('returns true when value is null', () => {
        expect(isNull(null)).toBe(true);
    });
});

describe(present, () => {
    describe('when a value is not null and is defined', () => {
        it('returns the given value', () => {
            expect(present(0)).toBe(0);
            expect(present('')).toBe('');
            expect(present(false)).toBe(false);
        });
    });

    describe('when a value is null', () => {
        it('throws an error', () => {
            expect(() => present(null)).toThrow(TypeError);
            expect(() => present(null)).toThrow('Value is null');
        });
    });

    describe('when a value is undefined', () => {
        it('throws an error', () => {
            expect(() => present(undefined)).toThrow(TypeError);
            expect(() => present(undefined)).toThrow('Value is undefined');
        });
    });
});

describe('isPresent', () => {
    it('returns true when value is defined and not null', () => {
        expect(isPresent('')).toBe(true);
        expect(isPresent(0)).toBe(true);
        expect(isPresent(false)).toBe(true);
        expect(isPresent([])).toBe(true);
        expect(isPresent({})).toBe(true);
    });

    it('returns false when value is undefined', () => {
        expect(isPresent(undefined)).toBe(false);
    });

    it('returns false when value is null', () => {
        expect(isPresent(null)).toBe(false);
    });
});

describe('isAbsent', () => {
    it('returns false when value is defined and not null', () => {
        expect(isAbsent('')).toBe(false);
        expect(isAbsent(0)).toBe(false);
        expect(isAbsent(false)).toBe(false);
        expect(isAbsent([])).toBe(false);
        expect(isAbsent({})).toBe(false);
    });

    it('returns true when value is undefined', () => {
        expect(isAbsent(undefined)).toBe(true);
    });

    it('returns true when value is null', () => {
        expect(isAbsent(null)).toBe(true);
    });
});
