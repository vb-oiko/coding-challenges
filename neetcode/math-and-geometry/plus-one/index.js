/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  let overflow = 1;

  for (let i = digits.length - 1; i >= 0; i--) {
    const newDigit = digits[i] + overflow;
    if (newDigit < 10) {
      digits[i] = newDigit;
      overflow = 0;
      break;
    }
    digits[i] = 0;
  }

  return overflow === 1 ? [1, ...digits] : digits;
};

const tests = [
  {
    digits: [1, 2, 3],
    output: [1, 2, 4],
  },
  {
    digits: [9],
    output: [1, 0],
  },
  {
    digits: [1, 2, 3, 9, 9],
    output: [1, 2, 4, 0, 0],
  },
];

for (const { digits, output } of tests) {
  const result = plusOne(digits);
  console.log({ digits, result, output });
}
