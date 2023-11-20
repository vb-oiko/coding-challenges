var Trie = function () {
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  this.root.add(word);
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  const searchResult = this.root.search(word);
  return searchResult ? searchResult.word : false;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  const searchResult = this.root.search(prefix);
  return searchResult ? true : false;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

class TrieNode {
  constructor(val) {
    this.map = new Map();
    this.word = false;
  }

  add(str) {
    if (!str.length) {
      return;
    }

    const char = str[0];

    let child;

    if (!this.map.has(char)) {
      child = new TrieNode();
      this.map.set(char, child);
    } else {
      child = this.map.get(char);
    }

    if (str.length === 1) {
      child.word = true;
      return;
    }

    child.add(str.slice(1, str.length));
  }

  search(str) {
    if (!str) {
      return undefined;
    }

    if (str.length === 1) {
      return this.map.get(str);
    }

    const char = str[0];
    if (!this.map.has(char)) {
      return undefined;
    }

    const child = this.map.get(char);

    return child.search(str.slice(1, str.length));
  }
}

const tests = [
  {
    commands: [
      "Trie",
      "insert",
      "search",
      "search",
      "startsWith",
      "insert",
      "search",
      "search",
      "search",
      "startsWith",
    ],
    values: [
      [],
      ["apple"],
      ["apple"],
      ["app"],
      ["app"],
      ["app"],
      ["app"],
      ["epp"],
      ["appl"],
      ["appl"],
    ],
    output: [null, null, true, false, true, null, true],
  },
];

const { expect } = require("../../../utils");

for (const { commands, values, output } of tests) {
  let result = [];

  const trie = new Trie();

  for (let i = 0; i < commands.length; i++) {
    if (commands[i] === "Trie") {
      result.push(null);
    }

    if (commands[i] === "insert") {
      const [word] = values[i];
      trie.insert(word);
      result.push(null);
    }

    if (commands[i] === "search") {
      const [word] = values[i];
      const value = trie.search(word);
      result.push(value);
    }

    if (commands[i] === "startsWith") {
      const [prefix] = values[i];
      const value = trie.startsWith(prefix);
      result.push(value);
    }
  }

  let isValid = expect.array(result).toEqual(output);

  console.warn({ commands, values, result, output, isValid });
}
