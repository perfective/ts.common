import { error } from '../../error/error/error';

import { fulfilled, rejected, settled } from './promise';

describe(fulfilled, () => {
    it('creates a fulfilled Promise from a given value', async () => {
        const output: number = await fulfilled(0);

        expect(output).toBe(0);
    });

    it('creates a fulfilled Promise from a given Promise', async () => {
        const output: number = await fulfilled(Promise.resolve(0));

        expect(output).toBe(0);
    });
});

describe(rejected, () => {
    it('creates a rejected Promise from a given Error', async () => {
        await expect(rejected(error('Failed'))).rejects.toThrow('Failed');
    });
});

describe(settled, () => {
    describe('when given a non-Error value', () => {
        it('creates a fulfilled Promise', async () => {
            const output: number = await settled(0);

            expect(output).toBe(0);
        });
    });

    describe('when given a fulfilled Promise', () => {
        it('creates a fulfilled Promise', async () => {
            const output: number = await settled(Promise.resolve(0));

            expect(output).toBe(0);
        });
    });

    describe('when given an Error value', () => {
        it('creates a rejected Promise', async () => {
            await expect(settled(error('Failed'))).rejects.toThrow('Failed');
        });
    });

    describe('when given a rejected Promise', () => {
        it('creates a rejected Promise', async () => {
            await expect(settled(Promise.reject(error('PromiseLike Failed')))).rejects.toThrow('PromiseLike Failed');
        });
    });
});
