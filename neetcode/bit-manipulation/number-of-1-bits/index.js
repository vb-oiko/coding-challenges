/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  let result = 0;
  let bit = 1;
  for (let i = 0; i < 31; i++) {
    if (n & bit) {
      result++;
    }
    bit <<= 1;
  }
  return result;
};

const tests = [{ n: 11, output: 3 }];

for (const { n, output } of tests) {
  const result = hammingWeight(n);
  console.log({ n, result, output });
}
