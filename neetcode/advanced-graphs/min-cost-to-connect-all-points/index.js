/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
  function getKey([x, y]) {
    return `${x}:${y}`;
  }

  function getDistance([x1, y1], [x2, y2]) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  const visited = new Set();
  const frontier = new MinPriorityQueue();
  let path = 0;

  frontier.enqueue(points[0], 0);

  while (visited.size < points.length) {
    const { element, priority } = frontier.dequeue();

    if (visited.has(getKey(element))) {
      continue;
    }

    visited.add(getKey(element));
    path += priority;

    for (const point of points) {
      const key = getKey(point);

      if (visited.has(key)) {
        continue;
      }

      const distance = getDistance(point, element);
      frontier.enqueue(point, distance);
    }
  }

  return path;
};

var { MinPriorityQueue } = require("@datastructures-js/priority-queue");

const tests = [
  {
    points: [
      [0, 0],
      [2, 2],
      [3, 10],
      [5, 2],
      [7, 0],
    ],
    output: 20,
  },
  {
    points: [
      [3, 12],
      [-2, 5],
      [-4, 1],
    ],
    output: 18,
  },
];

for (const { points, output } of tests) {
  const result = minCostConnectPoints(points);
  console.warn({ points, result, output });
}
