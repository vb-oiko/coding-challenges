/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const result = new Array(n + 1);
  result[0] = 0;
  let offset = 1;

  for (let i = 1; i <= n; i++) {
    if (i === offset * 2) {
      offset *= 2;
    }
    result[i] = 1 + result[i - offset];
  }

  return result;
};

const tests = [
  {
    n: 2,
    output: [0, 1, 1],
  },
  {
    n: 5,
    output: [0, 1, 1, 2, 1, 2],
  },
];

for (const { n, output } of tests) {
  const result = countBits(n);
  console.log({ n, result, output });
}
