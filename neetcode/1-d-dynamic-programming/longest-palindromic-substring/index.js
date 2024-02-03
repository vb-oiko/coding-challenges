/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const n = s.length;

  if (n === 1) {
    return s;
  }

  function extendToLongestPalindrome(pointer) {
    let left = Math.floor(pointer);
    let right = Math.ceil(pointer);
    let output = "";

    while (left >= 0 && right < n && s[left] === s[right]) {
      output = s.slice(left, right + 1);
      left--;
      right++;
    }

    return output;
  }

  const mid = (n - 1) / 2;
  let result = extendToLongestPalindrome(mid);

  let left = mid - 0.5;
  let right = mid + 0.5;

  let leftFlag = true;
  let rightFlag = true;

  while (leftFlag || rightFlag) {
    if (left >= result.length / 2) {
      const candidate = extendToLongestPalindrome(left);
      if (candidate.length > result.length) {
        result = candidate;
      }
    } else {
      leftFlag = false;
    }

    if (n - 1 - right >= result.length / 2) {
      const candidate = extendToLongestPalindrome(right);
      if (candidate.length > result.length) {
        result = candidate;
      }
    } else {
      rightFlag = false;
    }

    left -= 0.5;
    right += 0.5;
  }

  return result;
};

const tests = [
  {
    s: "babadpkrg[rlh",
    output: "bab",
  },
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
