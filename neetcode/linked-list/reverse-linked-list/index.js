/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (!head) {
    return null;
  }

  let newHead = head;
  let current = head;
  let next;
  let previous = null;

  while (current) {
    newHead = current;
    next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }

  return newHead;
};

const tests = [
  {
    input: [1, 2, 3, 4, 5],
    output: [5, 4, 3, 2, 1],
  },
  {
    input: [1, 2],
    output: [2, 1],
  },
  {
    input: [1],
    output: [1],
  },
  {
    input: [],
    output: [],
  },
];

const { ListNode, expect } = require("../../../utils");

for (const { input, output } of tests) {
  const list = ListNode.fromArray(input);
  const result = ListNode.toArray(reverseList(list));

  const isValid = expect.array(result).toEqual(output);

  console.warn({ input, output, result, isValid });
}
