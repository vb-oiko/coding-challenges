/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
  const n = nums.length;

  const cache = new Map([["", 0]]);

  function dp(key) {
    const cached = cache.get(key);
    if (cached !== undefined) {
      return cached;
    }

    let max = 0;

    for (let i = 0; i < key.length; i++) {
      const newKey = key.slice(0, i) + key.slice(i + 1, n + 1);

      const prev = i - 1 < 0 ? 1 : nums[key.charCodeAt(i - 1)];
      const cur = nums[key.charCodeAt(i)];
      const next = i + 1 >= key.length ? 1 : nums[key.charCodeAt(i + 1)];
      const prod = prev * next * cur + dp(newKey);
      if (prod > max) {
        max = prod;
      }
    }
    cache.set(key, max);
    return max;
  }

  const result = dp(nums.map((_, i) => String.fromCharCode(i)).join(""));

  console.warn(
    [...cache.entries()]
      .sort((a, b) => (a[0].length < b[0].length ? -1 : 1))
      .map(([key, value]) => [
        key.split("").map((c) => c.charCodeAt(0)),
        key.split("").map((c) => nums[c.charCodeAt(0)]),
        value,
      ])
  );

  return result;
};

const tests = [
  {
    nums: [3, 1, 5, 8],
    output: 167,
  },
  //   {
  //     nums: [1, 5],
  //     output: 10,
  //   },
  //   {
  //     nums: [8, 3, 4, 3, 5, 0, 5, 6, 6, 2, 8, 5, 6, 2, 3, 8, 3, 5, 1, 0, 2],
  //     output: 10,
  //   },
];

for (const { nums, output } of tests) {
  const result = maxCoins(nums);
  console.warn({ nums, result, output });
}
