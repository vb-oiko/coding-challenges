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

  const adjacency = Array.from({ length: n * m }, () => []);
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
        adjacency[i * m + j].push((i + ni) * m + j + nj);
      }
    }
  }

  const visited = new Set();
  const cache = new Array(m * n).fill(null);

  function depth(node) {
    if (cache[node] !== null) {
      return cache[node];
    }

    if (adjacency[node].length === 0) {
      cache[node] = 1;
      return cache[node];
    }

    let max = 0;

    for (const neighbor of adjacency[node]) {
      if (visited.has(neighbor)) {
        continue;
      }

      visited.add(neighbor);
      const cur = depth(neighbor) + 1;
      visited.delete(neighbor);
      if (cur > max) {
        max = cur;
      }
    }

    cache[node] = max;
    return cache[node];
  }

  let result = 0;
  for (let node = 0; node < m * n; node++) {
    const cur = depth(node);
    if (cur > result) {
      result = cur;
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
