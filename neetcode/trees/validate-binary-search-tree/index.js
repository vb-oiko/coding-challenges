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
var isValidBST = function (root) {
  if (!root) {
    return true;
  }

  let result = true;

  function traverse(node, left, right) {
    if (!node) {
      return;
    }

    if (node.val <= left || node.val >= right) {
      result = false;
    }

    traverse(node.left, left, node.val);
    traverse(node.right, node.val, right);
  }

  traverse(root.left, -Infinity, root.val);
  traverse(root.right, root.val, +Infinity);

  return result;
};

const tests = [
  //   { input: [2, 1, 3], output: true },
  //   { input: [5, 1, 4, null, null, 3, 6], output: false },
  //   { input: [1], output: true },
  //   { input: [], output: true },
  { input: [5, 4, 6, null, null, 3, 7], output: false },
];

const { TreeNode } = require("../../../utils");

for (const { input, output } of tests) {
  const tree = TreeNode.fromArray(input);

  const result = isValidBST(tree);

  const isValid = result === output;

  console.warn({ input, result, output, isValid });
}
