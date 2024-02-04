/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const dp = new Array(nums).fill(1);
  let result = 1;

  for (let i = 1; i < nums.length; i++) {
    let max = 1;
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j] && dp[j] + 1 > max) {
        max = dp[j] + 1;
      }
    }
    dp[i] = max;
    if (max > result) {
      result = max;
    }
  }

  return result;
};

const tests = [
  {
    nums: [10, 9, 2, 5, 3, 7, 101, 18],
    output: 4,
  },
  {
    nums: [0, 1, 0, 3, 2, 3],
    output: 4,
  },
  {
    nums: [7, 7, 7, 7, 7, 7, 7],
    output: 1,
  },
];

for (const { nums, output } of tests) {
  const result = lengthOfLIS(nums);
  console.warn({ nums, result, output });
}
