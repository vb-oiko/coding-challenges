/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    var q = new MinPriorityQueue();

    for (var i = 0; i < nums.length; i++) {
        q.enqueue(nums[i]);
        if (q.size() > k) {
            q.dequeue();
        }
    }

    return q.front().element;
};

const { MinPriorityQueue } = require('@datastructures-js/priority-queue');

const tests = [
    {
        nums: [3, 2, 1, 5, 6, 4],
        k: 2,
        output: 5,
    },
];

for (const { nums, k, output } of tests) {
    const result = findKthLargest(nums, k);
    if (result === output) {
        console.log(true);
    }

    console.dir({ nums, k, result, output });
}
