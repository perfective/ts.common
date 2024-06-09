import { describe, expect, it } from '@jest/globals';

import { isNegativeInteger, isPositiveInteger } from '../../number/number/integer';

import { caseFromEntry, fromEntries } from './case';

function square(x: number): number {
    return x ** 2;
}

function cube(x: number): number {
    return x ** 3;
}

function isZero(x: number): boolean {
    return x === 0;
}

describe(fromEntries, () => {
    it('maintains the order of statements', () => {
        const output = fromEntries<number, number>([
            [isNegativeInteger, square],
            [isPositiveInteger, cube],
        ]);

        expect(output[0].condition).toBe(isNegativeInteger);
        expect(output[0].statement).toBe(square);
        expect(output[1].condition).toBe(isPositiveInteger);
        expect(output[1].statement).toBe(cube);
    });
});

describe(caseFromEntry, () => {
    describe('when given a statement value', () => {
        it('creates a statement with constant evaluation', () => {
            const output = caseFromEntry<number, number>([isZero, 0]);

            expect(output.condition).toBe(isZero);
            expect(output.statement(0)).toBe(0);
        });
    });

    describe('when given a statement function', () => {
        it('creates a statement with evaluation', () => {
            const output = caseFromEntry<number, number>([true, (): number => Number.POSITIVE_INFINITY]);

            expect(output.condition(0)).toBe(true);
            expect(output.statement(0)).toBe(Number.POSITIVE_INFINITY);
        });
    });
});
