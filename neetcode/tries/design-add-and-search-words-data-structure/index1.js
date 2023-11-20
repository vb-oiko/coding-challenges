var WordDictionary = function () {
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  this.root.add(word);
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  return this.root.search(word);
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

class TrieNode {
  constructor() {
    this.map = new Map();
    this.word = false;
  }

  add(str) {
    if (!str.length) {
      return;
    }

    const char = str[0];

    let child;

    if (this.map.has(char)) {
      child = this.map.get(char);
    } else {
      child = new TrieNode();
      this.map.set(char, child);
    }

    if (str.length === 1) {
      child.word = true;

      return;
    }

    child.add(str.slice(1, str.length));
  }

  search(str) {
    if (!str.length) {
      return true;
    }

    const chars = str[0] === "." ? [...this.map.keys()] : [str[0]];

    if (str.length === 1) {
      return chars.some((char) => this.map.get(char)?.word);
    }

    return chars.some((char) =>
      this.map.get(char)?.search(str.slice(1, str.length))
    );
  }
}

const { expect } = require("../../../utils");

const tests = [
  {
    commands: [
      "WordDictionary",
      "addWord",
      "addWord",
      "addWord",
      "search",
      "search",
      "search",
      "search",
    ],
    values: [[], ["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]],
    output: [null, null, null, null, false, true, true, true],
  },
];

for (const { commands, values, output } of tests) {
  let result = [];

  const dictionary = new WordDictionary();

  for (let i = 0; i < commands.length; i++) {
    if (commands[i] === "WordDictionary") {
      result.push(null);
    }

    if (commands[i] === "addWord") {
      const [word] = values[i];
      dictionary.addWord(word);
      result.push(null);
    }

    if (commands[i] === "search") {
      const [word] = values[i];
      const value = dictionary.search(word);
      result.push(value);
    }
  }

  let isValid = expect.array(result).toEqual(output);

  console.warn({ commands, values, result, output, isValid });
}
