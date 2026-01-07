import { describe, expect, it } from '@jest/globals';

import { error } from '../../error/error/error';

import { fulfilled, rejected, settled } from './promise';

describe(fulfilled, () => {
    describe('when given a non-Promise value', () => {
        it('creates a fulfilled Promise', async () => {
            const output: number = await fulfilled(0);

            expect(output).toBe(0);
        });
    });

    describe('when given a Promise value', () => {
        it('creates a fulfilled Promise', async () => {
            const output: number = await fulfilled(Promise.resolve(0));

            expect(output).toBe(0);
        });
    });
});

describe(rejected, () => {
    describe('when given an Error', () => {
        it('creates a rejected Promise', async () => {
            await expect(rejected(error('Failed'))).rejects.toThrow('Failed');
        });
    });
});

describe(settled, () => {
    it('returns the first callback that creates a fulfilled promise', async () => {
        const first = settled()[0];
        const output = await first(0);

        expect(output).toBe(0);
    });

    it('returns the second callback that creates a rejected promise', async () => {
        const second = settled()[1];
        const reason = error('Rejected');

        // eslint-disable-next-line jest/valid-expect-with-promise -- the `second()` function returns a Promise.
        await expect(() => second(reason)).rejects.toBe(reason);
    });
});
