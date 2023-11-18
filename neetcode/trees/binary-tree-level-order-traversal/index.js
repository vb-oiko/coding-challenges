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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) {
    return [];
  }

  let result = [[root.val]];

  function traverse(level) {
    const nextLevel = [];
    for (const node of level) {
      if (node.left) {
        nextLevel.push(node.left);
      }

      if (node.right) {
        nextLevel.push(node.right);
      }
    }
    if (nextLevel.length) {
      result.push(nextLevel.map((node) => node.val));
      traverse(nextLevel);
    }
  }

  traverse([root]);

  return result;
};

const tests = [
  {
    input: [3, 9, 20, null, null, 15, 7],
    output: [[3], [9, 20], [15, 7]],
  },
  {
    input: [1],
    output: [[1]],
  },
  {
    input: [],
    output: [],
  },
];

const { TreeNode, expect } = require("../../../utils");

for (const { input, output } of tests) {
  const tree = TreeNode.fromArray(input);
  const result = levelOrder(tree);
  const isValid = expect.array(output).toEqual(result);
  console.warn({ input, result, output, isValid });
}
