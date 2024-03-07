/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
  const arr = [1, ...nums, 1];
  const cache = Array.from({ length: nums.length + 1 }, () =>
    new Array(nums.length + 1).fill(null)
  );

  function dp(l, r) {
    if (l > r) {
      return 0;
    }

    if (cache[l][r] !== null) {
      return cache[l][r];
    }

    let max = 0;
    for (let i = l; i <= r; i++) {
      const val =
        dp(l, i - 1) + arr[l - 1] * arr[i] * arr[r + 1] + dp(i + 1, r);
      if (val > max) {
        max = val;
      }
    }
    cache[l][r] = max;
    return max;
  }

  return dp(1, nums.length);
};

const tests = [
  {
    nums: [3, 1, 5, 8],
    output: 167,
  },
  {
    nums: [1, 5],
    output: 10,
  },
  {
    nums: [8, 3, 4, 3, 5, 0, 5, 6, 6, 2, 8, 5, 6, 2, 3, 8, 3, 5, 1, 0, 2],
    output: 10,
  },
];

for (const { nums, output } of tests) {
  const result = maxCoins(nums);
  console.warn({ nums, result, output });
}
