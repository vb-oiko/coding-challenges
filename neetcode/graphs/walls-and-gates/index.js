/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
var wallsAndGates = function (rooms) {
  const m = rooms.length;
  const n = rooms[0].length;

  const ROOM = 2147483647;
  const GATE = 0;
  const NEIGHBORS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function bfs(level, distance) {
    if (!level.length) {
      return;
    }

    const newLevel = [];
    const newLevelSet = new Set();

    for (const { i, j } of level) {
      for (const [di, dj] of NEIGHBORS) {
        const i1 = i + di;
        const j1 = j + dj;

        if (i1 < 0 || j1 < 0 || i1 >= m || j1 >= n || rooms[i1][j1] !== ROOM) {
          continue;
        }

        const key = `${i1}-${j1}`;
        if (newLevelSet.has(key)) {
          continue;
        }

        rooms[i1][j1] = distance;
        newLevelSet.add(key);
        newLevel.push({ i: i1, j: j1 });
      }
    }

    bfs(newLevel, distance + 1);
  }

  const level = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rooms[i][j] === GATE) {
        level.push({ i, j });
      }
    }
  }

  bfs(level, 1);
};

const tests = [
  {
    rooms: [
      [2147483647, -1, 0, 2147483647],
      [2147483647, 2147483647, 2147483647, -1],
      [2147483647, -1, 2147483647, -1],
      [0, -1, 2147483647, 2147483647],
    ],
    output: [
      [3, -1, 0, 1],
      [2, 2, 1, -1],
      [1, -1, 2, -1],
      [0, -1, 3, 4],
    ],
  },
];

for (const { rooms, output } of tests) {
  console.warn({ rooms });
  wallsAndGates(rooms);
  console.warn({ rooms, output });
}
