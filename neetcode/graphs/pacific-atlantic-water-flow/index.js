/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  const m = heights.length;
  const n = heights[0].length;

  const canReachPacific = new Array(m)
    .fill()
    .map(() => new Array(n).fill(false));
  const canReachAtlantic = new Array(m)
    .fill()
    .map(() => new Array(n).fill(false));
  const result = [];

  const NEIGHBORS = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  function dfs(i, j, visited) {
    if (i < 0 || j < 0 || i === m || j === n || visited[i][j].pacific) {
      return;
    }

    visited[i][j] = true;

    for (const [di, dj] of NEIGHBORS) {
      const newI = i + di;
      const newJ = j + dj;

      if (newI < 0 || newJ < 0 || newI >= m || newJ >= n) {
        continue;
      }

      if (visited[newI][newJ]) {
        continue;
      }

      if (heights[newI][newJ] >= heights[i][j]) {
        dfs(newI, newJ, visited);
      }
    }
  }

  for (let i = 0; i < m; i++) {
    dfs(i, 0, canReachPacific);
    dfs(i, n - 1, canReachAtlantic);
  }

  for (let j = 0; j < n; j++) {
    dfs(0, j, canReachPacific);
    dfs(m - 1, j, canReachAtlantic);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (canReachPacific[i][j] && canReachAtlantic[i][j]) {
        result.push([i, j]);
      }
    }
  }

  return result;
};

const tests = [
  {
    heights: [
      [1, 2, 2, 3, 5],
      [3, 2, 3, 4, 4],
      [2, 4, 5, 3, 1],
      [6, 7, 1, 4, 5],
      [5, 1, 1, 2, 4],
    ],
    output: [
      [0, 4],
      [1, 3],
      [1, 4],
      [2, 2],
      [3, 0],
      [3, 1],
      [4, 0],
    ],
  },
  {
    heights: [[1]],
    output: [[0, 0]],
  },
  {
    heights: [
      [1, 2, 3],
      [8, 9, 4],
      [7, 6, 5],
    ],
    output: [
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ],
  },
];

for (const { heights, output } of tests) {
  const result = pacificAtlantic(heights);
  console.warn({ heights, result, output });
}
