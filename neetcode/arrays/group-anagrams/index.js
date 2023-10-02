/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map();

  for (const word of strs) {
    const key = word.split("").sort().join("");
    const arr = map.get(key) || [];
    arr.push(word);
    map.set(key, arr);
  }

  return [...map.values()];
};

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
const result = groupAnagrams(strs);

console.log(result);
