import { describe, expect, it } from '@jest/globals';

import { chained } from '../../error/exception/exception';
import { constant } from '../../function/function/nullary';
import { same } from '../../function/function/unary';

import { failureWith, successWith } from './arguments';

describe(successWith, () => {
    const map = constant(0);

    it('creates a BiMapResult pair with a given map callback as the first element', () => {
        expect(successWith(map)[0]).toBe(map);
    });

    it('creates a BiMapResult pair with an identity function as the second element', () => {
        expect(successWith(map)[1]).toBe(same);
    });
});

describe(failureWith, () => {
    const map = chained('Exceptional');

    it('creates a BiMapResult pair with an identity function as the first element', () => {
        expect(failureWith(map)[0]).toBe(same);
    });

    it('creates a BiMapResult pair with a given map callback as the second element', () => {
        expect(failureWith(map)[1]).toBe(map);
    });
});
