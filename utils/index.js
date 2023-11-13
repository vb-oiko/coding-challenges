const expect = {
  array(source) {
    return {
      toEqual(target) {
        if (source.length !== target.length) {
          return false;
        }

        for (let i = 0; i < source.length; i++) {
          if (source[i] !== target[i]) {
            return false;
          }
        }

        return true;
      },

      toHaveMembers(target) {
        if (source.length !== target.length) {
          return false;
        }

        for (let i = 0; i < source.length; i++) {
          if (!target.includes(source[i])) {
            return false;
          }
        }

        return true;
      },
    };
  },
};

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }

  static fromArray(arr) {
    if (arr.length === 0) {
      return null;
    }

    const head = new ListNode(arr[0], null);
    let prev = head;

    for (let i = 1; i < arr.length; i++) {
      const current = new ListNode(arr[i], null);
      prev.next = current;
      prev = current;
    }

    return head;
  }

  static toArray(node) {
    let result = [];

    let current = node;

    while (current) {
      result.push(current.val);
      current = current.next;
    }

    return result;
  }

  static toString(node) {
    return ListNode.toArray(node).join(" -> ");
  }
}

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
          node.left = new TreeNode(arr[i], null);
          nodes.push(node.left);
          i++;
        }

        if (i < arr.length) {
          node.right = new TreeNode(arr[i], null);
          nodes.push(node.right);
          i++;
        }
      }

      return nodes;
    }

    let level = [head];

    while (i < arr.length) {
      level = traverse(level);
    }

    return head;
  }

  static toArray(node) {
    let result = [];

    function traverse(level) {
      let nodes = [];
      for (const node of level) {
        if (node) {
          result.push(node.val);
          nodes.push(node.left);
          nodes.push(node.right);
        }
      }
      return nodes;
    }

    let level = [node];

    while (level.length) {
      level = traverse(level);
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

module.exports = { expect, ListNode, TreeNode };
