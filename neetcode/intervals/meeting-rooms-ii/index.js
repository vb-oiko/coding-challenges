/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
  const n = intervals.length;
  const starts = new Array(n);
  const ends = new Array(n);
  let maxRooms = 0;

  for (let i = 0; i < n; i++) {
    starts[i] = intervals[i][0];
    ends[i] = intervals[i][1];
  }

  starts.sort((a, b) => a - b);
  ends.sort((a, b) => a - b);

  let rooms = 0;
  let startIndex = 0;
  let endIndex = 0;

  while (startIndex < n && endIndex < n) {
    const curMoment = Math.min(starts[startIndex], ends[endIndex]);

    if (startIndex < n && starts[startIndex] === curMoment) {
      rooms++;
      startIndex++;
    }

    if (endIndex < n && ends[endIndex] === curMoment) {
      rooms--;
      endIndex++;
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
