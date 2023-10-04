/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  const str = s.toLowerCase().replace(/[^a-zA-Z0-9]*/g, "");

  if (str.length === 0) {
    return true;
  }

  let left = 0;
  let right = str.length - 1;

  while (right - left >= 1) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
};

const tests = ["A man, a plan, a canal: Panama", "race a car", " ", "asdf"];

for (const test of tests) {
  const result = isPalindrome(test);
  console.warn({ test, result });
}
