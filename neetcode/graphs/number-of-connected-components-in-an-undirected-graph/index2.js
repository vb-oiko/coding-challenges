/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function (n, edges) {
  const adjacency = new Array(n).fill().map(() => []);

  for (const [a, b] of edges) {
    adjacency[a].push(b);
    adjacency[b].push(a);
  }

  const visited = new Array(n).fill(false);

  function dfs(node) {
    if (visited[node]) {
      return;
    }

    visited[node] = true;

    for (const neighbor of adjacency[node]) {
      dfs(neighbor);
    }
  }

  let count = 0;

  for (let node = 0; node < n; node++) {
    if (visited[node]) {
      continue;
    }

    count++;
    dfs(node);
  }

  return count;
};

const tests = [
  //   {
  //     n: 5,
  //     edges: [
  //       [0, 1],
  //       [1, 2],
  //       [3, 4],
  //     ],
  //     output: 2,
  //   },
  {
    n: 5,
    edges: [
      [0, 1],
      [1, 2],
      [0, 2],
      [3, 4],
    ],
    output: 2,
  },
];

for (const { n, edges, output } of tests) {
  const result = countComponents(n, edges);
  console.warn({ n, edges, result, output });
}
