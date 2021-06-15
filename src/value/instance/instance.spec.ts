// eslint-disable-next-line max-classes-per-file -- provide example classes required for testing
import { isInstanceOf, isNotInstanceOf } from './instance';

class Base {
    public name(): string {
        return 'Base';
    }
}

class Extension
    extends Base {
    public name(): string {
        return 'Concrete';
    }
}

describe('isInstanceOf', () => {
    describe('isInstanceOf(Type)', () => {
        it('returns true when a value is an instance of the Type', () => {
            expect(isInstanceOf(Base)(new Extension()))
                .toBe(true);
            expect(isInstanceOf(Error)(new TypeError('Error')))
                .toBe(true);
        });

        it('returns false when a value is not an instance of the Type', () => {
            expect(isInstanceOf(Extension)(new Base()))
                .toBe(false);
            expect(isInstanceOf<TypeError>(TypeError)(new Error('Error')))
                .toBe(false);
        });
    });
});

describe('isNotInstanceOf', () => {
    describe('isNotInstanceOf(type)', () => {
        it('returns true when a value is not an instance of the Type', () => {
            expect(isNotInstanceOf(Extension)(new Base()))
                .toBe(true);
            expect(isNotInstanceOf<TypeError>(TypeError)(new Error('Error')))
                .toBe(true);
        });

        it('returns false when a value is an instance of the Type', () => {
            expect(isNotInstanceOf(Base)(new Extension()))
                .toBe(false);
            expect(isNotInstanceOf(Error)(new TypeError('Error')))
                .toBe(false);
        });
    });
});
