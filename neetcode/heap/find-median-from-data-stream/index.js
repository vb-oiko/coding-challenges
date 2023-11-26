var MedianFinder = function () {
  this.leftPQ = new MaxPriorityQueue();
  this.rightPQ = new MinPriorityQueue();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  const context = this;

  if (!this.leftPQ.size()) {
    this.leftPQ.enqueue(num);
    return null;
  }

  if (num < this.leftPQ.front().element) {
    this.leftPQ.enqueue(num);
  } else {
    this.rightPQ.enqueue(num);
  }

  if (Math.abs(this.leftPQ.size() - this.rightPQ.size()) <= 1) {
    return null;
  }

  if (this.leftPQ.size() > this.rightPQ.size()) {
    this.rightPQ.enqueue(this.leftPQ.dequeue().element);
    return null;
  }

  this.leftPQ.enqueue(this.rightPQ.dequeue().element);
  return null;
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  if (this.leftPQ.size() > this.rightPQ.size()) {
    return this.leftPQ.front().element;
  }

  if (this.leftPQ.size() < this.rightPQ.size()) {
    return this.rightPQ.front().element;
  }

  return (this.leftPQ.front().element + this.rightPQ.front().element) / 2;
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

var {
  MinPriorityQueue,
  MaxPriorityQueue,
} = require("@datastructures-js/priority-queue");

const tests = [
  //   {
  //     commands: [
  //       "MedianFinder",
  //       "addNum",
  //       "addNum",
  //       "findMedian",
  //       "addNum",
  //       "findMedian",
  //     ],

  //     params: [[], [1], [2], [], [3], []],
  //     output: [null, null, null, 1.5, null, 2.0],
  //   },
  {
    commands: [
      "MedianFinder",
      "addNum",
      "findMedian",
      "addNum",
      "findMedian",
      "addNum",
      "findMedian",
      "addNum",
      "findMedian",
      "addNum",
      "findMedian",
    ],

    params: [[], [-1], [], [-2], [], [-3], [], [-4], [], [-5], []],
    output: [null, null, -1.0, null, -1.5, null, -2.0, null, -2.5, null, -3.0],
  },
];

const { expect } = require("../../../utils");

for (const { commands, params, output } of tests) {
  let medianFinder;

  function execute(command, params) {
    switch (command) {
      case "MedianFinder":
        medianFinder = new MedianFinder();
        return null;

      case "addNum": {
        const [value] = params;
        return medianFinder.addNum(value);
      }

      case "findMedian": {
        return medianFinder.findMedian();
      }

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
