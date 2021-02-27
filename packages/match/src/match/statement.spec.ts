import { isNegativeInteger, isPositiveInteger } from '@perfective/real';

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
    it('creates statements from entries', () => {
        const output = statements<number, number>([
            [isNegativeInteger, square],
            [isZero, 0],
            [isPositiveInteger, cube],
            [true, (): number => Number.POSITIVE_INFINITY],
        ]);

        expect(output[0].condition).toBe(isNegativeInteger);
        expect(output[0].evaluate).toBe(square);
        expect(output[1].condition).toBe(isZero);
        expect(output[1].evaluate(0)).toBe(0);
        expect(output[2].condition).toBe(isPositiveInteger);
        expect(output[2].evaluate).toBe(cube);
        expect(output[3].condition(0)).toBe(true);
        expect(output[3].evaluate(0)).toBe(Number.POSITIVE_INFINITY);
    });
});
