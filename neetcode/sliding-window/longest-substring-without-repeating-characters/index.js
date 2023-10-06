/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let left = 0;
  let right = 0;
  let maxLength = 0;

  const set = new Set();

  while (right < s.length) {
    const current = s[right];

    if (!set.has(current)) {
      set.add(current);
      right++;
      continue;
    }

    if (right - left > maxLength) {
      maxLength = right - left;
    }

    while (true) {
      if (left === right) {
        break;
      }

      if (s[left] === current) {
        set.delete(s[left]);
        left++;
        break;
      }

      set.delete(s[left]);
      left++;
    }
  }

  if (right - left > maxLength) {
    maxLength = right - left;
  }

  return maxLength;
};

const tests = ["abcabcbb", "bbbbb", "pwwkew", "szabcadefgc"];

for (const test of tests) {
  const result = lengthOfLongestSubstring(test);
  console.warn({ test, result });
}
