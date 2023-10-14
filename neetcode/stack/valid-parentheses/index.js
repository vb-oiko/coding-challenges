/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const MAP = new Map([
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
  ]);
  const stack = [];

  for (const c of s) {
    if (MAP.has(c)) {
      stack.push(c);
      continue;
    }

    const opening = stack.pop();

    if (opening === undefined || c !== MAP.get(opening)) {
      return false;
    }
  }

  return stack.length === 0;
};

const tests = [
  {
    s: "()",
    expected: true,
  },
  {
    s: "()[]{}",
    expected: true,
  },
  {
    s: "(]",
    expected: false,
  },
  {
    s: "()[]{}}",
    expected: false,
  },
  {
    s: "(()[]{}}",
    expected: false,
  },
];

for (const { s, expected } of tests) {
  const result = isValid(s);

  console.warn({ s, expected, result, isValid: expected === result });
}
