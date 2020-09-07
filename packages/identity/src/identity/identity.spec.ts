import { Identity, identity, isIdentity, take } from './identity';

function negative(x: number): Identity<number> {
    return identity(-x);
}

function square(x: number): Identity<number> {
    return identity(x * x);
}

describe('identity', () => {
    describe('value', () => {
        it('contains a given value', () => {
            expect(identity(3.14).value)
                .toStrictEqual(3.14);
        });
    });

    describe('onto', () => {
        it('satisfies left identity monad law', () => {
            expect(identity(3.14).onto(negative))
                .toStrictEqual(negative(3.14));
        });

        it('satisfies right identity monad law', () => {
            expect(identity(3.14).onto(identity))
                .toStrictEqual(identity(3.14));
        });

        it('satisfies associativity monad law', () => {
            expect(identity(3.14).onto(negative).onto(square))
                .toStrictEqual(identity(3.14).onto(x => negative(x).onto(square)));
        });
    });

    describe('to', () => {
        it('maps the value', () => {
            expect(identity(3.14).to(x => -x))
                .toStrictEqual(identity(-3.14));
        });
    });

    describe('run', () => {
        it('runs a given procedure', () => {
            let a: number = 1;
            // eslint-disable-next-line no-return-assign -- testing a procedure
            identity(2.71).run(v => a += v);

            expect(a).toStrictEqual(3.71);
        });
    });
});

describe('take', () => {
    it('creates an Identity', () => {
        expect(take(3.14))
            .toStrictEqual(identity(3.14));
    });
});

describe('isIdentity', () => {
    it('returns true when value is an Identity', () => {
        expect(isIdentity(identity(3.14)))
            .toBe(true);
    });

    it('returns false when value is not an Identity', () => {
        expect(isIdentity(3.14))
            .toBe(false);
    });
});
