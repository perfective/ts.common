import { ascending, descending } from './sorting';

describe('ascending', () => {
    it('sorts real numbers in ascending order', () => {
        expect([2, 3, 0, -2].sort(ascending))
            .toStrictEqual([-2, 0, 2, 3]);
        expect([-2, 0, 2, 0].sort(ascending))
            .toStrictEqual([-2, 0, 0, 2]);
    });
});

describe('descending', () => {
    it('sorts real numbers in descending order', () => {
        expect([2, 3, 0, -2].sort(descending))
            .toStrictEqual([3, 2, 0, -2]);
        expect([-2, 0, 2, 0].sort(descending))
            .toStrictEqual([2, 0, 0, -2]);
    });
});
