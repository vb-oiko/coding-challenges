/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function (n, edges) {
  const sets = new Array(n).fill(new Set()).map(() => new Set());

  for (const [a, b] of edges) {
    const common = new Set([...sets[a], ...sets[b], a, b]);

    for (const node of common) {
      sets[node] = common;
    }
  }

  const superSet = new Set(sets);
  return superSet.size;
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
];

for (const { n, edges, output } of tests) {
  const result = countComponents(n, edges);
  console.warn({ n, edges, result, output });
}
