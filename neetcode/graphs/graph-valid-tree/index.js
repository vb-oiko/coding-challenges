/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function (n, edges) {
  if (edges.length !== n - 1) {
    return false;
  }

  const representative = new Array(n).fill().map((_, i) => i);
  const size = new Array(n).fill(1);

  function find(node) {
    if (node === representative[node]) {
      return node;
    }

    return (representative[node] = find(representative[node]));
  }

  function combine(a, b) {
    const r1 = find(a);
    const r2 = find(b);

    if (r1 === r2) {
      return true;
    }

    if (size[r1] > size[r2]) {
      representative[r2] = representative[r1];
      size[r1] += size[r2];
    } else {
      representative[r1] = representative[r2];
      size[r2] += size[r1];
    }

    return false;
  }

  for (const [a, b] of edges) {
    if (combine(a, b)) {
      return false;
    }
  }

  return true;
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
