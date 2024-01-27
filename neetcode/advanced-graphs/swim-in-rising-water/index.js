/**
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function (grid) {
  const n = grid.length;

  const neighbors = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  let depth = 0;

  const queue = new MinPriorityQueue();
  const visited = new Set();

  queue.enqueue([0, 0], grid[0][0]);

  while (queue.size() > 0) {
    const {
      element: [i, j],
      priority: elevation,
    } = queue.dequeue();

    if (visited.has(`${i}:${j}`)) {
      continue;
    }
    visited.add(`${i}:${j}`);

    depth = Math.max(depth, elevation);

    if (i === n - 1 && j === n - 1) {
      break;
    }

    for (const [ni, nj] of neighbors) {
      if (i + ni < 0 || i + ni >= n || j + nj < 0 || j + nj >= n) {
        continue;
      }

      queue.enqueue(
        [i + ni, j + nj],
        Math.max(elevation, grid[i + ni][j + nj])
      );
    }
  }

  return depth;
};

var { MinPriorityQueue } = require("@datastructures-js/priority-queue");

const tests = [
  {
    grid: [
      [0, 2],
      [1, 3],
    ],
    output: 3,
  },
  {
    grid: [
      [0, 1, 2, 3, 4],
      [24, 23, 22, 21, 5],
      [12, 13, 14, 15, 16],
      [11, 17, 18, 19, 20],
      [10, 9, 8, 7, 6],
    ],
    output: 16,
  },
];

for (const { grid, output } of tests) {
  const result = swimInWater(grid);

  console.warn({ grid, result, output });
}
