import { dateNowMock } from '../../jest';

import { date, epoch, isInvalid, isValid, now } from './date';

describe(date, () => {
    describe('date(Date)', () => {
        describe('when given a valid Date', () => {
            it('creates a copy of the given Date', () => {
                const input = now();
                const copy = date(input);

                expect(copy).toStrictEqual(input);
                expect(copy).not.toBe(input);
            });
        });

        describe('when given an invalid Date', () => {
            it('returns null', () => {
                const input = new Date(Number.NaN);
                const copy = date(input);

                expect(copy).toBeNull();
                expect(copy).not.toBe(input);
            });
        });
    });

    describe('date(Timestamp)', () => {
        describe('when given a valid Timestamp', () => {
            it('creates a Date for the given Timestamp', () => {
                expect(date(0)).toStrictEqual(epoch());
                expect(date(Number.MIN_VALUE)).toStrictEqual(new Date('1970-01-01T00:00:00.000Z'));
            });
        });

        describe('when given an invalid Timestamp', () => {
            it('returns null', () => {
                expect(date(Number.NaN)).toBeNull();
                expect(date(Number.MAX_VALUE)).toBeNull();
                expect(date(Number.MAX_SAFE_INTEGER)).toBeNull();
                expect(date(Number.MIN_SAFE_INTEGER)).toBeNull();
            });
        });
    });

    describe('date(string)', () => {
        describe('when a given string can be parsed', () => {
            it('creates a Date from the given string', () => {
                expect(date('1970-01-01T00:00:00.000Z')).toStrictEqual(epoch());
            });
        });

        describe('when a given string cannot be parsed', () => {
            it('returns null', () => {
                expect(date('xyz')).toBeNull();
            });
        });
    });
});

describe(now, () => {
    it('returns a Date for the current moment', () => {
        const dateNow = dateNowMock(epoch());

        expect(now()).toStrictEqual(epoch());
        expect(dateNow).toHaveBeenCalledTimes(1);

        dateNow.mockReset();
    });
});

describe(epoch, () => {
    it('returns the Date of the Unix epoch', () => {
        expect(epoch()).toStrictEqual(new Date('1970-01-01T00:00:00.000Z'));
    });
});

describe(isValid, () => {
    describe('when given a valid date', () => {
        it('returns true', () => {
            expect(isValid(epoch())).toBe(true);
            expect(isValid(now())).toBe(true);
        });
    });

    describe('when given an invalid date', () => {
        it('returns false', () => {
            expect(isValid(new Date(Number.NaN))).toBe(false);
            expect(isValid(new Date('xyz'))).toBe(false);
        });
    });
});

describe(isInvalid, () => {
    describe('when given an invalid date', () => {
        it('returns true', () => {
            expect(isInvalid(new Date(Number.NaN))).toBe(true);
            expect(isInvalid(new Date('xyz'))).toBe(true);
        });
    });

    describe('when given a valid date', () => {
        it('returns false', () => {
            expect(isInvalid(epoch())).toBe(false);
            expect(isInvalid(now())).toBe(false);
        });
    });
});
