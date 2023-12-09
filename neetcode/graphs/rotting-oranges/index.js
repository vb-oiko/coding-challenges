/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const EMPTY = 0;
  const FRESH = 1;
  const ROTTEN = 2;
  const NEIGHBORS = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const m = grid.length;
  const n = grid[0].length;

  const time = new Array(m).fill().map(() => new Array(n).fill(null));

  function bfs(level, moment) {
    if (!level.length) {
      return;
    }

    const nextLevel = [];
    const nextLevelSet = new Set();

    for (const { i, j } of level) {
      time[i][j] = moment;

      for (const [di, dj] of NEIGHBORS) {
        const i1 = i + di;
        const j1 = j + dj;

        if (
          i1 < 0 ||
          j1 < 0 ||
          i1 >= m ||
          j1 >= n ||
          grid[i1][j1] !== FRESH ||
          time[i1][j1] !== null
        ) {
          continue;
        }

        const key = `${i1}-${j1}`;

        if (nextLevelSet.has(key)) {
          continue;
        }

        nextLevelSet.add(key);
        nextLevel.push({ i: i1, j: j1 });
        time[i1][j1] = moment;
      }
    }

    bfs(nextLevel, moment + 1);
  }

  const level = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === ROTTEN) {
        level.push({ i, j });
      }
    }
  }

  bfs(level, 0);

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
  //   {
  //     grid: [
  //       [2, 1, 1],
  //       [1, 1, 0],
  //       [0, 1, 1],
  //     ],
  //     output: 4,
  //   },
  //   {
  //     grid: [
  //       [2, 1, 1],
  //       [0, 1, 1],
  //       [1, 0, 1],
  //     ],
  //     output: -1,
  //   },
  //   {
  //     grid: [[0, 2]],
  //     output: 0,
  //   },
  //   {
  //     grid: [[0, 1]],
  //     output: -1,
  //   },
  {
    grid: [
      [2, 2],
      [1, 1],
      [0, 0],
      [2, 0],
    ],
    output: 1,
  },
];

for (const { grid, output } of tests) {
  const result = orangesRotting(grid);
  console.warn({ grid, result, output });
}
