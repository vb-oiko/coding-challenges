/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  const n = nums.length;
  let result = 0;

  for (let i = 0; i < n; i++) {
    result = result ^ i ^ nums[i];
  }

  return result ^ n;
};

const tests = [
  {
    nums: [3, 0, 1],
    output: 2,
  },
];

for (const { nums, output } of tests) {
  const result = missingNumber(nums);
  console.log({ nums, result, output });
}
