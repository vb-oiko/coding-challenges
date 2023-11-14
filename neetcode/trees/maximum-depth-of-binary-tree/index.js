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
 * @return {number}
 */
var maxDepth = function (root) {
  let max = 0;

  function traverse(node, level) {
    if (!node) {
      return;
    }

    if (level > max) {
      max = level;
    }

    traverse(node.left, level + 1);
    traverse(node.right, level + 1);
  }

  traverse(root, 1);

  return max;
};

const { TreeNode } = require("../../../utils");

const tests = [
  { input: [3, 9, 20, null, null, 15, 7], output: 3 },
  { input: [1, null, 2], output: 2 },
];

for (const { input, output } of tests) {
  const tree = TreeNode.fromArray(input);

  const result = maxDepth(tree);

  const isValid = result === output;

  console.warn({ input, result, output, isValid });
}
