import { Identity, take } from './identity';

function negative(x: number): Identity<number> {
    return take(-x);
}

function square(x: number): Identity<number> {
    return take(x * x);
}

describe('take', () => {
    describe('then', () => {
        it('satisfies left identity monad law', () => {
            expect(take(3.14).then(negative))
                .toEqual(negative(3.14));
        });

        it('satisfies right identity monad law', () => {
            expect(take(3.14).then(take))
                .toEqual(take(3.14));
        });

        it('satisfies associativity monad law', () => {
            expect(take(3.14).then(negative).then(square))
                .toEqual(take(3.14).then(x => negative(x).then(square)));
        });
    });
});
