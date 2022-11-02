import { isNegativeInteger, isPositiveInteger } from '../../number/number/integer';

import { statements } from './statement';

function square(x: number): number {
    return x ** 2;
}

function cube(x: number): number {
    return x ** 3;
}

function isZero(x: number): boolean {
    return x === 0;
}

describe(statements, () => {
    it('creates a statement with constant evaluation from an entry with a constant', () => {
        const output = statements<number, number>([
            [isZero, 0],
        ]);

        expect(output[0].condition).toBe(isZero);
        expect(output[0].evaluate(0)).toBe(0);
    });

    it('creates a statement with evaluation for an entry with an anonymous functions', () => {
        const output = statements<number, number>([
            [true, (): number => Number.POSITIVE_INFINITY],
        ]);

        expect(output[0].condition(0)).toBe(true);
        expect(output[0].evaluate(0)).toBe(Number.POSITIVE_INFINITY);
    });

    it('maintains the order of statements', () => {
        const output = statements<number, number>([
            [isNegativeInteger, square],
            [isPositiveInteger, cube],
        ]);

        expect(output[0].condition).toBe(isNegativeInteger);
        expect(output[0].evaluate).toBe(square);
        expect(output[1].condition).toBe(isPositiveInteger);
        expect(output[1].evaluate).toBe(cube);
    });
});
