import { difference, product, quotient, remainder, sum } from './arithmetic';

describe('sum', () => {
    it('is commutative', () => {
        expect(sum(2, 3))
            .toStrictEqual(sum(3, 2));
    });

    it('is associative', () => {
        expect(sum(2, sum(3, 4)))
            .toStrictEqual(sum(sum(2, 3), 4));
    });

    it('has identity element 0', () => {
        expect(sum(2, 0))
            .toStrictEqual(2);
        expect(sum(0, 2))
            .toStrictEqual(2);
    });

    it('can be used to reduce an array of numbers', () => {
        expect([8, 5, 3, 2, 1].reduce(sum))
            .toStrictEqual(19);
    });
});

describe('difference', () => {
    it('is anti-commutative', () => {
        expect(difference(5, 3))
            .toStrictEqual(-difference(3, 5));
    });
});

describe('product', () => {
    it('is commutative', () => {
        expect(product(3, 5))
            .toStrictEqual(product(5, 3));
    });

    it('is associative', () => {
        expect(product(3, product(5, 7)))
            .toStrictEqual(product(product(3, 5), 7));
    });

    it('is distributive', () => {
        expect(product(3, sum(5, 7)))
            .toStrictEqual(sum(product(3, 5), product(3, 7)));
    });

    it('has identity element 1', () => {
        expect(product(3, 1))
            .toStrictEqual(3);
        expect(product(1, 3))
            .toStrictEqual(3);
    });

    it('has zero property', () => {
        expect(product(3, 0))
            .toStrictEqual(0);
        expect(product(0, 3))
            .toStrictEqual(0);
    });

    it('negates value when multiplied by -1', () => {
        expect(product(3, -1))
            .toStrictEqual(-3);
        expect(product(-1, -1))
            .toStrictEqual(1);
    });

    it('can be used to reduce array of numbers', () => {
        expect([5, 7, 11, 13].reduce(product))
            .toStrictEqual(5005);
    });
});

describe('quotient', () => {
    it('is a real number result of division of dividend by divisor', () => {
        expect(quotient(5, 2))
            .toStrictEqual(2.5);
    });

    it('returns Infinity when divisor is 0', () => {
        expect(quotient(5, 0))
            .toStrictEqual(Infinity);
        expect(quotient(-5, 0))
            .toStrictEqual(-Infinity);
    });
});

describe('remainder', () => {
    it('is an integer remainder of division of dividend by divisor', () => {
        expect(remainder(5, 3))
            .toStrictEqual(2);
    });

    it('returns NaN when divisor is 0', () => {
        expect(remainder(5, 0))
            .toStrictEqual(Number.NaN);
    });
});
