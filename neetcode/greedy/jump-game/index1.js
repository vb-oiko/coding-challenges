/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  const n = nums.length;
  if (n === 1) {
    return true;
  }

  const dp = new Array(n).fill(false);
  dp[n - 1] = true;

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 1; j <= nums[i]; j++) {
      if (i + j < n && dp[i + j]) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[0];
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
