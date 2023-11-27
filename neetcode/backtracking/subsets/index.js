/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const result = [];

  const subset = [];

  function backtrack(i) {
    if (i >= nums.length) {
      result.push([...subset]);
      return;
    }

    subset.push(nums[i]);
    backtrack(i + 1);

    subset.pop();
    backtrack(i + 1);
  }

  backtrack(0);

  return result;
};

const tests = [
  {
    nums: [1, 2, 3],
    output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
  },
];

const { expect } = require("../../../utils");

for (const { nums, output } of tests) {
  const result = subsets(nums);
  const isValid = expect.array(result).toEqual(output);

  console.warn({ nums, result, output, isValid });
}
