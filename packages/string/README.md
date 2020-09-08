# String

The `@perfective/string` package works with the standard JS
[`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) type.
It provides the following functions and additional types.

* Type guards:
    * `isString<T>(value: T | string): value is string`
    * `isNotString<T>(value: T | string): value is T`
* Predicates:
    * `isEmpty(value: string): boolean`
    * `isNotEmpty(value: string): boolean`
    * `includes(search: string, position?: number): Unary<string, boolean>`
    * `endsWith(search: string, length?: number): Unary<string, boolean>`
    * `startsWith(search: string, from: number = 0): Unary<string, boolean>`
* Properties:
    * `length(value: string): number`
* Operators:
    * `charAt(index: number): Unary<string, string>`
    * `concat(...strings: string[]): Unary<string, string>`
    * `lowerCase(value: string): string`
    * `padEnd(length: number, fill?: string): Unary<string, string>`
    * `padStart(length: number, fill?: string): Unary<string, string>`
    * `repeat(count: number): Unary<string, string>`
    * `replace(search: string | RegExp, replacement: string): Unary<string, string>`
    * `replaceWith(search: string | RegExp, replacement: Replacement): Unary<string, string>`
    * `slice(start: number, end?: number): Unary<string, string>`
    * `split(separator: string | RegExp, limit?: number): Unary<string, string[]>`
    * `trim(value: string): string`
    * `upperCase(value: string): string`
* Search functions:
    * `indexOf(search: string, from: number = 0): Unary<string, number>`
    * `lastIndexOf(search: string, from?: number): Unary<string, number>`
    * `search(search: RegExp): Unary<string, number | -1>`
* `Output` — an interface to explicitly require `toString()` method implementation
    * `output<T extends Output>(value: T | string | null | undefined): string`
    * `isOutput<T>(value: Output | T): value is Output`
    * `isNotOutput<T>(value: Output | T): value is T`
* `Utf16CodeUnit`:
    * `stringFromCharCode(...codes: Utf16CodeUnit[]): string`
    * `charCodeAt(index: number): Unary<string, Utf16CodeUnit>`
* `CodePoint`:
    * `stringFromCodePoint(...codePoints: CodePoint[]): string`
    * `codePointAt(position: number): Unary<string, CodePoint | undefined>`
* `UnicodeNormalizationForm`:
    * `normalize(form: UnicodeNormalizationForm = 'NFC'): Unary<string, string>`

[Full documentation](https://github.com/perfective/js/blob/master/packages/string/README.adoc) 
is available in the project repository.
