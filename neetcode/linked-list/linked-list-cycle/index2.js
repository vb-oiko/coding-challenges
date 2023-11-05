/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let slow = head;
  let fast = head?.next || null;
  let odd = true;

  while (fast) {
    if (slow === fast) {
      return true;
    }

    if (odd) {
      slow = slow.next;
    }

    odd = !odd;
    fast = fast.next;
  }

  return false;
};
