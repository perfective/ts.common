import { match } from './match';
import { when } from './when';

const roots = [
    when(1.41).to(2),
    when(1.73).to(3),
    when(2.23).to(5),
];

/* eslint-disable deprecation/deprecation -- TODO: Change to when.to() in v0.10.0 */
const powers = [
    when<number>(v => v < 0).then(v => v ** 2),
    when<number>(v => v === 0).then(0),
    when<number>(v => v > 0).then(v => v ** 3),
];
/* eslint-enable deprecation/deprecation */

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

    /* eslint-disable deprecation/deprecation -- TODO: Remove in v0.10.0 */
    describe('to', () => {
        it('calls `Match.cases`', () => {
            expect(match(1.73).to(roots))
                .toStrictEqual(match(1.73).cases(roots));
            expect(match(() => 0).to(powers))
                .toStrictEqual(match(() => 0).cases(powers));
        });
    });

    describe('that', () => {
        it('calls `Match.cases`', () => {
            expect(match(1.73).that(...roots))
                .toStrictEqual(match(1.73).cases(...roots));
            expect(match(() => 0).that(...powers))
                .toStrictEqual(match(() => 0).cases(...powers));
        });
    });
    /* eslint-enable deprecation/deprecation */
});
