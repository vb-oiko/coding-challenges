/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
  const adjacency = new Array(n + 1).fill().map(() => []);
  for (const [from, to, time] of times) {
    adjacency[from].push([to, time]);
  }

  const visited = new Set();
  let delay = 0;

  const nodes = new MinPriorityQueue();

  nodes.enqueue(k, 0);

  while (nodes.size() > 0) {
    const { element: node, priority: path } = nodes.dequeue();

    if (visited.has(node)) {
      continue;
    }

    visited.add(node);
    delay = path;

    const neighbors = adjacency[node];
    for (const [to, time] of neighbors) {
      nodes.enqueue(to, path + time);
    }
  }

  return visited.size === n ? delay : -1;
};

var { MinPriorityQueue } = require("@datastructures-js/priority-queue");

const tests = [
  {
    times: [
      [2, 1, 1],
      [2, 3, 1],
      [3, 4, 1],
    ],
    n: 4,
    k: 2,
    output: 2,
  },
  {
    times: [[1, 2, 1]],
    n: 2,
    k: 1,
    output: 1,
  },
  {
    times: [[1, 2, 1]],
    n: 2,
    k: 2,
    output: -1,
  },
  {
    times: [
      [1, 2, 1],
      [2, 1, 3],
    ],
    n: 2,
    k: 2,
    output: 3,
  },
  {
    times: [
      [1, 2, 1],
      [2, 3, 2],
      [1, 3, 4],
    ],
    n: 3,
    k: 1,
    output: 3,
  },
];

for (const { times, n, k, output } of tests) {
  const result = networkDelayTime(times, n, k);

  console.warn({ times, n, k, result, output });
}
