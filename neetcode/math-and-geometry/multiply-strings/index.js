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

  function split(x) {
    const rightDigit = x % 10;
    const leftDigit = (x - rightDigit) / 10;
    return [leftDigit, rightDigit];
  }

  function add(i, x) {
    let [overflow, digit] = split(result[i] + x);
    result[i] = digit;
    [overflow, digit] = split(result[i + 1] + overflow);
    result[i + 1] = digit;
    if (overflow) {
      result[i + 2] += overflow;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      add(i + j, a[i] * b[j]);
    }
  }

  while (result[result.length - 1] === 0) {
    result.pop();
  }

  return result.reverse().join("");
};

const tests = [
  {
    num1: "2",
    num2: "3",
    output: "6",
  },
  {
    num1: "999",
    num2: "999",
    output: "56088",
  },
];

for (const { num1, num2, output } of tests) {
  const result = multiply(num1, num2);
  console.log({ num1, num2, result, output });
}
