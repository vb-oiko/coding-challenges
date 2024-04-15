/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let result = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    result ^= nums[i];
  }
  return result;
};

const tests = [
  {
    nums: [2, 2, 1],
    output: 1,
  },
];

for (const { nums, output } of tests) {
  const result = singleNumber(nums);
  console.log({ nums, result, output });
}
