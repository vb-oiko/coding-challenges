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
var diameterOfBinaryTree = function (root) {
  let max = 0;

  function traverse(node) {
    if (!node) {
      return 0;
    }

    const leftPath = node.left ? traverse(node.left) + 1 : 0;
    const rightPath = node.right ? traverse(node.right) + 1 : 0;

    if (leftPath + rightPath > max) {
      max = leftPath + rightPath;
    }

    return leftPath > rightPath ? leftPath : rightPath;
  }

  traverse(root);

  return max;
};

const { TreeNode } = require("../../../utils");

const tests = [
  { input: [1, 2, 3, 4, 5], output: 3 },
  { input: [1, 2], output: 1 },
  { input: [1], output: 0 },
  { input: [], output: 0 },
];

for (const { input, output } of tests) {
  const tree = TreeNode.fromArray(input);

  const result = diameterOfBinaryTree(tree);

  const isValid = result === output;

  console.warn({ input, result, output, isValid });
}
