/**
 * @param {number[][]} intervals
 * @param {number[]} queries
 * @return {number[]}
 */
var minInterval = function (intervals, queries) {
  function compare(a, b) {
    return a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1];
  }

  function length(interval) {
    return interval[1] - interval[0] + 1;
  }

  intervals.sort(compare);
  const unsorted = [...queries];
  queries.sort((a, b) => a - b);
  const heap = new MinPriorityQueue();
  const n = intervals.length;
  const result = new Map();

  let i = 0;

  for (const q of queries) {
    // adding intervals starting before the query

    while (i < n && intervals[i][0] <= q) {
      const len = length(intervals[i]);
      const end = intervals[i][1];
      heap.enqueue([len, end], len);
      i++;
    }

    //  popping intervals ending before q

    while (heap.size() > 0 && heap.front().element[1] < q) {
      heap.dequeue();
    }

    if (heap.size() > 0) {
      result.set(q, heap.front().element[0]);
    }
  }

  return unsorted.map((q) => (result.has(q) ? result.get(q) : -1));
};

var { MinPriorityQueue } = require("@datastructures-js/priority-queue");

const tests = [
  // {
  //   intervals: [
  //     [1, 4],
  //     [2, 4],
  //     [3, 6],
  //     [4, 4],
  //   ],
  //   queries: [5, 2, 3, 4],
  //   output: [3, 3, 1, 4],
  // },
  {
    intervals: [
      [2, 3],
      [2, 5],
      [1, 8],
      [20, 25],
    ],
    queries: [2, 19, 5, 22],
    output: [2, -1, 4, 6],
  },
];

for (const { intervals, queries, output } of tests) {
  const result = minInterval(intervals, queries);
  console.log({ intervals, queries, result, output });
}
