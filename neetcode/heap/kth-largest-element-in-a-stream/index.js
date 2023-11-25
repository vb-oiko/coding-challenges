/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.k = k;
  this.mpq = new MinPriorityQueue();

  for (let i = 0; i < nums.length; i++) {
    this.mpq.enqueue(nums[i]);
    if (this.mpq.size() > k) {
      this.mpq.dequeue();
    }
  }
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  this.mpq.enqueue(val);

  if (this.mpq.size() > this.k) {
    this.mpq.dequeue();
  }

  return this.mpq.size() === this.k ? this.mpq.front().element : null;
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

const { MinPriorityQueue } = require("@datastructures-js/priority-queue");

const tests = [
  {
    commands: ["KthLargest", "add", "add", "add", "add", "add"],
    params: [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]],
    output: [null, 4, 5, 5, 8, 8],
  },
  {
    commands: ["KthLargest", "add", "add", "add", "add", "add"],
    params: [[1, []], [-3], [-2], [-4], [0], [4]],
    output: [null, -3, -2, -2, 0, 4],
  },
];

const { expect } = require("../../../utils");

for (const { commands, params, output } of tests) {
  let heap;

  function execute(command, params) {
    switch (command) {
      case "KthLargest":
        const [capacity, arr] = params;
        heap = new KthLargest(capacity, arr);
        return null;

      case "add":
        const [value] = params;

        return heap.add(value);

      default:
        throw new Error("Unknown command");
    }
  }

  let results = [];

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    const param = params[i];
    const result = execute(command, param);
    results.push(result);
  }

  const isValid = expect.array(results).toEqual(output);

  console.warn({ commands, params, results, output, isValid });
}
