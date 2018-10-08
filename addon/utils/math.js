/**
 * Clamps the input `num` between the `min` and `max` values.
 *
 * Examples:
 *   clamp(5, 0, 10) // => 5
 *   clamp(5, 7, 10) // => 7
 *   clamp(5, 0, 3) // => 3
 */
export function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}
