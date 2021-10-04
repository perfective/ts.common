import { match } from './match';
import { Statement } from './statement';
import { when } from './when';

const roots: Statement<number, number>[] = [
    when(1.41).then(() => 2),
    when(1.73).then(() => 3),
    when(2.23).then(() => 5),
];

const powers: Statement<number, number>[] = [
    when<number>(v => v < 0).then(v => v ** 2),
    when<number>(v => v === 0).then(0),
    when<number>(v => v > 0).then(v => v ** 3),
];

describe('match', () => {
    it('matches constants values', () => {
        expect(match(1.73).to(roots).or(undefined))
            .toBe(3);
    });

    it('matches lazy values', () => {
        expect(match(() => 0).to(powers).or(undefined))
            .toBe(0);
        expect(match(() => 2).to(powers).or(undefined))
            .toBe(8);
        expect(match(() => -3).to(powers).or(undefined))
            .toBe(9);
    });

    it('falls back to Nothing when match is not found', () => {
        expect(match(3.14).to(roots).or(undefined))
            .toBeUndefined();
    });
});
