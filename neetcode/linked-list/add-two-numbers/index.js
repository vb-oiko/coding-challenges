/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let current1 = l1;
  let current2 = l2;

  let head = null;
  let current = null;
  let previous = null;

  let overflow = 0;
  let nextOverflow = 0;

  while (current1 || current2) {
    const val1 = current1?.val || 0;
    const val2 = current2?.val || 0;

    const sum = val1 + val2 + overflow;
    const digit = sum % 10;
    nextOverflow = Math.floor(sum / 10);

    current = new ListNode(digit);

    if (previous) {
      previous.next = current;
    }

    if (!head) {
      head = current;
    }

    previous = current;
    overflow = nextOverflow;

    current1 = current1?.next ?? null;
    current2 = current2?.next ?? null;
  }

  if (nextOverflow) {
    current.next = new ListNode(nextOverflow);
  }

  return head;
};

const tests = [
  {
    arr1: [2, 4, 3],
    arr2: [5, 6, 4],
    output: [7, 0, 8],
  },
  {
    arr1: [2, 4, 3],
    arr2: [5, 6, 6],
    output: [7, 0, 0, 1],
  },
];

const { ListNode, expect } = require("../../../utils");

for (const { arr1, arr2, output } of tests) {
  const list1 = ListNode.fromArray(arr1);
  const list2 = ListNode.fromArray(arr2);

  const resultList = addTwoNumbers(list1, list2);
  const result = ListNode.toArray(resultList);

  const isValid = expect.array(result).toEqual(output);

  console.warn({ arr1, arr2, output, result, isValid });
}
