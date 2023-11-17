/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  let result = [];

  function traverse(level) {
    let nodes = [];
    for (const node of level) {
      const left = node.left;
      const right = node.right;

      if (left) {
        result.push(left.val);
        nodes.push(left);
      } else {
        result.push(null);
      }

      if (right) {
        nodes.push(right);
        result.push(right.val);
      } else {
        result.push(null);
      }
    }
    return nodes;
  }

  let level = root ? [root] : [];
  if (root) {
    result.push(root.val);
  }

  while (level.length) {
    level = traverse(level);
  }

  while (result.at(-1) === null) {
    result.pop();
  }

  return JSON.stringify(result);
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const arr = JSON.parse(data);

  if (arr.length === 0) {
    return null;
  }

  const head = new TreeNode(arr[0]);
  let i = 1;

  function traverse(level) {
    const nodes = [];
    for (const node of level) {
      if (i < arr.length) {
        if (arr[i] == null) {
          node.left = null;
        } else {
          node.left = new TreeNode(arr[i], null);
          nodes.push(node.left);
        }
        i++;
      }

      if (i < arr.length) {
        if (arr[i] == null) {
          node.right = null;
        } else {
          node.right = arr[i] === null ? null : new TreeNode(arr[i], null);
          nodes.push(node.right);
        }
        i++;
      }
    }

    return nodes;
  }

  let level = [head];

  while (i < arr.length) {
    const nextLevel = traverse(level);
    console.warn(level);
    level = nextLevel;
  }
  console.warn(level);

  return head;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

const { expect } = require("../../../utils");
const { TreeNode } = require("../../../utils");

const tests = [
  {
    input: [],
    output: [],
  },
  {
    input: [1, 2, 3, null, null, 4, 5],
    output: [1, 2, 3, null, null, 4, 5],
  },
];

for (const { input, output } of tests) {
  const result = serialize(deserialize(JSON.stringify(input)));
  const isValid = expect.array(output).toEqual(JSON.parse(result));

  console.warn({ input, result, output, isValid });
}
