/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  intervals.sort(([a], [b]) => a - b);

  let prevEnd = intervals[0][1];
  let result = 0;

  for (let i = 1; i < intervals.length; i++) {
    const end = intervals[i][1];

    if (intervals[i][0] >= prevEnd) {
      prevEnd = end;
      continue;
    }

    if (end < prevEnd) {
      prevEnd = end;
    }
    result++;
  }

  return result;
};

const tests = [
  {
    intervals: [
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 3],
    ],
    output: 1,
  },
];

for (const { intervals, output } of tests) {
  const result = eraseOverlapIntervals(intervals);
  console.warn({ intervals, result, output });
}
