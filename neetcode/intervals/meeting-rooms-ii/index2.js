/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  ends = new MinPriorityQueue();
  ends.enqueue(intervals[0][1]);

  let maxRooms = 1;
  const n = intervals.length;

  for (let i = 1; i < n; i++) {
    while (ends.size() && intervals[i][0] >= ends.front().element) {
      ends.dequeue();
    }

    if (
      (ends.size() && intervals[i][0] < ends.front().element) ||
      !ends.size()
    ) {
      ends.enqueue(intervals[i][1]);
    }

    if (ends.size() > maxRooms) {
      maxRooms = ends.size();
    }
  }

  return maxRooms;
};

var { MinPriorityQueue } = require("@datastructures-js/priority-queue");

const tests = [
  {
    intervals: [
      [0, 30],
      [5, 10],
      [15, 20],
    ],
    output: 2,
  },
  {
    intervals: [
      [4, 18],
      [1, 35],
      [12, 45],
      [25, 46],
      [22, 27],
    ],
    output: 4,
  },
  {
    intervals: [
      [1, 5],
      [8, 9],
      [8, 9],
    ],
    output: 2,
  },
];

for (const { intervals, output } of tests) {
  const result = minMeetingRooms(intervals);
  console.log({ intervals, result, output });
}
