/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  const n = s.length;
  let result = 0;

  function countPalindromes(pointer) {
    let left = Math.floor(pointer);
    let right = Math.ceil(pointer);
    let count = 0;

    while (left >= 0 && right <= n - 1 && s[left] === s[right]) {
      count++;
      left--;
      right++;
    }

    return count;
  }

  for (let i = 0; i <= n - 1; i += 0.5) {
    result += countPalindromes(i);
  }

  return result;
};

const tests = [
  {
    s: "abc",
    output: 3,
  },
  {
    s: "aaa",
    output: 6,
  },
];

for (const { s, output } of tests) {
  const result = countSubstrings(s);
  console.warn({ s, result, output });
}
