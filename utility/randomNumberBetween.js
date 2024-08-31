/**
 * Returns a random integer between min and max inclusive
 * @param {number} min The minimum value
 * @param {number} max The maximum value
 * @returns {number} A random integer between min and max inclusive
 */
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Returns a random float between min and max inclusive
 * @param {number} min The minimum value
 * @param {number} max The maximum value
 * @returns {number} A random float between min and max inclusive
 */
function randomFloatBetween(min, max) {
  return (Math.random() * (max - min + 1) + min);
};

export { randomNumberBetween, randomFloatBetween }