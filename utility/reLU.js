/**
 * The reLU (Rectified Linear Unit) activation function.
 *
 * Returns the input value if it is positive, otherwise returns 0.
 *
 * @param {number} value - Input value
 * @returns {number} Output value
 */
export default function reLU(value) {
  if (value < 0) return 0;
  return value;
}