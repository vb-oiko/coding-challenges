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

  function maxNonSplittedPath(node) {
    if (!node) {
      return 0;
    }

    if (!node.left && !node.right) {
      return node.val;
    }

    if (!node.left) {
      return Math.max(node.val, node.val + maxNonSplittedPath(node.right));
    }

    if (!node.right) {
      return Math.max(node.val, node.val + maxNonSplittedPath(node.left));
    }

    return Math.max(
      node.val,
      node.val +
        Math.max(maxNonSplittedPath(node.left), maxNonSplittedPath(node.right))
    );
  }

  function traverse(node) {
    if (!node) {
      return;
    }

    const leftNonSplittedPath = maxNonSplittedPath(node.left);
    const rightNonSplittedPath = maxNonSplittedPath(node.right);

    max = Math.max(
      max,
      node.val,
      node.val + leftNonSplittedPath,
      node.val + rightNonSplittedPath,
      node.val + leftNonSplittedPath + rightNonSplittedPath
    );

    traverse(node.left);
    traverse(node.right);
  }

  traverse(root);

  return max;
};

const { TreeNode } = require("../../../utils");

const tests = [
  { input: [1, 2, 3], output: 6 },
  { input: [1, -2, 3], output: 4 },
  { input: [-1, -2, 10, -6, null, -3, -6], output: 10 },
  { input: [-10, 9, 20, null, null, 15, 7], output: 42 },
  { input: [-1, 5, null, 4, null, null, 2, -4], output: 11 },
];

for (const { input, output } of tests) {
  const tree = TreeNode.fromArray(input);

  const result = maxPathSum(tree);

  const isValid = result === output;

  console.warn({ input, result, output, isValid });
}
