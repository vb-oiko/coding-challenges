/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const MAX_SUM = 214748364;
  let result = 0;
  while (x !== 0) {
    const remainder = x % 10;
    x = (x - remainder) / 10;

    if (result > MAX_SUM) {
      return 0;
    }

    if (result === MAX_SUM && remainder > 7) {
      return 0;
    }

    if (result < -MAX_SUM) {
      return 0;
    }

    if (result === -MAX_SUM && remainder < -8) {
      return 0;
    }

    result = result * 10 + remainder;
  }

  return result;
};

const tests = [
  {
    x: 123,
    output: 321,
  },
  {
    x: -123,
    output: -321,
  },
  {
    x: 7463847412,
    output: 2147483647,
  },
  {
    x: 8463847412,
    output: 2147483647,
  },
  {
    x: -8463847412,
    output: -2147483648,
  },
  {
    x: -9463847412,
    output: 0,
  },
];

for (const { x, output } of tests) {
  const result = reverse(x);
  console.log({ x, result, output });
}
