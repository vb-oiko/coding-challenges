/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const result = [];

  const map = new Map();

  candidates.forEach((candidate) => {
    if (candidate > target) {
      return;
    }

    map.set(candidate, (map.get(candidate) || 0) + 1);
  });

  const keys = [...map.keys()];

  const candidate = [];
  let sum = 0;

  function dfs(i) {
    if (sum > target) {
      return;
    }

    if (sum === target) {
      result.push([...candidate]);
      return;
    }

    if (i >= keys.length) {
      return;
    }

    const key = keys[i];
    const count = map.get(key);

    dfs(i + 1);
    for (let j = 0; j < count; j++) {
      sum += key;
      candidate.push(key);
      dfs(i + 1);
    }
    sum -= key * count;
    candidate.length = candidate.length - count;
  }

  dfs(0);

  return result;
};

const tests = [
  {
    candidates: [
      14, 6, 25, 9, 30, 20, 33, 34, 28, 30, 16, 12, 31, 9, 9, 12, 34, 16, 25,
      32, 8, 7, 30, 12, 33, 20, 21, 29, 24, 17, 27, 34, 11, 17, 30, 6, 32, 21,
      27, 17, 16, 8, 24, 12, 12, 28, 11, 33, 10, 32, 22, 13, 34, 18, 12,
    ],
    target: 27,
    output: [],
  },
  // {
  //   candidates: [10, 1, 2, 7, 6, 1, 5],
  //   target: 8,
  //   output: [
  //     [1, 1, 6],
  //     [1, 2, 5],
  //     [1, 7],
  //     [2, 6],
  //   ],
  // },
  // {
  //   candidates: [2, 5, 2, 1, 2],
  //   target: 5,
  //   output: [[1, 2, 2], [5]],
  // },
  // {
  //   candidates: [1, 1],
  //   target: 1,
  //   output: [[1]],
  // },
];

const { expect } = require("../../../utils");

for (const { candidates, target, output } of tests) {
  const result = combinationSum2(candidates, target);
  const isValid = expect.array(result).toEqual(output);

  console.warn({ candidates, target, result, output, isValid });
}
