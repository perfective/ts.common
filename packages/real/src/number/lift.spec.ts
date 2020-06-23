import { precision } from './lift';

describe('precision', () => {
    describe('precision(n)', () => {
        it('returns a string representation of a number with a given precision', () => {
            expect(precision(1)(3.141_592_653_589_793))
                .toStrictEqual('3');
            expect(precision(5)(3.141_592_653_589_793))
                .toStrictEqual('3.1416');
            expect(precision(16)(3.141_592_653_589_793))
                .toStrictEqual('3.141592653589793');
        });

        /* eslint-disable @typescript-eslint/no-loss-of-precision -- precision failure test */
        it('only keeps about 17 decimal places of precision', () => {
            expect(precision(17)(3.141_592_653_589_793_2))
                .toStrictEqual('3.1415926535897931');
            expect(precision(21)(3.141_592_653_589_793_238_46))
                .toStrictEqual('3.14159265358979311600');
        });
        /* eslint-enable @typescript-eslint/no-loss-of-precision */
    });
});
