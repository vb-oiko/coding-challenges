/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const result = [];

  function addCandidate(arr) {
    const res = [];

    for (let i = 0; i < candidates.length; i++) {
      for (let j = 0; j < arr[i]; j++) {
        res.push(candidates[i]);
      }
    }
    result.push(res);
  }

  function getSum(arr) {
    let sum = 0;
    for (let i = 0; i < candidates.length; i++) {
      sum += arr[i] * candidates[i];
    }
    return sum;
  }

  const candidate = new Array(candidates.length).fill(0);

  function backtrack(i) {
    const total = getSum(candidate);

    if (total > target) {
      return;
    }

    if (total === target) {
      addCandidate(candidate);
      return;
    }

    if (i >= candidates.length) {
      return;
    }

    const max = Math.floor((target - total) / candidates[i]);

    for (let count = max; count >= 0; count--) {
      candidate[i] = count;
      backtrack(i + 1);
    }
  }

  backtrack(0);

  return result;
};

const tests = [
  {
    candidates: [2, 3, 6, 7],
    target: 7,
    output: [[2, 2, 3], [7]],
  },
];

const { expect } = require("../../../utils");

for (const { candidates, target, output } of tests) {
  const result = combinationSum(candidates, target);
  const isValid = expect.array(result).toEqual(output);

  console.warn({ candidates, target, result, output, isValid });
}
