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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  function traverse(level) {
    let nodes = [];

    for (const node of level) {
      if (!node) {
        return;
      }

      const left = node.left;
      const right = node.right;

      node.left = right;
      node.right = left;

      if (node.left) {
        nodes.push(node.left);
      }
      if (node.right) {
        nodes.push(node.right);
      }
    }

    return nodes;
  }

  let level = [root];
  while (level?.length) {
    level = traverse(level);
  }

  return root;
};

const { TreeNode, expect } = require("../../../utils");

const tests = [{ input: [4, 2, 7, 1, 3, 6, 9], output: [4, 7, 2, 9, 6, 3, 1] }];

for (const { input, output } of tests) {
  const tree = TreeNode.fromArray(input);

  const result = TreeNode.toArray(invertTree(tree));

  const isValid = expect.array(output).toEqual(result);

  console.warn({ input, result, output, isValid });
}
