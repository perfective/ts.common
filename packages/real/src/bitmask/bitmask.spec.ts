import { Enum } from '../enum/enum';

import { Bitmask } from './bitmask';

describe('bitmask<T>', () => {
    it('can be created without a generic type parameter', () => {
        const flags: Bitmask = 0b1001_0110;

        expect(flags).toBe(150);
    });

    it('must be used with a number-based enum', () => {
        enum Bool {
            True = -1,
            False = 0,
        }

        const truth: Bitmask<Enum<Bool>> = Bool.True;

        expect(truth).toBe(-1);
    });

    it('cannot be used with a string-based enum', () => {
        enum Bool {
            True = 'true',
            False = 'false',
        }

        // @ts-expect-error -- Type 'Record<string, Bool>' does not satisfy the constraint 'Record<string, number>'
        const truth: Bitmask<Enum<Bool>> = Bool.True;

        expect(truth).toBe('true');
    });
});
