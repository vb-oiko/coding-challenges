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
    let prev = null;
    let cur = head;
    let next;
    let result = head;

    while (cur) {
        result = cur;

        next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    return result;
};

const tests = [
    {
        input: {
            head: [1, 2, 3, 4, 5],
        },
        output: [5, 4, 3, 2, 1],
    },
    {
        input: {
            head: [],
        },
        output: [],
    },
];

import deepEqual from 'deep-eql';
import { ListNode } from '../../utils/ListNode.js';

for (const test of tests) {
    const head = ListNode.fromArray(test.input.head);
    const list = reverseList(head);
    const result = ListNode.toArray(list);
    if (!deepEqual(result, test.output)) {
        console.log('❌ fail:');
        console.dir(
            { ...test.input, result, expected: test.output },
            { depth: null }
        );
    } else {
        console.log('✅ pass');
    }
}
