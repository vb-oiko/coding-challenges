/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = [];

  stack.push(0);

  for (
    let currentIndex = 1;
    currentIndex < temperatures.length;
    currentIndex++
  ) {
    const currentValue = temperatures[currentIndex];

    let previousIndex = stack[stack.length - 1];
    while (stack.length > 0 && currentValue > temperatures[previousIndex]) {
      result[previousIndex] = currentIndex - previousIndex;
      stack.pop();
      previousIndex = stack[stack.length - 1];
    }

    stack.push(currentIndex);
  }

  return result;
};

const tests = [
  {
    input: [73, 74, 75, 71, 69, 72, 76, 73],
    output: [1, 1, 4, 2, 1, 1, 0, 0],
  },
  {
    input: [30, 40, 50, 60],
    output: [1, 1, 1, 0],
  },
  {
    input: [30, 60, 90],
    output: [1, 1, 0],
  },
  {
    input: [30],
    output: [0],
  },
];

const { expect } = require("../../../utils");

for (const { input, output } of tests) {
  const result = dailyTemperatures(input);

  let isValid = expect.array(result).toEqual(output);

  console.warn({ input, result, output, isValid });
}
