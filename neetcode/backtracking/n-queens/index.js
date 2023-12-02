/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const result = [];
  const candidate = [];

  const cols = new Set(new Array(n).fill().map((_, i) => i));
  const diagPlus = new Set(new Array(n * 2 - 1).fill().map((_, i) => i));
  const diagMinus = new Set(
    new Array(n * 2 - 1).fill().map((_, i) => i - n + 1)
  );

  function backtrack(row) {
    if (row === n) {
      result.push([...candidate]);
      return;
    }

    const freeCols = [...cols];
    for (const col of freeCols) {
      if (diagPlus.has(col + row) && diagMinus.has(col - row)) {
        cols.delete(col);
        diagPlus.delete(col + row);
        diagMinus.delete(col - row);
        const rendered = ".".repeat(col) + "Q" + ".".repeat(n - col - 1);

        candidate.push(rendered);

        backtrack(row + 1);

        cols.add(col);
        diagPlus.add(col + row);
        diagMinus.add(col - row);
        candidate.pop();
      }
    }
  }

  backtrack(0);

  return result;
};

const tests = [
  {
    n: 4,
    output: [
      [".Q..", "...Q", "Q...", "..Q."],
      ["..Q.", "Q...", "...Q", ".Q.."],
    ],
  },
];

for (const { n, output } of tests) {
  const result = solveNQueens(n);
  console.warn({ n, result, output });
}
