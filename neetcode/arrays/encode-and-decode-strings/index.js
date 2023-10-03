const escapeChar = "a";
const doubleEscapeChar = "aa";
const separatorChar = "ab";

const encodeRegEx = /a/g;
const decodeRegEx = /a[ab]/g;

/**
 * Encodes a list of strings to a single string.
 *
 * @param {string[]} strs
 * @return {string}
 */
var encode = function (strs) {
  const s = strs
    .map((str) => str.replace(encodeRegEx, doubleEscapeChar))
    .join(separatorChar);
  // console.log(s)
  return s;
};

/**
 * Decodes a single string to a list of strings.
 *
 * @param {string} s
 * @return {string[]}
 */
var decode = function (s) {
  const strs = [];
  let str = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== escapeChar) {
      str.push(s[i]);
      continue;
    }

    i++;
    if (s[i] === escapeChar) {
      str.push(escapeChar);
      continue;
    }

    strs.push(str.join(""));
    str.length = 0;
  }

  strs.push(str.join(""));

  return strs;
};

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */
