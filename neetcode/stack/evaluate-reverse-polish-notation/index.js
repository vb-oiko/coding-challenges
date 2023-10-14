/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const OPERATORS_SET = new Set(["+", "-", "*", "/"]);
  const stack = [];

  for (const token of tokens) {
    if (!OPERATORS_SET.has(token)) {
      stack.push(token);
      continue;
    }

    const operand1 = Number(stack.pop());
    const operand2 = Number(stack.pop());

    let result;

    if (token === "+") {
      result = operand2 + operand1;
    }

    if (token === "-") {
      result = operand2 - operand1;
    }

    if (token === "*") {
      result = operand2 * operand1;
    }

    if (token === "/") {
      const div = operand2 / operand1;
      result = div >= 0 ? Math.floor(div) : Math.ceil(div);
    }

    stack.push(String(result));
  }

  return Number(stack.pop());
};

const tests = [
  {
    input: ["2", "1", "+", "3", "*"],
    output: 9,
  },
  {
    input: ["4", "13", "5", "/", "+"],
    output: 6,
  },
  {
    input: [
      "10",
      "6",
      "9",
      "3",
      "+",
      "-11",
      "*",
      "/",
      "*",
      "17",
      "+",
      "5",
      "+",
    ],
    output: 22,
  },
];

for (const { input, output } of tests) {
  const result = evalRPN(input);
  console.warn({ input, result, output, valid: result === output });
}
