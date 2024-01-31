/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const n = nums.length;
  if (n === 1) {
    return nums[0];
  }

  if (n === 2) {
    return Math.max(nums[0], nums[1]);
  }

  const cache = new Array(n);

  cache[0] = nums[0];
  cache[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    cache[i] = Math.max(cache[i - 1], cache[i - 2] + nums[i]);
  }

  return cache[n - 1];
};

const tests = [
  { nums: [1, 2, 3, 1], output: 4 },
  { nums: [2, 7, 9, 3, 1], output: 12 },
];

for (const { nums, output } of tests) {
  const result = rob(nums);
  console.warn({ nums, result, output });
}
