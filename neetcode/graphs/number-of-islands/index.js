/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const explored = new Array(m).fill().map(() => new Array(n).fill(false));

  function exploreLand(i, j) {
    if (i < 0 || j < 0 || i >= m || j >= n || explored[i][j]) {
      return;
    }

    explored[i][j] = true;

    if (grid[i][j] === "0") {
      return;
    }

    exploreLand(i + 1, j);
    exploreLand(i - 1, j);
    exploreLand(i, j + 1);
    exploreLand(i, j - 1);
  }

  let result = 0;

  function explore(i, j) {
    if (i < 0 || j < 0 || i >= m || j >= n || explored[i][j]) {
      return;
    }

    if (grid[i][j] === "1") {
      result++;
      exploreLand(i, j);
      return;
    }

    explored[i][j] = true;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      explore(i, j);
    }
  }

  return result;
};

const tests = [
  {
    grid: [
      ["1", "1", "1", "1", "0"],
      ["1", "1", "0", "1", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
    ],
    output: 1,
  },
];

for (const { grid, output } of tests) {
  const result = numIslands(grid);
  console.warn({ grid, result, output });
}
