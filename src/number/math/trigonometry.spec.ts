import { describe, expect, it } from '@jest/globals';

import { arccosine } from './trigonometry';

describe(arccosine, () => {
    describe('when cosine is less than -1', () => {
        it('returns null', () => {
            expect(arccosine(-1.1)).toBeNull();
        });
    });

    describe('when cosine is greater than 1', () => {
        it('returns null', () => {
            expect(arccosine(1.1)).toBeNull();
        });
    });

    describe('when cosine is between -1 and 1', () => {
        it('returns the inverse cosine of the given cosine', () => {
            expect(arccosine(0)).toBe(1.570_796_326_794_896_6);
            expect(arccosine(0.5)).toBe(1.047_197_551_196_597_9);
            expect(arccosine(1)).toBe(0);
        });
    });
});
