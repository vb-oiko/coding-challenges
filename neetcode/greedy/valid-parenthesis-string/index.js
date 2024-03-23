/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
  let min = 0;
  let max = 0;

  for (const char of s) {
    if (char === "(") {
      min++;
      max++;
      continue;
    }

    if (char === "*") {
      min = Math.max(0, min - 1);
      max++;
      continue;
    }

    // char === ")"

    min = Math.max(0, min - 1);
    max--;

    if (max < 0) {
      return false;
    }
  }

  return min === 0 && max >= 0;
};

const tests = [
  {
    s: "()",
    output: true,
  },
  {
    s: "(*)",
    output: true,
  },
  {
    s: "(*))",
    output: true,
  },
  {
    s: "(((((*(()((((*((**(((()()*)()()()*((((**)())*)*)))))))(())(()))())((*()()(((()((()*(())*(()**)()(())",
    output: false,
  },
  {
    s: "(((()))())))*))())()(**(((())(()(*()((((())))*())(())*(*(()(*)))()*())**((()(()))())(*(*))*))())",
    output: false,
  },
];

for (const { s, output } of tests) {
  const result = checkValidString(s);
  console.log({ s, result, output });
}
