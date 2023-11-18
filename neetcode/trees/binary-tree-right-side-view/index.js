/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (!root) {
    return [];
  }

  const result = [root.val];

  function traverse(level) {
    const nextLevel = [];

    for (const node of level) {
      if (node.left) {
        nextLevel.push(node.left);
      }
      if (node.right) {
        nextLevel.push(node.right);
      }
    }

    if (nextLevel.length) {
      result.push(nextLevel.at(-1).val);
      traverse(nextLevel);
    }
  }

  traverse([root]);

  return result;
};

const tests = [
  {
    input: [1, 2, 3, null, 5, null, 4],
    output: [1, 3, 4],
  },
  {
    input: [1, null, 3],
    output: [1, 3],
  },
  {
    input: [],
    output: [],
  },
  {
    input: [1, 2],
    output: [1, 2],
  },
];

const { TreeNode, expect } = require("../../../utils");

for (const { input, output } of tests) {
  const tree = TreeNode.fromArray(input);

  const result = rightSideView(tree);

  const isValid = expect.array(output).toEqual(result);
  console.warn({ input, result, output, isValid });
}
