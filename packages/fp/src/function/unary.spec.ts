import { same } from './unary';

describe('same', () => {
    it('creates a function that returns the passed value', () => {
        expect(same()(3.14)).toStrictEqual(3.14);
    });
});
