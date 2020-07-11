import { error } from '../error';

import { Trace, stackTrace, trace } from './trace';

describe('stackTrace', () => {
    it('parses an error stack into Trace stack', () => {
        const example = error('Failure');
        example.stack = [
            'Error: Failure',
            '    at Object.exception (/error/src/exception/exception.ts:18:12)',
            '    at /node_modules/jest-jasmine2/build/queueRunner.js:47:12',
            '    at new Promise (<anonymous>)',
            '    at mapper (/node_modules/jest-jasmine2/build/queueRunner.js:30:19)',
        ].join('\n');
        expect(stackTrace(example))
            .toStrictEqual([
                {
                    class: 'Object',
                    method: 'exception',
                    filename: '/error/src/exception/exception.ts',
                    line: 18,
                    column: 12,
                },
                {
                    filename: '/node_modules/jest-jasmine2/build/queueRunner.js',
                    line: 47,
                    column: 12,
                },
                {
                    class: 'Promise',
                    method: '<anonymous>',
                },
                {
                    method: 'mapper',
                    filename: '/node_modules/jest-jasmine2/build/queueRunner.js',
                    line: 30,
                    column: 19,
                },
            ] as Trace[]);
        example.stack = [
            'Error: Failure',
            '    at <unknown>',
        ].join('\n');
        expect(stackTrace(example))
            .toStrictEqual([
                {
                    method: '<unknown>',
                },
            ] as Trace[]);
    });
});

describe('trace', () => {
    it('parses a method caller trace output', () => {
        expect(trace('Object.exception (/error/src/exception/exception.ts:18:12)'))
            .toStrictEqual({
                class: 'Object',
                method: 'exception',
                filename: '/error/src/exception/exception.ts',
                line: 18,
                column: 12,
            } as Trace);
        expect(trace('Suite.<anonymous> (/error/src/chain/chained-error.spec.ts:5:34)'))
            .toStrictEqual({
                class: 'Suite',
                method: '<anonymous>',
                filename: '/error/src/chain/chained-error.spec.ts',
                line: 5,
                column: 34,
            } as Trace);
        expect(trace('Observable.example$ (/node_modules/@example/rxjs.js:42:84)'))
            .toStrictEqual({
                class: 'Observable',
                method: 'example$',
                filename: '/node_modules/@example/rxjs.js',
                line: 42,
                column: 84,
            } as Trace);
        expect(trace('Runtime._execModule (/node_modules/jest-runtime/build/index.js:1217:24)'))
            .toStrictEqual({
                class: 'Runtime',
                method: '_execModule',
                filename: '/node_modules/jest-runtime/build/index.js',
                line: 1217,
                column: 24,
            } as Trace);
    });

    it('parses a function caller trace output', () => {
        expect(trace('mapper (/node_modules/jest-jasmine2/build/queueRunner.js:30:19)'))
            .toStrictEqual({
                method: 'mapper',
                filename: '/node_modules/jest-jasmine2/build/queueRunner.js',
                line: 30,
                column: 19,
            } as Trace);
        expect(trace('jasmine2 (/node_modules/jest-jasmine2/build/index.js:230:13)'))
            .toStrictEqual({
                method: 'jasmine2',
                filename: '/node_modules/jest-jasmine2/build/index.js',
                line: 230,
                column: 13,
            } as Trace);
    });

    it('parses a file caller trace output', () => {
        expect(trace('/node_modules/jest-jasmine2/build/queueRunner.js:47:12'))
            .toStrictEqual({
                filename: '/node_modules/jest-jasmine2/build/queueRunner.js',
                line: 47,
                column: 12,
            } as Trace);
        expect(trace('<anonymous>:1:9'))
            .toStrictEqual({
                filename: '<anonymous>',
                line: 1,
                column: 9,
            } as Trace);
    });

    it('parses a Promise caller trace output', () => {
        expect(trace('new Promise (<anonymous>)'))
            .toStrictEqual({
                class: 'Promise',
                method: '<anonymous>',
            } as Trace);
    });

    it('falls back to the trace output as a method', () => {
        expect(trace('<unknown>'))
            .toStrictEqual({
                method: '<unknown>',
            } as Trace);
    });
});
