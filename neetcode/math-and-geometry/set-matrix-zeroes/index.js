/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  const n = matrix.length;
  const m = matrix[0].length;

  lefColumnHasZero = false;
  topRowHasZero = false;

  let i = 0;
  let j = 0;

  for (i = 0; i < n; i++) {
    if (matrix[i][0] === 0) {
      lefColumnHasZero = true;
    }
  }

  for (j = 0; j < m; j++) {
    if (matrix[0][j] === 0) {
      topRowHasZero = true;
    }
  }

  for (i = 1; i < n; i++) {
    for (j = 1; j < m; j++) {
      if (matrix[i][j] === 0) {
        matrix[0][j] = 0;
        matrix[i][0] = 0;
      }
    }
  }

  for (i = 1; i < n; i++) {
    if (matrix[i][0] !== 0) {
      continue;
    }

    for (j = 0; j < m; j++) {
      matrix[i][j] = 0;
    }
  }

  for (j = 1; j < m; j++) {
    if (matrix[0][j] !== 0) {
      continue;
    }

    for (i = 0; i < n; i++) {
      matrix[i][j] = 0;
    }
  }

  if (lefColumnHasZero) {
    for (i = 0; i < n; i++) {
      matrix[i][0] = 0;
    }
  }

  if (topRowHasZero) {
    for (j = 0; j < m; j++) {
      matrix[0][j] = 0;
    }
  }
};

const tests = [
  {
    matrix: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
    output: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ],
  },
];

for (const { matrix, output } of tests) {
  setZeroes(matrix);
  console.log({ matrix, output });
}
