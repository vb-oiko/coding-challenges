/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (matrix) {
  const neighbors = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const n = matrix.length;
  const m = matrix[0].length;

  const adjacency = Array.from({ length: n * m }, () => new Set());
  const adjacency1 = Array.from({ length: n * m }, () => new Set());
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      for (const [ni, nj] of neighbors) {
        if (
          i + ni < 0 ||
          i + ni >= n ||
          j + nj < 0 ||
          j + nj >= m ||
          matrix[i + ni][j + nj] >= matrix[i][j]
        ) {
          continue;
        }
        adjacency[i * m + j].add((i + ni) * m + j + nj);
        adjacency1[(i + ni) * m + j + nj].add(i * m + j);
      }
    }
  }

  let result = 0;

  let nodes = new Set(Array.from({ length: n * m }, (_, i) => i));
  let toDelete;

  while (nodes.size > 0) {
    result++;
    const nextLevel = [];
    toDelete = [];
    for (const node of nodes) {
      if (adjacency[node].size === 0) {
        toDelete.push(node);
      }
    }
    for (const node of toDelete) {
      nodes.delete(node);
      for (const neighbor of adjacency1[node]) {
        adjacency[neighbor].delete(node);
      }
    }
  }

  return result;
};

const tests = [
  {
    matrix: [
      [9, 9, 4],
      [6, 6, 8],
      [2, 1, 1],
    ],
    output: 4,
  },
];

for (const { matrix, output } of tests) {
  const result = longestIncreasingPath(matrix, output);
  console.warn({ matrix, result, output });
}

// cur = [i,j] neighbor < cur ?
