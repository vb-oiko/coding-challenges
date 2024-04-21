/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function (a, b) {
  var xor;
  var overflow;

  while (true) {
    xor = a ^ b;
    overflow = (a & b) << 1;

    if (overflow === 0) {
      return xor;
    }

    a = xor;
    b = overflow;
  }
};

const tests = [
  {
    a: 2,
    b: 3,
    output: 5,
  },
  {
    a: 1,
    b: 2,
    output: 3,
  },
];

for (const { a, b, output } of tests) {
  const result = getSum(a, b);
  console.log({ a, b, result, output });
}
