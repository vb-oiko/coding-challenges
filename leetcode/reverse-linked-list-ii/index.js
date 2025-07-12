/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (list, left, right) {
    let reverseHead;
    let reverseTail;
    let prev = null;
    let cur = list;
    let next;
    let index = 1;
    let leftTail = null;
    let rightHead = null;

    while (cur) {
        next = cur.next;

        if (index === left - 1) {
            leftTail = cur;
        }

        if (index === right + 1) {
            rightHead = cur;
        }

        if (index >= left && index <= right) {
            if (index === left) {
                reverseTail = cur;
            }
            reverseHead = cur;
            cur.next = prev;
        }

        prev = cur;
        cur = next;
        index++;
    }

    if (leftTail) {
        leftTail.next = reverseHead;
    }

    reverseTail.next = rightHead;

    return leftTail ? list : reverseHead;
};

const tests = [
    {
        input: {
            head: [1, 2, 3, 4, 5],
            left: 4,
            right: 4,
        },
        output: [1, 4, 3, 2, 5],
    },
    // {
    //     input: {
    //         head: [5],
    //         left: 1,
    //         right: 1,
    //     },
    //     output: [5],
    // },
];

import deepEqual from 'deep-eql';
import { ListNode } from '../../utils/ListNode.js';

for (const test of tests) {
    const { head, ...rest } = test.input;
    const inputList = ListNode.fromArray(head);
    const outputList = reverseBetween(inputList, ...Object.values(rest));
    const result = ListNode.toArray(outputList);
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
