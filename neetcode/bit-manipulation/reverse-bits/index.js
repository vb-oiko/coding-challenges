/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
  var bigInt = BigInt(n);

  bigInt =
    ((bigInt & 0b1111_1111_1111_1111_0000_0000_0000_0000n) >> 16n) |
    ((bigInt & 0b0000_0000_0000_0000_1111_1111_1111_1111n) << 16n);

  bigInt =
    ((bigInt & 0b1111_1111_0000_0000_1111_1111_0000_0000n) >> 8n) |
    ((bigInt & 0b0000_0000_1111_1111_0000_0000_1111_1111n) << 8n);

  bigInt =
    ((bigInt & 0b1111_0000_1111_0000_1111_0000_1111_0000n) >> 4n) |
    ((bigInt & 0b0000_1111_0000_1111_0000_1111_0000_1111n) << 4n);

  bigInt =
    ((bigInt & 0b1100_1100_1100_1100_1100_1100_1100_1100n) >> 2n) |
    ((bigInt & 0b0011_0011_0011_0011_0011_0011_0011_0011n) << 2n);

  bigInt =
    ((bigInt & 0b1010_1010_1010_1010_1010_1010_1010_1010n) >> 1n) |
    ((bigInt & 0b0101_0101_0101_0101_0101_0101_0101_0101n) << 1n);

  return bigInt;
};

const tests = [
  {
    n: 0b00000010100101000001111010011100,
    output: 964176192,
  },
  {
    n: 0b11111111111111111111111111111101,
    output: 3221225471,
  },
];

for (const { n, output } of tests) {
  const result = reverseBits(n);
  console.log({ n, result, output });
}
