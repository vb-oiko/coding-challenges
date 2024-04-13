/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (x === 0) {
    return 0;
  }

  if (n === 0) {
    return 1;
  }

  const bits = Math.abs(n).toString(2).split("").reverse();
  const len = bits.length;

  const powersOfTwo = new Array(len);
  powersOfTwo[0] = x;

  for (let i = 1; i < len; i++) {
    powersOfTwo[i] = powersOfTwo[i - 1] * powersOfTwo[i - 1];
  }

  let prod = 1;

  if (n > 0) {
    for (let i = 0; i < len; i++) {
      if (bits[i] === "0") {
        continue;
      }
      prod *= powersOfTwo[i];
    }

    return prod;
  }

  for (let i = 0; i < len; i++) {
    if (bits[i] === "0") {
      continue;
    }
    prod /= powersOfTwo[i];
  }

  return prod;
};

const tests = [
  //   { x: 2.0, n: 10, output: 1024.0 },
  { x: 2.0, n: -2, output: 0.25 },
  //   { x: 2.1, n: 3, output: 9.261 },
];

for (const { x, n, output } of tests) {
  const result = myPow(x, n);
  console.log({ x, n, result, output });
}
