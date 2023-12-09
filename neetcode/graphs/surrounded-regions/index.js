/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  const m = board.length;
  const n = board[0].length;

  function dfs(i, j) {
    if (i < 0 || j < 0 || i >= m || j >= n) {
      return;
    }

    if (board[i][j] === "X" || board[i][j] === "o") {
      return;
    }

    board[i][j] = "o";

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }

  for (let i = 0; i < m; i++) {
    dfs(i, 0);
    dfs(i, n - 1);
  }

  for (let j = 0; j < n; j++) {
    dfs(0, j);
    dfs(m - 1, j);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const cell = board[i][j];
      if (cell === "o") {
        board[i][j] = "O";
        continue;
      }

      if (cell === "O") {
        board[i][j] = "X";
      }
    }
  }
};

const tests = [
  //   {
  //     board: [
  //       ["X", "X", "X", "X"],
  //       ["X", "O", "O", "X"],
  //       ["X", "X", "O", "X"],
  //       ["X", "O", "X", "X"],
  //     ],
  //     output: [
  //       ["X", "X", "X", "X"],
  //       ["X", "X", "X", "X"],
  //       ["X", "X", "X", "X"],
  //       ["X", "O", "X", "X"],
  //     ],
  //   },
  //   {
  //     board: [
  //       ["O", "O"],
  //       ["O", "O"],
  //     ],
  //     output: [
  //       ["O", "O"],
  //       ["O", "O"],
  //     ],
  //   },
  {
    board: [
      ["X", "O", "X", "O", "X", "O"],
      ["O", "X", "O", "X", "O", "X"],
      ["X", "O", "X", "O", "X", "O"],
      ["O", "X", "O", "X", "O", "X"],
    ],
    output: [
      ["X", "O", "X", "O", "X", "O"],
      ["O", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "O"],
      ["O", "X", "O", "X", "O", "X"],
    ],
  },
];

for (const { board, output } of tests) {
  console.warn({ board });
  solve(board);
  console.warn({ board, output });
}
