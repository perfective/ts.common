import { value } from './unary';

describe('value', () => {
    it('creates a function that returns the passed value', () => {
        expect(value()(3.14)).toStrictEqual(3.14);
    });
});
