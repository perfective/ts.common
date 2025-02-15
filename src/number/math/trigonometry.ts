import { invalidArgumentException } from '../../error/exception/exception';
import { isInfinity } from '../number/infinity';
import { assertIsNotNaN, NonNegativeNumber } from '../number/number';

/**
 * A nominal type for radians.
 */
export type Radians = number;

/**
 * Returns the inverse cosine [0, π] of the given cosine value [-1, 1].
 *
 * @throws Exception - if the given cosine is less than -1, greater than 1, or is NaN.
 *
 * @since v0.11.0
 */

export function arccos(cosine: number): Radians | null {
    assertIsNotNaN('cosine', cosine, '[-1, 1]');
    if (cosine < -1 || cosine > 1) {
        throw invalidArgumentException('cosine', '[-1, 1]', String(cosine));
    }
    return Math.acos(cosine);
}

/**
 * Returns the inverse hyperbolic cosine [0, +∞) of a given number from [1, +∞).
 *
 * @throws Exception - if the given value is less than 1 or is NaN.
 *
 * @since v0.11.0
 */
export function arccosh(value: number): NonNegativeNumber | null {
    assertIsNotNaN(value, '[1, +∞)');
    if (value < 1) {
        throw invalidArgumentException('value', '[1, +∞)', String(value));
    }
    return Math.acosh(value);
}

/**
 * Returns the inverse sine [-π/2, π/2] of the given sine value [-1, 1].
 *
 * @throws Exception - if the given value is less than -1, greater than 1, or is NaN.
 *
 * @since v0.11.0
 */

export function arcsin(sine: number): Radians | null {
    assertIsNotNaN('sine', sine, '[-1, 1]');
    if (sine < -1 || sine > 1) {
        throw invalidArgumentException('sine', '[-1, 1]', String(sine));
    }
    return Math.asin(sine);
}

/**
 * Returns the inverse hyperbolic sine (-∞, +∞) of a given number from (-∞, +∞).
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function arcsinh(value: number): number {
    assertIsNotNaN(value, '(-∞, +∞)');
    return Math.asinh(value);
}

/**
 * Returns the inverse tangent [-π/2, π/2] of a given number from (-∞, +∞).
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function arctan(value: number): Radians {
    assertIsNotNaN(value, '(-∞, +∞)');
    return Math.atan(value);
}

/**
 * Returns the angle in radians [-π, π] between the positive x-axis and the ray from (0, 0) to the point (x, y).
 *
 * Note that `arctan2(y, x)` is not the same as `arctan(y / x)`.
 *
 * @throws Exception - if either `y` or `x` is `NaN`.
 *
 * @since v0.11.0
 */
export function arctan2(y: number, x: number): Radians;

/**
 * Returns the angle in radians [-π, π] between the positive x-axis and the ray from (0, 0) to the point (x, y).
 *
 * @param point - A tuple of [y, x] coordinates.
 *
 * @throws Exception - if either `y` or `x` is `NaN`.
 *
 * @since v0.11.0
 */
export function arctan2(point: [number, number]): Radians;

export function arctan2(arg1: number | [number, number], arg2?: number): Radians {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- arg2 is required when arg1 is a number.
    const [y, x] = Array.isArray(arg1) ? arg1 : [arg1, arg2!];
    assertIsNotNaN('y', y, '(-∞, +∞)');
    assertIsNotNaN('x', x, '(-∞, +∞)');
    return Math.atan2(y, x);
}

/**
 * Returns the inverse hyperbolic tangent (-∞, +∞) of a given number from (-1, 1).
 *
 * @throws Exception - if the given value is less than or equal -1, greater than or equal 1, or is NaN.
 *
 * @since v0.11.0
 */

export function arctanh(value: number): number {
    assertIsNotNaN(value, '(-1, 1)');
    if (value <= -1 || value >= 1) {
        throw invalidArgumentException('value', '(-1, 1)', String(value));
    }
    return Math.atanh(value);
}

/**
 * Returns the cosine [-1, 1] of a given angle in radians.
 *
 * @throws Exception - if the given angle is NaN or Infinity.
 *
 * @since v0.11.0
 */
export function cos(angle: Radians): number {
    // Math.cos() returns NaN for Infinity.
    assertIsNotNaN('angle', angle);
    if (isInfinity(angle)) {
        throw invalidArgumentException('angle', 'number', String(angle));
    }
    return Math.cos(angle);
}

/**
 * Returns the hyperbolic cosine [1, +∞) of a given number.
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function cosh(value: number): number {
    assertIsNotNaN(value);
    return Math.cosh(value);
}

/**
 * Returns the sine [-1, 1] of a given angle in radians.
 *
 * @throws Exception - if the given angle is NaN or Infinity.
 *
 * @since v0.11.0
 */
export function sin(angle: Radians): number {
    assertIsNotNaN('angle', angle);
    if (isInfinity(angle)) {
        throw invalidArgumentException('angle', 'number', String(angle));
    }
    return Math.sin(angle);
}

/**
 * Returns the hyperbolic sine (-∞, +∞) of a given number.
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function sinh(value: number): number {
    assertIsNotNaN(value);
    return Math.sinh(value);
}

/**
 * Returns the tangent (-∞, +∞) of a given angle in radians.
 *
 * @throws Exception - if the given angle is NaN or Infinity.
 *
 * NOTE: For Math.PI / 2 the result is a finite number due to floating point precision issues.
 *
 * @since v0.11.0
 */
export function tan(angle: number): number {
    assertIsNotNaN('angle', angle);
    if (isInfinity(angle)) {
        throw invalidArgumentException('angle', 'number', String(angle));
    }
    return Math.tan(angle);
}

/**
 * Returns the hyperbolic tangent (-1, 1) of a given number.
 * Returns 1 if a given value is Infinity.
 * Returns -1 if a given value is -Infinity.
 *
 * @throws Exception - if the given value is NaN.
 *
 * @since v0.11.0
 */
export function tanh(value: number): number {
    assertIsNotNaN(value);
    return Math.tanh(value);
}
