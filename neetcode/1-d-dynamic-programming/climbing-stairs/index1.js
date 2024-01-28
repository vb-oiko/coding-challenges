/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  const cache = new Array(n + 1).fill(null);

  function climb(m) {
    if (m === 1) {
      return 1;
    }

    if (m === 2) {
      return 2;
    }

    if (cache[m] !== null) {
      return cache[m];
    }

    cache[m] = climb(m - 1) + climb(m - 2);
    return cache[m];
  }

  return climb(n);
};

const tests = [
  { n: 2, output: 2 },
  { n: 3, output: 3 },
  { n: 5, output: 8 },
];

for (const { n, output } of tests) {
  const result = climbStairs(n);
  console.warn({ n, result, output });
}
