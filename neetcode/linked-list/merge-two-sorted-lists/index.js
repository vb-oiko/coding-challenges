/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let head = null;
  let currentResult = null;
  let currentA = list1;
  let currentB = list2;

  function addToResult(val) {
    if (!currentResult) {
      currentResult = new ListNode(val);
      head = currentResult;
      return;
    }

    currentResult.next = new ListNode(val);
    currentResult = currentResult.next;
  }

  while (currentA || currentB) {
    const a = currentA ? currentA.val : Infinity;
    const b = currentB ? currentB.val : Infinity;

    if (a <= b) {
      addToResult(a);
      currentA = currentA.next;
      continue;
    }

    addToResult(b);
    currentB = currentB.next;
  }

  return head;
};

const tests = [
  {
    arr1: [1, 2, 4],
    arr2: [1, 3, 4],
    output: [1, 1, 2, 3, 4, 4],
  },
  {
    arr1: [1, 2, 4],
    arr2: [],
    output: [1, 2, 4],
  },
  {
    arr1: [],
    arr2: [],
    output: [],
  },
];

const { ListNode, expect } = require("../../../utils");

for (const { arr1, arr2, output } of tests) {
  const list1 = ListNode.fromArray(arr1);
  const list2 = ListNode.fromArray(arr2);

  const resultList = mergeTwoLists(list1, list2);
  const result = ListNode.toArray(resultList);

  const isValid = expect.array(result).toEqual(output);

  console.warn({ arr1, arr2, output, result, isValid });
}
