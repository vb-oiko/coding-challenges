/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  function traverse(nodeA, nodeB) {
    if (!nodeA && !nodeB) {
      return true;
    }

    if (nodeA && nodeB && nodeA.val === nodeB.val) {
      return (
        traverse(nodeA.left, nodeB.left) && traverse(nodeA.right, nodeB.right)
      );
    }

    return false;
  }

  return traverse(p, q);
};

const { TreeNode } = require("../../../utils");

const tests = [
  {
    p: [3, 9, 20, null, null, 15, 7],
    q: [3, 9, 20, null, null, 15, 7],
    output: true,
  },
  {
    p: [3, 9, 20, null, null, 15, 7],
    q: [3, 9, null, null, null, 15, 7],
    output: false,
  },
];

for (const { p, q, output } of tests) {
  const treeP = TreeNode.fromArray(p);
  const treeQ = TreeNode.fromArray(q);

  const result = isSameTree(treeP, treeQ);

  const isValid = result === output;

  console.warn({ p, q, result, output, isValid });
}
