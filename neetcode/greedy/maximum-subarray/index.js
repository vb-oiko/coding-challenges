/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let sum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > sum + nums[i]) {
      sum = nums[i];
    } else {
      sum = sum + nums[i];
    }

    if (sum > maxSum) {
      maxSum = sum;
    }
  }

  return maxSum;
};

const tests = [
  {
    nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    output: 6,
  },
];

for (const { nums, output } of tests) {
  const result = maxSubArray(nums);
  console.log({ nums, result, output });
}
