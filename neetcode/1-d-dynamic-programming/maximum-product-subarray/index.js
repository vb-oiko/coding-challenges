/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let maxSoFar = nums[0];
  let minSoFar = nums[0];
  let result = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const current = nums[i];
    let min = Math.min(current, current * maxSoFar, current * minSoFar);
    let max = Math.max(current, current * maxSoFar, current * minSoFar);
    if (max > result) {
      result = max;
    }
    maxSoFar = max;
    minSoFar = min;
  }

  return result;
};

const tests = [
  {
    nums: [2, 3, -2, 4],
    output: 6,
  },
];

for (const { nums, output } of tests) {
  const result = maxProduct(nums);

  console.warn({ nums, result, output });
}

// [2, 3, -2, 4]
// [2, 3, -2]
//    [3, -2, 4]
// [2, 3]
//    [3, -2]
//       [-2, 4]
// [2]
//    [3]
//       [-2]
//            [4]
