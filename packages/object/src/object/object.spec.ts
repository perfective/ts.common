import { copy } from './object';

describe('copy', () => {
    it('creates a shallow copy of an array', () => {
        const input: string[] = ['a', 'b', 'c'];
        const output: string[] = copy(input);

        expect(output).not.toBe(input);
        expect(output).toStrictEqual(input);
        expect(output[0]).toBe(input[0]);
    });

    it('creates a shallow copy of a plain object', () => {
        interface Example {
            array: string[];
        }
        const input: Example = {
            array: ['a', 'b', 'c'],
        };
        const output: Example = copy(input);

        expect(output).not.toBe(input);
        expect(output).toStrictEqual(input);
        expect(output.array).toBe(input.array);
    });

    it('returns the original object when the value is a Date', () => {
        const date: Date = new Date();

        expect(copy(date)).toBe(date);
    });

    it('returns the original object when the value is a Map', () => {
        const map: Map<string, number> = new Map([['pi', 3.14]]);

        expect(copy(map)).toBe(map);
    });

    it('returns the original value if it is a primitive', () => {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- testing undefined value
        expect(copy(undefined)).toBeUndefined();
        expect(copy(null)).toBeNull();
        expect(copy('')).toBe('');
        expect(copy(3.14)).toBe(3.14);
    });
});
