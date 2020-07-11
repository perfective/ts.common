import { stack } from '../error';

export interface Trace {
    class?: string;
    method?: string;
    filename?: string;
    line?: number;
    column?: number;
}

export function stackTrace(error: Error): Trace[] {
    return stack(error)
        .split('\n')
        .map(traceLine)
        .filter((line): line is string => line !== null)
        .map(trace);
}

type Tracer = (line: string) => Trace | null;

const tracers: Tracer[] = [
    functionTrace,
    objectTrace,
    fileTrace,
    promiseTrace,
];

export function trace(line: string): Trace {
    const traces = tracers
        .map(tracer => tracer(line))
        .filter((trace: Trace | null): trace is Trace => trace !== null);
    if (traces.length > 0) {
        return traces[0];
    }
    return {
        method: line,
    };
}

const objectTracePattern = /^([\w$]+)\.?([\w$<>]+) \((.*)(?::(\d+))(?::(\d+))\)$/u;

function objectTrace(line: string): Trace | null {
    const matches = objectTracePattern.exec(line);
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

const functionTracePattern = /^([\w<>]+) \((.*)(?::(\d+))(?::(\d+))\)$/u;

function functionTrace(line: string): Trace | null {
    const matches = functionTracePattern.exec(line);
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

const fileTracePattern = /^(.*)(?::(\d+))(?::(\d+))$/u;

function fileTrace(line: string): Trace | null {
    const matches = fileTracePattern.exec(line);
    if (matches !== null) {
        return {
            filename: matches[1],
            line: Number.parseInt(matches[2], 10),
            column: Number.parseInt(matches[3], 10),
        };
    }
    return null;
}

const promiseTracePattern = /^new (\w+) \(([\w<>]+)\)$/u;

function promiseTrace(line: string): Trace | null {
    const matches = promiseTracePattern.exec(line);
    if (matches !== null) {
        return {
            class: matches[1],
            method: matches[2],
        };
    }
    return null;
}

const traceLinePattern = /^ {4}at (.*)$/u;

function traceLine(line: string): string | null {
    const trace = traceLinePattern.exec(line);
    if (trace !== null) {
        return trace[1];
    }
    return null;
}
