import { exponential, fixed, precision } from './lift';

describe('exponential', () => {
    describe('exponential(n)', () => {
        it('returns a string representation of a number in exponential notation', () => {
            expect(exponential(0)(3.141_592_653_589_793))
                .toStrictEqual('3e+0');
            expect(exponential(0)(3_141_592_653_589_793))
                .toStrictEqual('3e+15');
            expect(exponential(15)(3.141_592_653_589_793))
                .toStrictEqual('3.141592653589793e+0');
            expect(exponential(16)(31_415_926_535_897_932))
                .toStrictEqual('3.1415926535897932e+16');
        });

        /* eslint-disable @typescript-eslint/no-loss-of-precision -- precision failure test */
        it('only keeps about 17 decimal places of precision', () => {
            expect(exponential(16)(3.141_592_653_589_793_2))
                .toStrictEqual('3.1415926535897931e+0');
            expect(exponential(17)(314_159_265_358_979_323))
                .toStrictEqual('3.14159265358979328e+17');
            expect(exponential(20)(3.141_592_653_589_793_238_46))
                .toStrictEqual('3.14159265358979311600e+0');
            expect(exponential(20)(314_159_265_358_979_323_846))
                .toStrictEqual('3.14159265358979334144e+20');
        });
        /* eslint-enable @typescript-eslint/no-loss-of-precision */
    });
});

describe('fixed', () => {
    describe('fixed(n)', () => {
        it('returns a string representation of a number in fixed-point notation', () => {
            expect(fixed(0)(3.141_592_653_589_793))
                .toStrictEqual('3');
            expect(fixed(0)(31_415_926_535_897_932))
                .toStrictEqual('31415926535897932');
            expect(fixed(15)(3.141_592_653_589_793))
                .toStrictEqual('3.141592653589793');
            expect(fixed(15)(31_415_926_535_897_932))
                .toStrictEqual('31415926535897932.000000000000000');
            expect(fixed(20)(31_415_926_535_897_932))
                .toStrictEqual('31415926535897932.00000000000000000000');
        });

        /* eslint-disable @typescript-eslint/no-loss-of-precision -- precision failure test */
        it('only keeps about 17 decimal places of precision', () => {
            expect(fixed(16)(3.141_592_653_589_793_2))
                .toStrictEqual('3.1415926535897931');
            expect(fixed(17)(314_159_265_358_979_323))
                .toStrictEqual('314159265358979328.00000000000000000');
            expect(fixed(20)(3.141_592_653_589_793))
                .toStrictEqual('3.14159265358979311600');
            expect(fixed(20)(3.141_592_653_589_793_238_46))
                .toStrictEqual('3.14159265358979311600');
            expect(fixed(20)(314_159_265_358_979_323_846))
                .toStrictEqual('314159265358979334144.00000000000000000000');
        });
        /* eslint-enable @typescript-eslint/no-loss-of-precision */
    });
});

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
