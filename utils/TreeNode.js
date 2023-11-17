class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }

  static fromArray(arr) {
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
  }

  static toArray(node) {
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

    let level = node ? [node] : [];
    if (node) {
      result.push(node.val);
    }

    while (level.length) {
      level = traverse(level);
    }

    while (result.at(-1) === null) {
      result.pop();
    }

    return result;
  }

  static depth(node) {
    let max = 0;

    function traverse(node, level) {
      if (!node) {
        return;
      }

      if (level > max) {
        max = level;
      }

      traverse(node.left, level + 1);
      traverse(node.right, level + 1);
    }

    traverse(node, 1);

    return max;
  }
}

module.exports = {
  TreeNode,
};
