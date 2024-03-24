/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function (intervals) {
  const n = intervals.length;

  if (n === 0) {
    return true;
  }

  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < n; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }

  return true;
};

const tests = [
  {
    intervals: [
      [0, 30],
      [5, 10],
      [15, 20],
    ],
    output: false,
  },
];

for (const { intervals, output } of tests) {
  const result = canAttendMeetings(intervals);
  console.log({ intervals, result, output });
}
