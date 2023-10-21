import { isBinary } from './binary';

describe(isBinary, () => {
    describe('when the given function accepts two arguments', () => {
        it('returns true', () => {
            expect(isBinary((a: number, b: number): number => a + b))
                .toBe(true);
        });
    });

    describe('when the given function accepts less than two arguments', () => {
        it('returns false', () => {
            expect(isBinary(() => null))
                .toBe(false);
            expect(isBinary((a: number) => a))
                .toBe(false);
        });
    });

    describe('when the given function accepts more than two arguments', () => {
        it('returns false', () => {
            expect(isBinary((a: number, b: number, c: number): number => a + b + c))
                .toBe(false);
        });
    });

    describe('when the second argument is variadic', () => {
        it('returns false', () => {
            expect(isBinary((a: number, ...b: number[]): number[] => [a, ...b]))
                .toBe(false);
        });
    });

    describe('when the third argument is variadic', () => {
        it('returns true', () => {
            expect(isBinary((a: number, b: number, ...c: number[]): number[] => [a, b, ...c]))
                .toBe(true);
        });
    });
});
