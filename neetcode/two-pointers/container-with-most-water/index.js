/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let max = 0;
  let current = 0;
  while (right - left >= 1) {
    current = Math.min(height[left], height[right]) * (right - left);
    if (current > max) {
      max = current;
    }

    if (height[left] > height[right]) {
      right--;
      continue;
    }

    left++;
  }

  return max;
};

const tests = [
  [1, 8, 6, 2, 5, 4, 8, 3, 7],
  [1, 1],
];

for (const test of tests) {
  const result = maxArea(test);
  console.warn({ test, result });
}
