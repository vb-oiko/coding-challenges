/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  function robPart(start, end) {
    const n = end - start;
    const cache = new Array(n);

    cache[0] = nums[start];
    cache[1] = Math.max(nums[start], nums[start + 1]);

    for (let offset = 2; offset < n; offset++) {
      cache[offset] = Math.max(
        nums[start + offset] + cache[offset - 2],
        cache[offset - 1]
      );
    }

    return cache[n - 1];
  }

  const n = nums.length;

  if (n === 1) {
    return nums[0];
  }

  if (n === 2) {
    return Math.max(nums[0], nums[1]);
  }

  if (n === 3) {
    return Math.max(nums[0], nums[1], nums[2]);
  }

  return Math.max(robPart(0, n - 1), robPart(1, n));
};

const tests = [
  { nums: [2, 3, 2], output: 3 },
  { nums: [1, 2, 3, 1], output: 4 },
  { nums: [1, 2, 3], output: 3 },
  { nums: [4, 1, 2, 7, 5, 3, 1], output: 14 },
];

for (const { nums, output } of tests) {
  const result = rob(nums);
  console.warn({ nums, result, output });
}
