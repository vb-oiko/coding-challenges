/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (lists.length === 0) {
    return null;
  }

  let result = lists;
  let mergedLists;

  while (result.length > 1) {
    mergedLists = [];

    for (let i = 0; i < result.length; i += 2) {
      const listA = result[i];
      const listB = result[i + 1] ?? null;

      const merged = mergeTwoLists(listA, listB);

      mergedLists.push(merged);
    }

    result = mergedLists;
  }

  return result[0];
};

function mergeTwoLists(listA, listB) {
  let curA = listA;
  let curB = listB;
  let current = null;
  let head = null;

  function addToResult(node) {
    if (!head) {
      current = node;
      head = node;
    } else {
      current.next = node;
      current = node;
      current.next = null;
    }
  }

  while (curA || curB) {
    const valA = curA?.val ?? Infinity;
    const nextA = curA?.next ?? null;
    const valB = curB?.val ?? Infinity;
    const nextB = curB?.next ?? null;

    if (valA < valB) {
      addToResult(curA);
      curA = nextA;
    } else {
      addToResult(curB);
      curB = nextB;
    }
  }

  return head;
}

const tests = [
  {
    input: [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6],
    ],
    output: [1, 1, 2, 3, 4, 4, 5, 6],
  },
];

const { ListNode, expect } = require("../../../utils");

for (const { input, output } of tests) {
  const lists = input.map(ListNode.fromArray);

  const resultList = mergeKLists(lists);
  const result = ListNode.toArray(resultList);

  const isValid = expect.array(result).toEqual(output);

  console.warn({ input, output, result, isValid });
}
