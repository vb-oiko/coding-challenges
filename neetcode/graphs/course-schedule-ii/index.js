/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const adjacencyList = new Array(numCourses).fill().map(() => []);
  const inbound = new Array(numCourses).fill(0);

  for (const [course, preCourse] of prerequisites) {
    adjacencyList[preCourse].push(course);
    inbound[course]++;
  }

  const nodes = new Queue();

  for (let i = 0; i < numCourses; i++) {
    if (inbound[i] === 0) {
      nodes.enqueue(i);
    }
  }

  let count = 0;
  let result = [];

  while (nodes.size()) {
    const node = nodes.dequeue();
    result.push(node);
    count++;
    const preNodes = adjacencyList[node];

    for (const preNode of preNodes) {
      inbound[preNode]--;
      if (inbound[preNode] === 0) {
        nodes.enqueue(preNode);
      }
    }
  }

  return count === numCourses ? result : [];
};

var { Queue } = require("@datastructures-js/queue");

const tests = [
  {
    numCourses: 2,
    prerequisites: [[1, 0]],
    output: [0, 1],
  },
  {
    numCourses: 4,
    prerequisites: [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
    ],
    output: [0, 2, 1, 3],
  },
  {
    numCourses: 1,
    prerequisites: [],
    output: [0],
  },
];

for (const { numCourses, prerequisites, output } of tests) {
  const result = findOrder(numCourses, prerequisites);

  console.warn({ numCourses, prerequisites, result, output });
}
