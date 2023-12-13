/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function (n, edges) {
  const representative = new Array(n).fill().map((_, i) => i);
  const size = new Array(n).fill(1);

  function find(node) {
    if (representative[node] === node) {
      return node;
    }

    return (representative[node] = find(representative[node]));
  }

  function combine(a, b) {
    const r1 = find(a);
    const r2 = find(b);

    if (r1 === r2) {
      return 0;
    }

    if (size[r1] > size[r2]) {
      representative[r2] = r1;
      size[r1] += size[r2];
    } else {
      representative[r1] = r2;
      size[r2] += size[r1];
    }

    return 1;
  }

  let count = n;

  for (const [a, b] of edges) {
    count -= combine(a, b);
  }

  return count;
};

const tests = [
  {
    n: 5,
    edges: [
      [0, 1],
      [1, 2],
      [3, 4],
    ],
    output: 2,
  },
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
