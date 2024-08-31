/**
 * The sigmoid function maps any real-valued number to a value between 0 and 1.
 *
 * @param {number} x - The input to the sigmoid function
 * @returns {number} The output of the sigmoid function, between 0 and 1
 */
export default function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}
