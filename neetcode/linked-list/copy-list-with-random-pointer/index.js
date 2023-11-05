/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  let current = head;
  let copyHead = null;
  let copyPrevious = null;

  const map = new Map();

  while (current) {
    const copy = new Node(current.val, null, current);

    map.set(current, copy);

    if (current === head) {
      copyHead = copy;
    }

    if (copyPrevious) {
      copyPrevious.next = copy;
    }

    copyPrevious = copy;
    current = current.next;
  }

  current = copyHead;

  while (current) {
    const source = current.random;
    const random = map.get(source.random);
    current.random = random;
    current = current.next;
  }

  return copyHead;
};
