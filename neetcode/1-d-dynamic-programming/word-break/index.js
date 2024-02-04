/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const trie = {
    children: new Map(),
  };

  for (const word of wordDict) {
    let current = trie;
    for (const char of word) {
      if (current.children.has(char)) {
        current = current.children.get(char);
        continue;
      }

      current.children.set(char, { children: new Map(), isWord: false });
      current = current.children.get(char);
    }
    current.isWord = true;
  }

  let cache = new Array(s.length + 1).fill(null);
  cache[s.length] = true;

  function backtrack(index) {
    if (cache[index] !== null) {
      return cache[index];
    }

    let i = index;
    let node = trie;
    const candidates = [];

    while (node.children.has(s[i])) {
      node = node.children.get(s[i]);
      if (node.isWord) {
        candidates.push(i + 1);
      }
      i++;
    }

    cache[index] = candidates.some((index) => backtrack(index));
    return cache[index];
  }

  return backtrack(0);
};

const tests = [
  {
    s: "leetcode",
    wordDict: ["leet", "code"],
    output: true,
  },
  {
    s: "applepenapple",
    wordDict: ["apple", "pen"],
    output: true,
  },
  {
    s: "catsandog",
    wordDict: ["cats", "dog", "sand", "and", "cat"],
    output: false,
  },
];

for (const { s, wordDict, output } of tests) {
  const result = wordBreak(s, wordDict);
  console.warn({ s, wordDict, result, output });
}
