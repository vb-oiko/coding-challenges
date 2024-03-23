/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  const n = intervals.length;

  if (n === 0) {
    return [newInterval];
  }

  const [newStart, newEnd] = newInterval;

  if (newEnd < intervals[0][0]) {
    return [newInterval, ...intervals];
  }

  if (newStart > intervals[n - 1][1]) {
    return [...intervals, newInterval];
  }

  const result = [];
  let found = false;
  let mergedStart = newStart;
  let mergedEnd = newEnd;
  let prevEnd = -Infinity;

  for (const [start, end] of intervals) {
    // intervals overlap
    if (end >= mergedStart && mergedEnd >= start) {
      mergedStart = Math.min(mergedStart, start);
      mergedEnd = Math.max(mergedEnd, end);
      found = true;
      prevEnd = end;
      continue;
    }

    //intervals do not overlap

    if (found || (prevEnd < mergedStart && mergedEnd < start)) {
      result.push([mergedStart, mergedEnd]);
      found = false;
    }
    result.push([start, end]);
    prevEnd = end;
  }

  if (found) {
    result.push([mergedStart, mergedEnd]);
  }

  return result;
};

const tests = [
  {
    intervals: [
      [1, 3],
      [6, 9],
    ],
    newInterval: [2, 5],
    output: [
      [1, 5],
      [6, 9],
    ],
  },
  {
    intervals: [[1, 5]],
    newInterval: [2, 7],
    output: [[1, 7]],
  },
  {
    intervals: [[1, 5]],
    newInterval: [0, 3],
    output: [[0, 5]],
  },
  {
    intervals: [[1, 5]],
    newInterval: [0, 6],
    output: [[0, 6]],
  },
  {
    intervals: [
      [0, 5],
      [9, 12],
    ],
    newInterval: [7, 16],
    output: [
      [0, 5],
      [7, 16],
    ],
  },
  {
    intervals: [
      [3, 5],
      [12, 15],
    ],
    newInterval: [6, 6],
    output: [
      [3, 5],
      [6, 6],
      [12, 15],
    ],
  },
];

for (const { intervals, newInterval, output } of tests) {
  const result = insert(intervals, newInterval);
  console.warn({ intervals, newInterval, result, output });
}
