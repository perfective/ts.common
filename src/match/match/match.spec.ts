import { match } from './match';
import { when } from './when';

const roots = [
    when(1.41).to(2),
    when(1.73).to(3),
    when(2.23).to(5),
];

const powers = [
    when<number>(v => v < 0).to(v => v ** 2),
    when<number>(v => v === 0).to(0),
    when<number>(v => v > 0).to(v => v ** 3),
];

describe('Match', () => {
    describe('cases', () => {
        it('matches constants values', () => {
            const output = match(1.73).cases(...roots).or(undefined);

            expect(output).toBe(3);
        });

        it('matches lazy values', () => {
            const output = match(() => 0).cases(powers).or(undefined);

            expect(output).toBe(0);
        });

        it('falls back to Nothing when match is not found', () => {
            expect(match(3.14).cases().or(undefined))
                .toBeUndefined();
        });
    });
});
