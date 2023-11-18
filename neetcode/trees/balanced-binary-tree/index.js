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
 * @return {boolean}
 */
var isBalanced = function (root) {
  let result = true;

  function traverse(node) {
    if (!node) {
      return 0;
    }

    const leftDepth = node.left ? traverse(node.left) + 1 : 0;
    const rightDepth = node.right ? traverse(node.right) + 1 : 0;

    if (Math.abs(leftDepth - rightDepth) > 1) {
      result = false;
    }

    return leftDepth > rightDepth ? leftDepth : rightDepth;
  }

  traverse(root);

  return result;
};

const { TreeNode } = require("../../../utils");

const tests = [
  { input: [3, 9, 20, null, null, 15, 7], output: true },
  { input: [1, 2, 2, 3, 3, null, null, 4, 4], output: false },
  { input: [1], output: true },
  { input: [], output: true },
];

for (const { input, output } of tests) {
  const tree = TreeNode.fromArray(input);

  const result = isBalanced(tree);

  const isValid = result === output;

  console.warn({ input, result, output, isValid });
}
