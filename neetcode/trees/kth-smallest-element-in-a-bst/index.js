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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  let result = null;
  let index = 0;

  function traverse(node) {
    if (!node || result !== null) {
      return;
    }

    traverse(node.left);

    index++;
    if (index === k) {
      result = node.val;
    }

    traverse(node.right);
  }

  traverse(root);

  return result;
};

const { TreeNode } = require("../../../utils");

const tests = [
  { input: [3, 1, 4, null, 2], k: 1, output: 1 },
  { input: [5, 3, 6, 2, 4, null, null, 1], k: 3, output: 3 },
  { input: [2], k: 1, output: 2 },
  { input: [], k: 1, output: null },
];

for (const { input, k, output } of tests) {
  const tree = TreeNode.fromArray(input);

  const result = kthSmallest(tree, k);

  const isValid = result === output;

  console.warn({ input, k, result, output, isValid });
}
