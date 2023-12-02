/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits.length === 0) {
    return [];
  }

  const digitToLettersMap = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const result = [];
  const candidate = [];

  function backtrack(i) {
    if (i === digits.length) {
      result.push(candidate.join(""));
      return;
    }

    for (const char of digitToLettersMap[digits[i]]) {
      candidate.push(char);
      backtrack(i + 1);
      candidate.pop();
    }
  }

  backtrack(0);

  return result;
};

const tests = [
  {
    digits: "23",
    output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"],
  },
];

for (const { digits, output } of tests) {
  const result = letterCombinations(digits);
  console.warn({ digits, result, output });
}
