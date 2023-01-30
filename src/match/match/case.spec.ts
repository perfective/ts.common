import { isNegativeInteger, isPositiveInteger } from '../../number/number/integer';

import { CaseEntry, fromEntries, statements } from './case';

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
    it('creates a statement with constant evaluation from an entry with a constant', () => {
        const output = fromEntries<number, number>([
            [isZero, 0],
        ]);

        expect(output[0].condition).toBe(isZero);
        expect(output[0].statement(0)).toBe(0);
    });

    it('creates a statement with evaluation for an entry with an anonymous functions', () => {
        const output = fromEntries<number, number>([
            [true, (): number => Number.POSITIVE_INFINITY],
        ]);

        expect(output[0].condition(0)).toBe(true);
        expect(output[0].statement(0)).toBe(Number.POSITIVE_INFINITY);
    });

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

/* eslint-disable deprecation/deprecation -- TODO: Remove in v0.10.0 */
describe(statements, () => {
    it('calls `fromEntries`', () => {
        const input: CaseEntry<number, number>[] = [
            [isZero, 0],
        ];

        const outputStatements = statements<number, number>(input);
        const outputCases = fromEntries(input);

        expect(outputStatements[0].condition).toBe(outputCases[0].condition);
        expect(outputStatements[0].statement.toString()).toBe(outputCases[0].statement.toString());
    });
});
/* eslint-enable deprecation/deprecation */
