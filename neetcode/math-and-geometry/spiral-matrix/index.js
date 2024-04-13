/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const n = matrix.length;
  const m = matrix[0].length;
  const layerNum = Math.round(Math.min(n / 2, m / 2));
  const result = [];

  for (let layer = 0; layer < layerNum; layer++) {
    const topRow = layer;
    const bottomRow = n - 1 - layer;
    const leftColumn = layer;
    const rightColumn = m - 1 - layer;

    for (let column = leftColumn; column <= rightColumn; column++) {
      result.push(matrix[topRow][column]);
    }

    for (let row = topRow + 1; row <= bottomRow; row++) {
      result.push(matrix[row][rightColumn]);
    }

    for (
      let column = rightColumn - 1;
      topRow !== bottomRow && column >= leftColumn;
      column--
    ) {
      result.push(matrix[bottomRow][column]);
    }

    for (
      let row = bottomRow - 1;
      leftColumn !== rightColumn && row >= topRow + 1;
      row--
    ) {
      result.push(matrix[row][leftColumn]);
    }
  }

  return result;
};

const tests = [
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    output: [1, 2, 3, 6, 9, 8, 7, 4, 5],
  },
  {
    matrix: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ],
    output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
  },
  {
    matrix: [
      [2, 5, 8],
      [4, 0, -1],
    ],
    output: [2, 5, 8, -1, 0, 4],
  },
];

for (const { matrix, output } of tests) {
  const result = spiralOrder(matrix);
  console.log({ matrix, result, output });
}
