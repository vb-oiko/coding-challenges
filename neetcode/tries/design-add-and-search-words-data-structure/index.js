var WordDictionary = function () {
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let node = this.root;

  for (const char of word) {
    let child;
    if (!node.map.has(char)) {
      child = new TrieNode();
      node.map.set(char, child);
    } else {
      child = node.map.get(char);
    }
    node = child;
  }

  node.word = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  let level = [this.root];

  for (const char of word) {
    const nextLevel = [];
    for (const node of level) {
      const chars = char === "." ? [...node.map.keys()] : [char];
      nextLevel.push(
        ...chars
          .filter((key) => node.map.has(key))
          .map((key) => node.map.get(key))
      );
    }
    if (nextLevel.length === 0) {
      return false;
    }

    level = nextLevel;
  }

  return level.some((node) => node.word);
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
