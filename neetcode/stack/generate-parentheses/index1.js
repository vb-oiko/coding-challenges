/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const mem = new Map();
  function backTrack(n) {
    if (mem.has(n)) {
      return mem.get(n);
    }

    if (n === 0) {
      mem.set(0, [""]);
      return [""];
    }

    const res = [];

    for (let i = 0; i < n; i++) {
      const leftItems = backTrack(i);
      const rightItems = backTrack(n - i - 1);

      leftItems.forEach((left) => {
        rightItems.forEach((right) => {
          res.push(`(${left})${right}`);
        });
      });
    }

    mem.set(n, res);
    return res;
  }

  const result = backTrack(n);

  return result;
};

const tests = [
  {
    n: 3,
    output: ["((()))", "(()())", "(())()", "()(())", "()()()"],
  },
  {
    n: 1,
    output: ["()"],
  },
];

for (const { n, output } of tests) {
  const result = generateParenthesis(n);

  let isValid = true;
  if (result.length !== output.length) {
    isValid = false;
  } else {
    for (const item of result) {
      if (!output.includes(item)) {
        isValid = false;
        break;
      }
    }
  }

  console.warn({ n, result, output, isValid });
}
