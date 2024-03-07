/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
  const arr = [1, ...nums, 1];

  const dp = Array.from({ length: nums.length + 2 }, () =>
    new Array(nums.length + 2).fill(0)
  );

  for (l = nums.length; l >= 1; l--) {
    for (r = 1; r <= nums.length; r++) {
      let max = 0;
      for (let i = l; i <= r; i++) {
        const left = dp[l][i - 1];
        const mid = arr[l - 1] * arr[i] * arr[r + 1];
        const right = dp[i + 1][r];
        const val = left + mid + right;
        if (val > max) {
          max = val;
        }
      }
      dp[l][r] = max;
    }
  }

  return dp[1][nums.length];
};

const tests = [
  {
    nums: [3, 1, 5, 8],
    output: 167,
  },
  //   {
  //     nums: [1, 5],
  //     output: 10,
  //   },
  //   {
  //     nums: [8, 3, 4, 3, 5, 0, 5, 6, 6, 2, 8, 5, 6, 2, 3, 8, 3, 5, 1, 0, 2],
  //     output: 10,
  //   },
];

for (const { nums, output } of tests) {
  const result = maxCoins(nums);
  console.warn({ nums, result, output });
}
