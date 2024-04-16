/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
  let result = 0;

  for (let i = 0; i < 32; i++) {
    const next = n >>> 1;
    const bit = n - next * 2;
    result = result * 2 + bit;
    n = next;
  }

  return result;
};

const tests = [
  {
    n: 0b00000010100101000001111010011100,
    output: 964176192,
  },
];

for (const { n, output } of tests) {
  const result = reverseBits(n);
  console.log({ n, result, output });
}
