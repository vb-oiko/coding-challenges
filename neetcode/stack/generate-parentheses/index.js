/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const result = [];

  function backTrack(open, close, str) {
    if (open === close && open === n) {
      result.push(str);
      return;
    }

    if (open < n) {
      backTrack(open + 1, close, `${str}(`);
    }
    if (close < n && close < open) {
      backTrack(open, close + 1, `${str})`);
    }
  }

  backTrack(0, 0, "");

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
