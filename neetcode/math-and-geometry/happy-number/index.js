/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  function next(n) {
    let sum = 0;
    let current = n;

    while (true) {
      if (current < 10) {
        sum += current * current;
        break;
      }

      const remainder = current % 10;
      sum += remainder * remainder;
      current = (current - remainder) / 10;
    }

    return sum;
  }

  let current = n;
  const visited = new Set();

  while (current !== 1 && !visited.has(current)) {
    visited.add(current);
    current = next(current);
  }

  return current === 1;
};

const tests = [
  {
    n: 19,
    output: true,
  },
  {
    n: 2,
    output: false,
  },
];

for (const { n, output } of tests) {
  const result = isHappy(n);
  console.log({ n, result, output });
}
