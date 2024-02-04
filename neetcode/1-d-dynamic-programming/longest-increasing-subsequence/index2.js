/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const subsequence = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > subsequence[subsequence.length - 1]) {
      subsequence.push(nums[i]);
      continue;
    }

    for (let j = 0; j < i; j++) {
      if (nums[i] <= subsequence[j]) {
        subsequence[j] = nums[i];
        break;
      }
    }
  }

  return subsequence.length;
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
