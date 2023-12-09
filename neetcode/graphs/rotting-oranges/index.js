/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const EMPTY = 0;
  const FRESH = 1;
  const ROTTEN = 2;

  const m = grid.length;
  const n = grid[0].length;

  const time = new Array(m).fill().map(() => new Array(n).fill(null));

  function dfs(i, j, moment) {
    if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === EMPTY) {
      return 0;
    }

    if (grid[i][j] === ROTTEN) {
      time[i][j] = 0;
    }

    if (time[i][j] !== null && time[i][j] < moment) {
      return;
    }

    if (grid[i][j] === FRESH) {
      time[i][j] = moment;
    }

    dfs(i + 1, j, moment + 1);
    dfs(i - 1, j, moment + 1);
    dfs(i, j + 1, moment + 1);
    dfs(i, j - 1, moment + 1);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === ROTTEN) {
        dfs(i, j, 0);
      }
    }
  }

  let max = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === FRESH && time[i][j] === null) {
        return -1;
      }

      if (time[i][j] !== null && time[i][j] > max) {
        max = time[i][j];
      }
    }
  }

  return max;
};

const tests = [
  {
    grid: [
      [2, 1, 1],
      [1, 1, 0],
      [0, 1, 1],
    ],
    output: 4,
  },
  {
    grid: [
      [2, 1, 1],
      [0, 1, 1],
      [1, 0, 1],
    ],
    output: -1,
  },
  {
    grid: [[0, 2]],
    output: 0,
  },
  {
    grid: [[0, 1]],
    output: -1,
  },
];

for (const { grid, output } of tests) {
  const result = orangesRotting(grid);
  console.warn({ grid, result, output });
}
