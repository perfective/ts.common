import { epoch } from './date';
import { timestamp } from './timestamp';

describe(timestamp, () => {
    describe('timestamp(Date)', () => {
        describe('when given a valid Date', () => {
            it('returns a Timestamp for the given Date', () => {
                expect(timestamp(epoch())).toBe(0);
            });
        });

        describe('when given an invalid Date', () => {
            it('returns null', () => {
                expect(timestamp(new Date('xyz'))).toBeNull();
            });
        });
    });

    describe('timestamp(string)', () => {
        describe('when given a parseable date/time string', () => {
            it('returns a Timestamp for the given date/time', () => {
                expect(timestamp('1970-01-01T00:00:00.000Z')).toBe(0);
                // January 1, 1970, 00:10 UTC is 10 minutes past the epoch.
                expect(timestamp('1970-01-01T00:10+00:00')).toBe(10 * 60 * 1000);
                // Midnight, January 2, 1970, UTC is 24 hours past the epoch.
                expect(timestamp('1970-01-02')).toBe(24 * 60 * 60 * 1000);
            });
        });

        describe('when given a non-parseable date/time string', () => {
            it('returns null', () => {
                expect(timestamp('1970-01-02+00:00')).toBeNull();
            });
        });
    });
});
