import { isFirstOccurrence, isLastOccurrence } from './filter';

describe('isFirstOccurrence', () => {
    it('filters an array keeping the first occurrence of each value', () => {
        expect([0, 0, 1, 2.71, 2.71, 3.14].filter(isFirstOccurrence))
            .toStrictEqual([0, 1, 2.71, 3.14]);
        expect([0, 1, 2.71, 0, 3.14, 2.71].filter(isFirstOccurrence))
            .toStrictEqual([0, 1, 2.71, 3.14]);
    });
});

describe('isLastOccurrence', () => {
    it('filters an array keeping the last occurrence of each value', () => {
        expect([0, 0, 1, 2.71, 2.71, 3.14].filter(isLastOccurrence))
            .toStrictEqual([0, 1, 2.71, 3.14]);
        expect([0, 1, 2.71, 0, 3.14, 2.71].filter(isLastOccurrence))
            .toStrictEqual([1, 0, 3.14, 2.71]);
    });
});
