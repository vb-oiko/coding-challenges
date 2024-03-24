/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort(([a], [b]) => a - b);
  const result = [];

  let [curStart, curEnd] = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    if (start <= curEnd && end >= curStart) {
      curStart = Math.min(start, curStart);
      curEnd = Math.max(end, curEnd);
      continue;
    }

    result.push([curStart, curEnd]);
    curStart = start;
    curEnd = end;
  }

  result.push([curStart, curEnd]);

  return result;
};

const tests = [
  //   {
  //     intervals: [
  //       [1, 3],
  //       [2, 6],
  //       [8, 10],
  //       [15, 18],
  //     ],
  //     output: [
  //       [1, 6],
  //       [8, 10],
  //       [15, 18],
  //     ],
  //   },
  {
    intervals: [
      [2, 3],
      [4, 5],
      [6, 7],
      [8, 9],
      [1, 10],
    ],
    output: [[1, 10]],
  },
];

for (const { intervals, output } of tests) {
  const result = merge(intervals);
  console.warn({ intervals, result, output });
}
