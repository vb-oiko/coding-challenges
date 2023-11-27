/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const result = [];

  const set = new Set(nums);
  const permutation = [];

  function backtrack() {
    if (set.size === 0) {
      result.push([...permutation]);
      return;
    }

    const candidates = [...set.values()];

    for (const value of candidates) {
      permutation.push(value);
      set.delete(value);
      backtrack();
      permutation.pop();
      set.add(value);
    }
  }

  backtrack();

  return result;
};

const tests = [
  {
    nums: [1, 2, 3],
    output: [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ],
  },
  {
    nums: [1, 0],
    output: [],
  },
  {
    nums: [1],
    output: [],
  },
];

const { expect } = require("../../../utils");

for (const { nums, output } of tests) {
  const result = permute(nums);
  const isValid = expect.array(result).toEqual(output);

  console.warn({ nums, result, output, isValid });
}
