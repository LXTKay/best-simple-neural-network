/**
 * Rotates 2 dimensional array by 90 degrees
 *
 * @param {number[][]} matrix - The 2 dimensional array that should be rotated
 * @returns {number[][]}
 */
export default function rotateMatrix(matrix) {
  let rows = matrix.length, cols = matrix[0].length;
  let grid = [];
  for (let j = 0; j < cols; j++) {
    grid[j] = Array(rows);
  };
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[j][i] = matrix[i][j];
    };
  };
  return grid;
};