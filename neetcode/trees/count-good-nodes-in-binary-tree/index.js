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
var goodNodes = function (root) {
  if (!root) {
    return 0;
  }

  let result = 0;

  function traverse(node, max) {
    if (!node) {
      return;
    }

    if (node.val >= max) {
      result++;
    }

    const nextMax = node.val > max ? node.val : max;

    traverse(node.left, nextMax);
    traverse(node.right, nextMax);
  }

  traverse(root, root.val);

  return result;
};

const { TreeNode } = require("../../../utils");

const tests = [
  { input: [3, 1, 4, 3, null, 1, 5], output: 4 },
  { input: [3, 3, null, 4, 2], output: 3 },
  { input: [1], output: 1 },
  { input: [], output: 0 },
];

for (const { input, output } of tests) {
  const tree = TreeNode.fromArray(input);

  const result = goodNodes(tree);

  const isValid = result === output;

  console.warn({ input, result, output, isValid });
}
