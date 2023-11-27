/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  const result = [];

  const map = new Map();
  for (const num of nums) {
    const count = map.get(num) || 0;
    map.set(num, count + 1);
  }

  const keys = [...map.keys()];

  const subset = [];

  function dfs(i) {
    if (i >= keys.length) {
      result.push([...subset]);
      return;
    }

    const key = keys[i];
    const count = map.get(key);

    dfs(i + 1);
    for (let j = 0; j < count; j++) {
      subset.push(key);
      dfs(i + 1);
    }
    subset.length = subset.length - count;
  }

  dfs(0);

  return result;
};

const tests = [
  {
    nums: [1, 2, 2],
    output: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]],
  },
  {
    nums: [0],
    output: [[], [0]],
  },
];

const { expect } = require("../../../utils");

for (const { nums, output } of tests) {
  const result = subsetsWithDup(nums);
  const isValid = expect.array(result).toEqual(output);

  console.warn({ nums, result, output, isValid });
}
