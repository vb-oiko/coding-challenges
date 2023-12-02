/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const visited = new Array(m).fill().map(() => new Array(n).fill(false));
  let result = 0;
  let area = 0;

  function exploreLand(i, j) {
    if (i < 0 || j < 0 || i === m || j === n || visited[i][j]) {
      return;
    }

    visited[i][j] = true;

    if (grid[i][j] === 0) {
      return;
    }

    area++;

    exploreLand(i + 1, j);
    exploreLand(i - 1, j);
    exploreLand(i, j + 1);
    exploreLand(i, j - 1);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j]) {
        continue;
      }

      if (grid[i][j] === 1) {
        area = 0;
        exploreLand(i, j);
        if (area > result) {
          result = area;
        }
      }
    }
  }

  return result;
};

const tests = [
  {
    grid: [
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    ],
    output: 6,
  },
];

for (const { grid, output } of tests) {
  const result = maxAreaOfIsland(grid);
  console.warn({ grid, result, output });
}
