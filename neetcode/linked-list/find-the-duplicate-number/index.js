/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let fast = 0;
  let slow = 0;
  while (slow === 0 || fast !== slow) {
    slow = nums[slow];
    fast = nums[nums[fast]];
  }

  let p1 = 0;
  let p2 = slow;
  while (p1 !== p2) {
    p1 = nums[p1];
    p2 = nums[p2];
  }

  return p1;
};

const tests = [
  { input: [1, 3, 4, 2, 2], output: 2 },
  { input: [3, 1, 3, 4, 2], output: 3 },
  { input: [2, 5, 9, 6, 9, 3, 8, 9, 7, 1], output: 9 },
];

for (const { input, output } of tests) {
  const result = findDuplicate(input);
  const isValid = result === output;

  console.log({ input, result, output, isValid });
}
