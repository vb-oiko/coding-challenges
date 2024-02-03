/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const n = s.length;

  if (n === 1) {
    return s;
  }

  let result = s[0];

  const cache = new Array(n).fill().map(() => new Array(n).fill(null));

  function isPalindrome(start, end) {
    if (cache[start][end] !== null) {
      return cache[start][end];
    }

    if (end - start === 0) {
      return true;
    }

    if (end - start === 1) {
      const result = s[start] === s[end];
      cache[start][end] = result;
      return result;
    }

    return s[start] === s[end] && isPalindrome(start + 1, end - 1);
  }

  for (let len = 2; len <= n; len++) {
    for (let offset = 0; offset <= n - len; offset++) {
      if (isPalindrome(offset, offset + len - 1)) {
        result = s.slice(offset, offset + len);
        break;
      }
    }
  }

  return result;
};

const tests = [
  {
    s: "babad",
    output: "bab",
  },
  {
    s: "cbbd",
    output: "bb",
  },
];

for (const { s, output } of tests) {
  const result = longestPalindrome(s);
  console.warn({ s, result, output });
}
