/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  const set = new Set(nums);

  let longest = 1;
  let current = 1;
  let min = nums[0];
  let max = nums[0];
  set.delete(nums[0]);

  for (const num of set) {
    if (!set.has(num)) {
      continue;
    }

    while (true) {
      if (set.has(min - 1)) {
        set.delete(min - 1);
        min -= 1;
        current += 1;
        continue;
      }

      if (set.has(max + 1)) {
        set.delete(max + 1);
        max += 1;
        current += 1;
        continue;
      }

      break;
    }

    if (current > longest) {
      longest = current;
    }

    min = num;
    max = num;
    current = 1;
    set.delete(num);
  }

  return longest;
};

const tests = [
  [100, 4, 200, 1, 3, 2],
  [0, 3, 7, 2, 5, 8, 4, 6, 0, 1],
];

for (const test of tests) {
  const result = longestConsecutive(test);
  console.warn({ test, result });
}
