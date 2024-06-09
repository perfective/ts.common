import { describe, expect, it } from '@jest/globals';

import { Member, members } from './enum';

enum NumericDirection {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3,
}

enum StringDirection {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right',
}

/* eslint-disable @typescript-eslint/no-mixed-enums -- testing mixed enums */
enum MixedDirection {
    Up = 1,
    Right = 'right',
    Down = -1,
    Left = 'left',
}
/* eslint-enable @typescript-eslint/no-mixed-enums */

describe(members, () => {
    it('returns keys of a numeric enum', () => {
        const directions: Member<NumericDirection>[] = members(NumericDirection);

        expect(directions).toStrictEqual(['Up', 'Down', 'Left', 'Right']);
    });

    it('returns keys of a string enum', () => {
        const directions: Member<StringDirection>[] = members(StringDirection);

        expect(directions).toStrictEqual(['Up', 'Down', 'Left', 'Right']);
    });

    it('returns keys of a mixed enum', () => {
        const directions: Member<MixedDirection>[] = members(MixedDirection);

        expect(directions).toStrictEqual(['Up', 'Right', 'Down', 'Left']);
    });
});
