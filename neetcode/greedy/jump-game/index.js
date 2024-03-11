/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  const n = nums.length;
  if (n === 1) {
    return true;
  }

  last = n - 1;

  for (let i = n - 2; i >= 0; i--) {
    if (i + nums[i] >= last) {
      last = i;
    }
  }

  return last === 0;
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
