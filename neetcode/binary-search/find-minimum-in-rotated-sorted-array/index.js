/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  if (nums.length === 1) {
    return nums[0];
  }

  let left = 0;
  let right = nums.length - 1;

  if (nums[left] < nums[right]) {
    return nums[left];
  }

  let mid = Math.floor((left + right) / 2);

  while (right - left > 1) {
    console.warn({ left, mid, right });

    if (nums[mid] > nums[left]) {
      left = mid;
    }

    if (nums[mid] < nums[right]) {
      right = mid;
    }

    mid = Math.floor((left + right) / 2);
  }

  return Math.min(nums[left], nums[right]);
};

const tests = [
  {
    nums: [3, 4, 5, 1, 2],
    output: 1,
  },
  {
    nums: [4, 5, 6, 7, 0, 1, 2],
    output: 0,
  },
  {
    nums: [11, 13, 15, 17],
    output: 11,
  },
];

for (const { nums, output } of tests) {
  const result = findMin(nums);

  let isValid = result === output;

  console.warn({ nums, result, output, isValid });
}
