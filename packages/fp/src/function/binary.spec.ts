import { isBinary } from './binary';

describe('isBinary', () => {
    it('returns true when the given function accepts two arguments', () => {
        expect(isBinary((a: number, b: number): number => a + b))
            .toBe(true);
    });

    it('returns false when the given function accepts less than two arguments', () => {
        expect(isBinary(() => null))
            .toBe(false);
        expect(isBinary((a: number) => a))
            .toBe(false);
    });

    it('returns false when the given function accepts more than two arguments', () => {
        expect(isBinary((a: number, b: number, c: number): number => a + b + c))
            .toBe(false);
    });
});
