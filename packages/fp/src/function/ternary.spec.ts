import { isTernary } from './ternary';

describe('isTernary', () => {
    it('returns true when the given function accepts three arguments', () => {
        expect(isTernary((a: number, b: number, c: number): number => a + b + c))
            .toBe(true);
    });

    it('returns false when the given function accepts less than three arguments', () => {
        expect(isTernary(() => null))
            .toBe(false);
        expect(isTernary((a: number) => a))
            .toBe(false);
        expect(isTernary((a: number, b: number): number => a + b))
            .toBe(false);
    });

    it('returns false when the given function accepts more than three arguments', () => {
        expect(isTernary((a: number, b: number, c: number, d: number): number => a + b + c + d))
            .toBe(false);
    });
});
