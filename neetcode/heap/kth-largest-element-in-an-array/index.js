/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const mpq = new MinPriorityQueue();

  for (const num of nums) {
    mpq.enqueue(num);
    if (mpq.size() > k) {
      mpq.dequeue();
    }
  }

  return mpq.front().element;
};

var { MinPriorityQueue } = require("@datastructures-js/priority-queue");

const tests = [
  { nums: [3, 2, 1, 5, 6, 4], k: 2, output: 5 },
  { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4, output: 4 },
];

for (const { nums, k, output } of tests) {
  const result = findKthLargest(nums, k);
  const isValid = result === output;

  console.warn({ nums, k, result, output, isValid });
}
