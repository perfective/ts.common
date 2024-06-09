import { describe, expect, it } from '@jest/globals';

import { voidable } from './void';

describe('voidable', () => {
    it('returns undefined when value is void', () => {
        // eslint-disable-next-line no-void -- testing void behavior
        expect(voidable(void 0)).toBeUndefined();
    });

    it('returns value when value is not void', () => {
        expect(voidable(3.14)).toBe(3.14);
    });
});
