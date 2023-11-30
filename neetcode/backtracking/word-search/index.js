/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const m = board.length;
  const n = board[0].length;
  let index = 0;
  let result = false;

  function backtrack(i, j) {
    if (index === word.length) {
      result = true;
    }

    if (result || i < 0 || j < 0 || i >= m || j >= n) {
      return;
    }

    const char = board[i][j];

    if (char !== word[index]) {
      return;
    }

    board[i][j] = null;
    index++;

    backtrack(i - 1, j);
    backtrack(i + 1, j);
    backtrack(i, j - 1);
    backtrack(i, j + 1);

    board[i][j] = char;
    index--;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      backtrack(i, j);
      if (result) {
        break;
      }
    }
    if (result) {
      break;
    }
  }

  return result;
};

const tests = [
  {
    board: [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    word: "ABCCED",
    output: true,
  },
  {
    board: [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    word: "SEE",
    output: true,
  },
  {
    board: [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    word: "ABCB",
    output: false,
  },
];

for (const { board, word, output } of tests) {
  const result = exist(board, word);
  const isValid = output === result;
  console.warn({ board, word, result, output, isValid });
}
