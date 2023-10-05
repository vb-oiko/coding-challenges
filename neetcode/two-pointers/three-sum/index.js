/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);

  console.warn(nums);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    const twoSumResult = twoSum(nums, -nums[i], i + 1);

    twoSumResult.forEach((subArr) => result.push([nums[i], ...subArr]));
  }

  return result;
};

/**
 *
 * @param {number[]} arr - ascendantly sorted array
 * @param {number} target
 * @param {number} start
 * @returns {[number, number]}
 */
function twoSum(arr, target, start) {
  let left = start;
  let right = arr.length - 1;

  const result = [];

  while (left < right) {
    if (left > start && arr[left] === arr[left - 1]) {
      left++;
      continue;
    }

    const sum = arr[left] + arr[right];

    if (sum === target) {
      result.push([arr[left], arr[right]]);
      left++;
    }

    if (sum > target) {
      right--;
      continue;
    }

    if (sum < target) {
      left++;
      continue;
    }
  }

  return result;
}

const tests = [
  [-1, 0, 1, 2, -1, -4],
  [0, 1, 1],
  [0, 0, 0],
  [0, 0, 0, 0],
];

for (const test of tests) {
  const result = threeSum(test);
  console.warn({ test, result });
}
