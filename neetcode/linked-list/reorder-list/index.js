/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  if (!head) {
    return head;
  }

  const middle = findMiddleAndSplit(head);
  const reversed = reverse(middle);

  let currentA = head;
  let currentB = reversed;

  while (currentA) {
    const nextA = currentA.next;
    const nextB = currentB ? currentB.next : null;

    currentA.next = currentB;
    if (currentB) {
      currentB.next = nextA;
    }

    currentA = nextA;
    currentB = nextB;
  }

  return head;
};

function findMiddleAndSplit(head) {
  let current = head;
  let middle = head;
  let odd = true;
  let previous = null;

  while (current) {
    if (odd) {
      previous = middle;
      middle = middle.next;
    }

    odd = !odd;
    current = current.next;
  }

  if (previous) {
    previous.next = null;
  }

  return middle;
}

function reverse(head) {
  if (!head || !head.next) {
    return head;
  }

  let previous = null;
  let current = head;
  let newHead;

  while (current) {
    const next = current.next;
    current.next = previous;
    newHead = current;
    previous = current;
    current = next;
  }

  return newHead;
}

const tests = [
  {
    input: [1, 2, 3, 4],
    output: [1, 4, 2, 3],
  },
  {
    input: [1, 2, 3, 4, 5],
    output: [1, 5, 2, 4, 3],
  },
  {
    input: [1, 2],
    output: [1, 2],
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
  const result = ListNode.toArray(reorderList(list));

  const isValid = expect.array(result).toEqual(output);

  console.warn({ input, output, result, isValid });
}
