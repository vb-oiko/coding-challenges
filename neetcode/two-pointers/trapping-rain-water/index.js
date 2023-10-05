/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let left = 0;
  let right = height.length - 1;
  let maxLeftLevel = 0;
  let maxRightLevel = 0;
  let result = 0;

  while (left !== right) {
    const leftLevel = height[left];
    const rightLevel = height[right];

    if (leftLevel > maxLeftLevel) {
      maxLeftLevel = leftLevel;
    }

    if (rightLevel > maxRightLevel) {
      maxRightLevel = rightLevel;
    }

    const maxLevel = Math.min(maxLeftLevel, maxRightLevel);

    if (leftLevel <= rightLevel) {
      left++;
      const volume = maxLevel - height[left];
      if (volume >= 0) {
        result += volume;
      }
      continue;
    }

    const volume = maxLevel - height[right];
    if (volume >= 0) {
      result += volume;
    }

    right--;
  }

  return result;
};

const tests = [
  [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
  [4, 2, 0, 3, 2, 5],
];

for (const test of tests) {
  const result = trap(test);
  console.warn({ test, result });
}
