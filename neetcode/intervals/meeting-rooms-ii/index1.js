/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  let maxRooms = 1;
  const n = intervals.length;

  for (let i = 1; i < n; i++) {
    let rooms = 1;
    for (let j = i - 1; j >= 0; j--) {
      if (intervals[i][0] < intervals[j][1]) {
        rooms++;
        continue;
      }
    }
    if (rooms > maxRooms) {
      maxRooms = rooms;
    }
  }

  return maxRooms;
};

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
];

for (const { intervals, output } of tests) {
  const result = minMeetingRooms(intervals);
  console.log({ intervals, result, output });
}
