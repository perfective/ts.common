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

enum MixedDirection {
    Up = 1,
    Right = 'right',
    Down = -1,
    Left = 'left',
}

describe('members', () => {
    it('returns keys of a numeric enum', () => {
        // "keyof Direction" are keys of a Number.
        const directions: Member<NumericDirection>[] = members(NumericDirection);

        expect(directions).toStrictEqual(['Up', 'Down', 'Left', 'Right']);
    });

    it('returns keys of a string enum', () => {
        // "keyof Direction" are keys of a Number.
        const directions: Member<StringDirection>[] = members(StringDirection);

        expect(directions).toStrictEqual(['Up', 'Down', 'Left', 'Right']);
    });

    it('returns keys of a mixed enum', () => {
        // "keyof Direction" are keys of a Number.
        const directions: Member<MixedDirection>[] = members(MixedDirection);

        expect(directions).toStrictEqual(['Up', 'Right', 'Down', 'Left']);
    });
});
