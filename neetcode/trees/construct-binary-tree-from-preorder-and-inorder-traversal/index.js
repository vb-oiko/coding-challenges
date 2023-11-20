/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (preorder.length === 0) {
    return null;
  }

  const [current, ...nextPreorder] = preorder;

  const node = new TreeNode(current);

  if (!nextPreorder.length) {
    return node;
  }

  const midIndex = inorder.findIndex((el) => el === current);
  const leftPreorder = nextPreorder.slice(0, midIndex);
  const rightPreorder = nextPreorder.slice(midIndex, nextPreorder.length);
  const leftInorder = inorder.slice(0, midIndex);
  const rightInorder = inorder.slice(midIndex + 1, inorder.length);

  node.left = buildTree(leftPreorder, leftInorder);
  node.right = buildTree(rightPreorder, rightInorder);

  return node;
};

const tests = [
  {
    preorder: [3, 9, 20, 15, 7],
    inorder: [9, 3, 15, 20, 7],
    output: [3, 9, 20, null, null, 15, 7],
  },
  {
    preorder: [-1],
    inorder: [-1],
    output: [-1],
  },
];

const { TreeNode, expect } = require("../../../utils");

for (const { preorder, inorder, output } of tests) {
  const tree = buildTree(preorder, inorder);
  const result = TreeNode.toArray(tree);

  const isValid = expect.array(result).toEqual(output);

  console.warn({ preorder, inorder, result, output, isValid });
}
