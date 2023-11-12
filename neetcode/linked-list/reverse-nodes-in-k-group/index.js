/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  const [lists, tail] = split(head, k);

  const reversedLists = lists.map(reverse);

  if (tail) {
    reversedLists.push(tail);
  }

  return concat(reversedLists);
};

function split(list, k) {
  const result = [];
  let cur = list;
  let head = null;
  let tail = null;
  let i = 0;

  while (cur) {
    const next = cur.next;
    if (i % k === 0) {
      head = cur;
    }

    if (i % k === k - 1) {
      result.push(head);
      cur.next = null;
      head = null;
    }

    cur = next;
    i++;
  }

  if (head) {
    tail = head;
  }

  return [result, tail];
}

function reverse(list) {
  let head = null;
  let cur = list;
  let prev = null;

  while (cur) {
    const next = cur.next;

    if (!next) {
      head = cur;
    }

    cur.next = prev;
    prev = cur;
    cur = next;
  }

  return head;
}

function concat(lists) {
  let curResult = null;
  let head = null;

  function addToResult(node) {
    if (!head) {
      curResult = node;
      head = node;
      return;
    }

    curResult.next = node;
    curResult = node;
  }

  for (const list of lists) {
    if (!list) {
      continue;
    }

    let cur = list;
    while (cur) {
      const next = cur.next;
      addToResult(cur);
      cur = next;
    }
  }

  return head;
}

const tests = [
  {
    input: [1, 2, 3, 4, 5],
    k: 2,
    output: [2, 1, 4, 3, 5],
  },
  {
    input: [1, 2, 3, 4, 5],
    k: 3,
    output: [3, 2, 1, 4, 5],
  },
];

const { ListNode, expect } = require("../../../utils");

for (const { input, k, output } of tests) {
  const list = ListNode.fromArray(input);
  const result = ListNode.toArray(reverseKGroup(list, k));

  const isValid = expect.array(result).toEqual(output);

  console.warn({ input, k, result, output, isValid });
}
