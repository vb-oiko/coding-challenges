/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const arr = new MatrixAs1DArray(matrix);

  let left = 0;
  let right = arr.size;
  let mid = Math.floor((left + right) / 2);

  while (mid > left) {
    if (arr.at(mid) === target) {
      return true;
    }

    if (arr.at(mid) < target) {
      left = mid;
    }

    if (arr.at(mid) > target) {
      right = mid;
    }

    mid = Math.floor((left + right) / 2);
  }
  if (arr.at(mid) === target) {
    return true;
  }

  return false;
};

class MatrixAs1DArray {
  constructor(matrix) {
    this.matrix = matrix;
    this.rows = matrix.length;
    this.cols = matrix[0].length;
    this.size = this.cols * this.rows;
  }

  at(index) {
    if (index < 0 || index > this.rows * this.cols - 1) {
      throw new Error("Index is out of range", { index, matrix: this.matrix });
    }

    const row = Math.floor(index / this.cols);
    const col = index % this.cols;

    return this.matrix[row][col];
  }
}

const tests = [
  {
    matrix: [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    target: 3,
    output: true,
  },
];

for (const { matrix, target, output } of tests) {
  const result = searchMatrix(matrix, target);

  let isValid = result === output;

  console.warn({ matrix, target, result, output, isValid });
}
