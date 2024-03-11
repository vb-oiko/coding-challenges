/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  const n = nums.length;
  if (n === 1) {
    return true;
  }

  const cache = new Array(n).fill(null);
  cache[n - 1] = true;

  function dp(i) {
    if (i >= n) {
      return false;
    }

    if (cache[i] !== null) {
      return cache[i];
    }

    let result = false;
    for (let j = Math.min(n - 1, i + nums[i]); j >= i + 1; j--) {
      if (dp(j)) {
        result = true;
        break;
      }
    }
    cache[i] = result;
    return result;
  }

  return dp(0);
};

const tests = [
  {
    nums: [2, 3, 1, 1, 4],
    output: true,
  },
  {
    nums: [3, 2, 1, 0, 4],
    output: false,
  },
];

for (const { nums, output } of tests) {
  const result = canJump(nums);
  console.log({ nums, result, output });
}
