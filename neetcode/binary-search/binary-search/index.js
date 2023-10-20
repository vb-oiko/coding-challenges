/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let mid = Math.floor((right - left) / 2);

  while (mid > left) {
    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      left = mid;
    }

    if (nums[mid] > target) {
      right = mid;
    }

    mid = Math.floor((right + left) / 2);
  }

  if (nums[mid] === target) {
    return mid;
  }

  if (nums[right] === target) {
    return right;
  }

  return -1;
};

const tests = [
  {
    nums: [-1, 0, 3, 5, 9, 12],
    target: 9,
    output: 4,
  },
  {
    nums: [2, 5],
    target: 5,
    output: 1,
  },
];

for (const { nums, target, output } of tests) {
  const result = search(nums, target);

  let isValid = result === output;

  console.warn({ nums, target, result, output, isValid });
}
