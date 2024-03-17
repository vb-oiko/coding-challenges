/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  const n = nums.length;
  let jumps = 0;
  let end = 0;
  let reach = 0;

  for (let i = 0; i < n - 1; i++) {
    reach = Math.max(reach, i + nums[i]);

    if (i === end) {
      end = reach;
      jumps++;
    }
  }

  return jumps;
};

const tests = [
  {
    nums: [2, 3, 1, 1, 4],
    output: 2,
  },
  {
    nums: [2, 3, 1, 0, 2, 2, 3],
    output: 3,
  },
  {
    nums: [1],
    output: 0,
  },
  { nums: [7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3], output: 2 },
];

for (const { nums, output } of tests) {
  const result = jump(nums);
  console.log({ nums, result, output });
}
