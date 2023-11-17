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
var maxPathSum = function (root) {
  let max = root.val;

  function traverse(node) {
    if (!node) {
      return 0;
    }

    const leftNonSplittedPath = traverse(node.left);
    const rightNonSplittedPath = traverse(node.right);

    const currentNonSplittedPath = Math.max(
      node.val,
      node.val + Math.max(leftNonSplittedPath, rightNonSplittedPath)
    );

    const currentSplittedPath =
      node.val + leftNonSplittedPath + rightNonSplittedPath;

    max = Math.max(max, currentNonSplittedPath, currentSplittedPath);

    return currentNonSplittedPath;
  }

  const maxNonSplittedPath = traverse(root);

  return Math.max(max, maxNonSplittedPath);
};

const { TreeNode } = require("../../../utils");

const tests = [
  { input: [1, 2, 3], output: 6 },
  { input: [1, -2, 3], output: 4 },
  { input: [-1, -2, 10, -6, null, -3, -6], output: 10 },
  { input: [-10, 9, 20, null, null, 15, 7], output: 42 },
  { input: [-1, 5, null, 4, null, null, 2, -4], output: 11 },
  { input: [-1, -2, 10, -6, null, -3, -6], output: 10 },
];

for (const { input, output } of tests) {
  const tree = TreeNode.fromArray(input);

  const result = maxPathSum(tree);

  const isValid = result === output;

  console.warn({ input, result, output, isValid });
}
