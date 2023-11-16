/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  const left = Math.min(p.val, q.val);
  const right = Math.max(p.val, q.val);

  function traverse(node) {
    if (!node) {
      return null;
    }

    const val = node.val;

    if (left <= val && val <= right) {
      return node;
    }

    if (right < val) {
      return traverse(node.left);
    }

    if (val < left) {
      return traverse(node.right);
    }

    return null;
  }

  return traverse(root);
};

const { TreeNode } = require("../../../utils");

const tests = [
  { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 8, output: 6 },
  { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 4, output: 2 },
  { root: [2, 1], p: 2, q: 1, output: 2 },
];

for (const { root, p, q, output } of tests) {
  const tree = TreeNode.fromArray(root);

  const result = lowestCommonAncestor(tree, new TreeNode(p), new TreeNode(q));

  const isValid = result.val === output;

  console.warn({ root, p, q, result, output, isValid });
}
