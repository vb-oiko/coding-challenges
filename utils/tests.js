const { TreeNode, expect } = require("./index");

const tests = [
  //   { input: [1, 2, 3], output: 6 },
  //   { input: [1, -2, 3], output: 4 },
  //   { input: [-10, 9, 20, null, null, 15, 7], output: 42 },
  //   { input: [-1, -2, 10, -6, null, -3, -6], output: 10 },
  //   { input: [-1, 5, null, 4, null, null, 2, -4] },
  { input: [-1, 5, null, 4, null, 2, -4] },
  { input: [-1, 5, null, 4, null, 2, -4, 7] },
  //   { input: [] },
];

for (const { input } of tests) {
  const tree = TreeNode.fromArray(input);

  const result = TreeNode.toArray(tree);

  const isValid = expect.array(input).toEqual(result);

  console.warn({ input, result, isValid });
}
