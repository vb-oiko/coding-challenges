/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const totalSum = nums.reduce((prev, curr) => prev + curr, 0);

  if (totalSum % 2 === 1) {
    return false;
  }

  const target = totalSum / 2;

  let prev = new Array(target + 1).fill(false);
  prev[0] = true;

  for (const num of nums) {
    const curr = [...prev];
    for (let sum = 0; sum <= target; sum++) {
      if (!prev[sum]) {
        continue;
      }

      if (sum + num < target) {
        curr[sum + num] = true;
        continue;
      }
      if (sum + num === target) {
        return true;
      }
    }
    prev = curr;
  }

  return false;
};

const tests = [
  {
    nums: [1, 5, 11, 5],
    output: true,
  },
  {
    nums: [1, 2, 3, 5],
    output: false,
  },
  {
    nums: [3, 3, 3, 4, 5],
    output: true,
  },
];

for (const { nums, output } of tests) {
  const result = canPartition(nums);
  console.warn({ nums, result, output });
}
