/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (true) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      break;
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

  return [left + 1, right + 1];
};

const tests = [
  {
    numbers: [2, 7, 11, 15],
    target: 9,
  },
  {
    numbers: [2, 3, 4],
    target: 6,
  },
  {
    numbers: [-1, 0],
    target: -1,
  },
];

for (const { numbers, target } of tests) {
  const result = twoSum(numbers, target);
  console.warn({ numbers, target, result });
}
