import { Identity, take } from './identity';

function negative(x: number): Identity<number> {
    return take(-x);
}

function square(x: number): Identity<number> {
    return take(x * x);
}

describe('take', () => {
    describe('onto', () => {
        it('satisfies left identity monad law', () => {
            expect(take(3.14).onto(negative))
                .toStrictEqual(negative(3.14));
        });

        it('satisfies right identity monad law', () => {
            expect(take(3.14).onto(take))
                .toStrictEqual(take(3.14));
        });

        it('satisfies associativity monad law', () => {
            expect(take(3.14).onto(negative).onto(square))
                .toStrictEqual(take(3.14).onto(x => negative(x).onto(square)));
        });
    });

    describe('to', () => {
        it('maps the value', () => {
            expect(take(3.14).to(x => -x))
                .toStrictEqual(take(-3.14));
        });
    });
});
