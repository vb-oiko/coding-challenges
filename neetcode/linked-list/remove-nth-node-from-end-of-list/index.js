/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let current = head;
  let index = 0;
  let nthFromEnd = head;
  let nthFromEndParent = null;

  while (current) {
    if (index >= n) {
      nthFromEndParent = nthFromEnd;
      nthFromEnd = nthFromEnd.next;
    }

    index++;
    current = current.next;
  }

  if (!nthFromEndParent) {
    return nthFromEnd.next;
  }

  nthFromEndParent.next = nthFromEnd.next;

  return head;
};

const tests = [
  {
    input: [1],
    n: 1,
    output: [],
  },
  {
    input: [1, 2, 3, 4, 5],
    n: 2,
    output: [1, 2, 3, 5],
  },
  {
    input: [1, 2],
    n: 2,
    output: [2],
  },
];

const { ListNode, expect } = require("../../../utils");

for (const { input, n, output } of tests) {
  const list = ListNode.fromArray(input);
  const result = ListNode.toArray(removeNthFromEnd(list, n));

  const isValid = expect.array(result).toEqual(output);

  console.warn({ input, output, result, isValid });
}
