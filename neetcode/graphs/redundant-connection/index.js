/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
  const n = edges.length + 1;
  const adjacency = new Array(n).fill().map(() => []);
  const bounds = new Array(n).fill(0);

  for (const [a, b] of edges) {
    adjacency[a].push(b);
    adjacency[b].push(a);
    bounds[a]++;
    bounds[b]++;
  }

  const queue = [];
  let head = 0;

  for (let node = 1; node < n; node++) {
    if (bounds[node] === 1) {
      queue.push(node);
    }
  }

  let count = 0;
  while (head !== queue.length) {
    const node = queue[head];
    head++;

    count++;
    for (const neighbor of adjacency[node]) {
      bounds[node]--;
      bounds[neighbor]--;
      if (bounds[neighbor] === 1) {
        queue.push(neighbor);
      }
    }
  }

  for (let i = edges.length - 1; i >= 0; i--) {
    const [a, b] = edges[i];
    if (bounds[a] > 0 && bounds[b] > 0) {
      return [a, b];
    }
  }
};

const tests = [
  //   {
  //     edges: [
  //       [1, 2],
  //       [1, 3],
  //       [2, 3],
  //     ],
  //     output: [2, 3],
  //   },
  {
    edges: [
      [2, 7],
      [7, 8],
      [3, 6],
      [2, 5],
      [6, 8],
      [4, 8],
      [2, 8],
      [1, 8],
      [7, 10],
      [3, 9],
    ],
    output: [2, 8],
  },
];

for (const { edges, output } of tests) {
  const result = findRedundantConnection(edges);
  console.warn({ edges, result, output });
}
