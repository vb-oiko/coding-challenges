/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const n = s.length;

  function isPalindrome(start, end) {
    if (end === start) {
      return true;
    }

    let left = start;
    let right = end;
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }

    return true;
  }

  const result = [];

  let candidate = [];

  function backtrack(start, end) {
    if (start >= n) {
      result.push([...candidate]);
      return;
    }

    for (let split = start; split <= end; split++) {
      if (isPalindrome(start, split)) {
        candidate.push(s.slice(start, split + 1));
        backtrack(split + 1, end);
        candidate.pop();
      }
    }
  }

  backtrack(0, s.length - 1);

  return result;
};

const tests = [
  {
    s: "aab",
    output: [
      ["a", "a", "b"],
      ["aa", "b"],
    ],
  },
  {
    s: "a",
    output: [["a"]],
  },
];

for (const { s, output } of tests) {
  const result = partition(s);
  console.warn({ s, result, output });
}
