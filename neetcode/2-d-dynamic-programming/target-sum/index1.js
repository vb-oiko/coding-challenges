/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  const n = nums.length;
  const cache = new Map();

  function dp(localTarget, index) {
    const row = cache.get(localTarget) || new Map();

    if (row.get(index) !== undefined) {
      return row.get(index);
    }

    if (index === n) {
      return localTarget === 0 ? 1 : 0;
    }

    const value =
      dp(localTarget - nums[index], index + 1) +
      dp(localTarget + nums[index], index + 1);
    row.set(index, value);
    cache.set(localTarget, row);
    return value;
  }

  return dp(target, 0);
};

const tests = [
  {
    nums: [1, 1, 1, 1, 1],
    target: 3,
    output: 5,
  },
];

for (const { nums, target, output } of tests) {
  const result = findTargetSumWays(nums, target);
  console.warn({ nums, target, result, output });
}
