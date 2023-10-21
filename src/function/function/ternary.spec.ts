import { isTernary } from './ternary';

describe(isTernary, () => {
    describe('when a given function accepts three arguments', () => {
        it('returns true', () => {
            expect(isTernary((a: number, b: number, c: number): number => a + b + c))
                .toBe(true);
        });
    });

    describe('when a given function accepts less than three arguments', () => {
        it('returns false', () => {
            expect(isTernary(() => null))
                .toBe(false);
            expect(isTernary((a: number) => a))
                .toBe(false);
            expect(isTernary((a: number, b: number): number => a + b))
                .toBe(false);
        });
    });

    describe('when a given function accepts more than three arguments', () => {
        it('returns false', () => {
            expect(isTernary((a: number, b: number, c: number, d: number): number => a + b + c + d))
                .toBe(false);
        });
    });
});
