/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n == 1) {
    return 1;
  }

  const cache = new Array(n + 1);
  cache[1] = 1;
  cache[2] = 2;

  for (let i = 3; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }

  return cache[n];
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
