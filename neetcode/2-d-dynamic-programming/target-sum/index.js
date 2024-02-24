/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  const sum = nums.reduce((acc, cur) => acc + cur, 0);

  let prev = new Map();
  prev.set(target, 1);

  for (const num of nums) {
    const cur = new Map();
    for (
      let localTarget = target - sum;
      localTarget <= target + sum;
      localTarget++
    ) {
      cur.set(
        localTarget - num,
        (prev.get(localTarget) ?? 0) + (cur.get(localTarget - num) ?? 0)
      );
      cur.set(
        localTarget + num,
        (prev.get(localTarget) ?? 0) + (cur.get(localTarget + num) ?? 0)
      );
    }
    prev = cur;
  }

  return prev.get(0) ?? 0;
};

const tests = [
  {
    nums: [1, 1, 1, 1, 1],
    target: 3,
    output: 5,
  },
];

for (const { nums, target, output } of tests) {
  const result = findTargetSumWays(nums, target);
  console.warn({ nums, target, result, output });
}
