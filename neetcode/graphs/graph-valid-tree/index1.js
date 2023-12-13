/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function (n, edges) {
  const adjacency = new Array(n).fill().map(() => []);
  const visited = new Array(n).fill(false);
  let hasCycle = false;

  for (const [a, b] of edges) {
    adjacency[a].push(b);
    adjacency[b].push(a);
  }

  console.warn({ adjacency });

  function dfs(node, prevNode) {
    if (visited[node] || hasCycle) {
      hasCycle = true;
      return;
    }

    visited[node] = true;

    for (const neighbor of adjacency[node]) {
      if (neighbor === prevNode) {
        continue;
      }

      dfs(neighbor, node);
    }
  }

  dfs(0);

  return !hasCycle && visited.every(Boolean);
};

const tests = [
  {
    n: 5,
    edges: [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 4],
    ],
    output: true,
  },
  {
    n: 5,
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 3],
      [1, 4],
    ],
    output: false,
  },
];

for (const { n, edges, output } of tests) {
  const result = validTree(n, edges);
  console.warn({ n, edges, result, output });
}
