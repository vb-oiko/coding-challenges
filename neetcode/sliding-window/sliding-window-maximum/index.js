/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  if (nums.length === 0) {
    return [];
  }

  const result = [];
  let left = 0;
  let max = nums[0];

  for (let right = 0; right < nums.length; right++) {
    if (right < k) {
      if (nums[right] > max) {
        max = nums[right];
      }

      if (right === k - 1) {
        result.push(max);
      }
      continue;
    }

    if (nums[right] > max) {
      max = nums[right];
    }

    if (nums[left] === max && nums[right] < max) {
      max = nums[left + 1];
      for (let i = left + 2; i <= right; i++) {
        if (nums[i] > max) {
          max = nums[i];
        }
      }
    }

    result.push(max);
    left++;
  }

  return result;
};

const tests = [
  {
    nums: [1, 3, -1, -3, 5, 3, 6, 7],
    k: 3,
    expected: [3, 3, 5, 5, 6, 7],
  },
  {
    nums: [1],
    k: 1,
    expected: [1],
  },
];

for (const { nums, k, expected } of tests) {
  const result = maxSlidingWindow(nums, k);

  let isValid = true;
  for (let i = 0; i < expected.length; i++) {
    if (result[i] !== expected[i]) {
      isValid = false;
      break;
    }
  }

  console.warn({ nums, k, expected, result, isValid });
}
