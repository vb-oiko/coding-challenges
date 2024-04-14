/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (num1 === "0" || num2 === "0") {
    return "0";
  }

  const a = num1
    .split("")
    .reverse()
    .map((digit) => parseInt(digit));
  const b = num2
    .split("")
    .reverse()
    .map((digit) => parseInt(digit));

  const n = a.length;
  const m = b.length;
  const result = new Array(m + n).fill(0);

  for (let i = 0; i < n; i++) {
    let overflow = 0;
    const prod = new Array(m + n).fill(0);

    for (let j = 0; j < m; j++) {
      const digitsProd = a[i] * b[j] + overflow;
      const digit = digitsProd % 10;
      overflow = (digitsProd - digit) / 10;

      prod[i + j] = digit;
    }
    prod[i + m] = overflow;

    overflow = 0;
    for (let i = 0; i < m + n; i++) {
      const sum = prod[i] + result[i] + overflow;
      const digit = sum % 10;
      overflow = sum >= 10 ? 1 : 0;
      result[i] = digit;
    }
  }

  while (result[result.length - 1] === 0) {
    result.pop();
  }

  return result.reverse().join("");
};

const tests = [
  //   {
  //     num1: "2",
  //     num2: "3",
  //     output: "6",
  //   },
  {
    num1: "1",
    num2: "222",
    output: "56088",
  },
];

for (const { num1, num2, output } of tests) {
  const result = multiply(num1, num2);
  console.log({ num1, num2, result, output });
}
