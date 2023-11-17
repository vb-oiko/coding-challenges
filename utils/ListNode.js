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

module.exports = {
  ListNode,
};
