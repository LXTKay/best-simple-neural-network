/**
 * Leaky ReLU activation function. Returns the input value if it is positive or
 * 0.01 * the value if it is negative.
 * @param {number} value - The input value
 * @returns {number} - The activated value
 */
export default function leakyReLU(value) {
  if (value < 0) return value * 0.01;
  return value;
}