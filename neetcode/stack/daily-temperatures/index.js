/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = [];

  stack.push({ value: temperatures[0], index: 0 });

  for (let index = 1; index < temperatures.length; index++) {
    const current = { value: temperatures[index], index };

    let previous = stack[stack.length - 1];
    while (stack.length > 0 && current.value > previous.value) {
      result[previous.index] = current.index - previous.index;
      stack.pop();
      previous = stack[stack.length - 1];
    }

    stack.push(current);
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
