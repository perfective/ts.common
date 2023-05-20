import { isNotNull } from '../../../value/value';
import { stack } from '../error';

/**
 * One line of a stack trace.
 *
 * @since v0.2.0
 */
export interface Trace {
    /**
     * Present only in object and promise traces.
     */
    class?: string;

    /**
     * Present in object, function, and promise traces.
     */
    method?: string;

    /**
     * Present in object, function, and file traces.
     */
    filename?: string;

    /**
     * Present in object, function, and file traces.
     */
    line?: number;

    /**
     * Present in object, function, and file traces.
     */
    column?: number;
}

/**
 * Parses an {@linkcode Error} input and returns its stack trace as a list of single parsed {@linkcode Trace} line.
 *
 * @since v0.2.0
 */
export function stackTrace(error: Error): Trace[] {
    return stack(error)
        .split('\n')
        .map(traceLine)
        .filter(isNotNull)
        .map(trace);
}

type Tracer = (line: string) => Trace | null;

const tracers: Tracer[] = [
    functionTrace,
    objectTrace,
    fileTrace,
    promiseTrace,
];

/**
 * Creates a {@linkcode Trace} by parsing a given `line` with a function, object, file, or promise tracer.
 * If a line cannot be parsed, returns the same line set as a {@linkcode Trace.method}.
 *
 * @since v0.2.0
 */
export function trace(line: string): Trace {
    const traces: Trace[] = tracers
        .map(tracer => tracer(line))
        .filter(isNotNull);
    if (traces.length > 0) {
        return traces[0];
    }
    return {
        method: line,
    };
}

const objectTracePattern: RegExp = /^([\w$]+)\.?([\w$<>]+) \((.*)(?::(\d+))(?::(\d+))\)$/u;

function objectTrace(line: string): Trace | null {
    const matches: RegExpExecArray | null = objectTracePattern.exec(line);
    if (matches !== null) {
        return {
            class: matches[1],
            method: matches[2],
            filename: matches[3],
            line: Number.parseInt(matches[4], 10),
            column: Number.parseInt(matches[5], 10),
        };
    }
    return null;
}

const functionTracePattern: RegExp = /^([\w<>]+) \((.*)(?::(\d+))(?::(\d+))\)$/u;

function functionTrace(line: string): Trace | null {
    const matches: RegExpExecArray | null = functionTracePattern.exec(line);
    if (matches !== null) {
        return {
            method: matches[1],
            filename: matches[2],
            line: Number.parseInt(matches[3], 10),
            column: Number.parseInt(matches[4], 10),
        };
    }
    return null;
}

const fileTracePattern: RegExp = /^(.*)(?::(\d+))(?::(\d+))$/u;

function fileTrace(line: string): Trace | null {
    const matches: RegExpExecArray | null = fileTracePattern.exec(line);
    if (matches !== null) {
        return {
            filename: matches[1],
            line: Number.parseInt(matches[2], 10),
            column: Number.parseInt(matches[3], 10),
        };
    }
    return null;
}

const promiseTracePattern: RegExp = /^new (\w+) \(([\w<>]+)\)$/u;

function promiseTrace(line: string): Trace | null {
    const matches: RegExpExecArray | null = promiseTracePattern.exec(line);
    if (matches !== null) {
        return {
            class: matches[1],
            method: matches[2],
        };
    }
    return null;
}

const traceLinePattern: RegExp = /^ {4}at (.*)$/u;

function traceLine(line: string): string | null {
    const trace: RegExpExecArray | null = traceLinePattern.exec(line);
    if (trace !== null) {
        return trace[1];
    }
    return null;
}
