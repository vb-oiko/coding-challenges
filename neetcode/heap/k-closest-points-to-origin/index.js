/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function (points, k) {
  const mpq = new MinPriorityQueue({
    compare: (a, b) => (a.distance < b.distance ? -1 : 1),
  });

  for (const point of points) {
    const distance = Math.sqrt(point[0] ** 2 + point[1] ** 2);
    mpq.enqueue({ point, distance });
  }

  const result = [];

  for (let i = 0; i < k; i++) {
    result.push(mpq.dequeue().point);
  }

  return result;
};

var { MinPriorityQueue } = require("@datastructures-js/priority-queue");
const { expect } = require("../../../utils/expect");

const tests = [
  {
    points: [
      [1, 3],
      [-2, 2],
    ],
    k: 1,
    output: [[-2, 2]],
  },
  {
    points: [
      [3, 3],
      [5, -1],
      [-2, 4],
    ],
    k: 2,
    output: [
      [3, 3],
      [-2, 4],
    ],
  },
];

for (const { points, k, output } of tests) {
  const result = kClosest(points, k);

  const isValid =
    output.length === result.length &&
    expect.array(result).toHaveMembers(output);

  console.warn({ points, k, result, output, isValid });
}
