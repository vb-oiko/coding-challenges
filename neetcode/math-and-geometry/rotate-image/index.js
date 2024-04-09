/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const n = matrix.length;
  const layerNum = Math.floor(n / 2);

  for (let layer = 0; layer < layerNum; layer++) {
    for (let i = 0; i < n - 1 - 2 * layer; i++) {
      const topRow = layer;
      const bottomRow = n - 1 - layer;
      const leftColumn = layer;
      const rightColumn = n - 1 - layer;

      const topLeft = matrix[topRow][leftColumn + i];
      const topRight = matrix[topRow + i][rightColumn];
      const bottomRight = matrix[bottomRow][rightColumn - i];
      const bottomLeft = matrix[bottomRow - i][leftColumn];

      matrix[topRow][leftColumn + i] = bottomLeft;
      matrix[topRow + i][rightColumn] = topLeft;
      matrix[bottomRow][rightColumn - i] = topRight;
      matrix[bottomRow - i][leftColumn] = bottomRight;
    }
  }

  return matrix;
};

const tests = [
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    output: [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ],
  },
  {
    matrix: [
      [5, 1, 9, 11],
      [2, 4, 8, 10],
      [13, 3, 6, 7],
      [15, 14, 12, 16],
    ],
    output: [
      [15, 13, 2, 5],
      [14, 3, 4, 1],
      [12, 6, 8, 9],
      [16, 7, 10, 11],
    ],
  },
];

for (const { matrix, output } of tests) {
  const result = rotate(matrix);
  console.log({ matrix, result, output });
}
