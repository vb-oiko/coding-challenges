/**
 * @param {character[][]} board
 * @return {boolean}
 */

const offsets = [
  [0, 0],
  [0, 3],
  [0, 6],
  [3, 0],
  [3, 3],
  [3, 6],
  [6, 0],
  [6, 3],
  [6, 6],
];

var isValidSudoku = function (board) {
  for (const offset of offsets) {
    const subset = getBoxSubset(board, ...offset);
    if (!isValidSubset(subset)) {
      return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    const rowSubset = getRowSubset(board, i);
    if (!isValidSubset(rowSubset)) {
      return false;
    }

    const columnSubset = getColumnSubset(board, i);
    if (!isValidSubset(columnSubset)) {
      return false;
    }
  }

  return true;
};

function isValidSubset(subset) {
  const map = new Map();
  for (const el of subset) {
    if (el === ".") {
      continue;
    }

    map.set(el, (map.get(el) || 0) + 1);
  }

  for (const [, value] of map) {
    if (value !== 1) {
      return false;
    }
  }
  return true;
}

function getRowSubset(board, i) {
  return board[i];
}

function getColumnSubset(board, i) {
  return board.map((row) => row[i]);
}

function getBoxSubset(board, i, j) {
  return board
    .slice(i, i + 3)
    .map((row) => row.slice(j, j + 3))
    .flat();
}

const boards = [
  [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ],
  [
    ["8", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ],
];

for (const board of boards) {
  const result = isValidSudoku(board);
  console.warn({ board, result });
}
