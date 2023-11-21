/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  function buildTrie() {
    const trie = new Trie();
    for (const word of words) {
      trie.add(word);
    }
    return trie;
  }

  function buildFreshVisited() {
    return new Array(board.length)
      .fill(null)
      .map((_) => new Array(board[0].length).fill(false));
  }

  let visited = buildFreshVisited();
  const result = new Set();
  const m = board.length;
  const n = board[0].length;
  const trie = buildTrie(words);

  function backTrack(i, j, str) {
    const { prefix, word } = trie.search(str);
    if (!prefix) {
      return;
    }

    if (word) {
      result.add(str);
    }

    visited[i][j] = true;

    if (i - 1 >= 0 && !visited[i - 1][j]) {
      backTrack(i - 1, j, `${str}${board[i - 1][j]}`);
      visited[i - 1][j] = false;
    }

    if (i + 1 < m && !visited[i + 1][j]) {
      backTrack(i + 1, j, `${str}${board[i + 1][j]}`);
      visited[i + 1][j] = false;
    }

    if (j - 1 >= 0 && !visited[i][j - 1]) {
      backTrack(i, j - 1, `${str}${board[i][j - 1]}`);
      visited[i][j - 1] = false;
    }

    if (j + 1 < n && !visited[i][j + 1]) {
      backTrack(i, j + 1, `${str}${board[i][j + 1]}`);
      visited[i][j + 1] = false;
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      visited = buildFreshVisited();
      backTrack(i, j, board[i][j]);
    }
  }

  return [...result];
};

class TrieNode {
  constructor() {
    this.map = new Map();
    this.word = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  add(word) {
    let node = this.root;

    for (const key of word) {
      if (!node.map.has(key)) {
        node.map.set(key, new TrieNode());
      }

      node = node.map.get(key);
    }

    node.word = true;
  }

  search(word) {
    let node = this.root;

    for (const key of word) {
      if (!node.map.has(key)) {
        return { prefix: false, word: false };
      }

      node = node.map.get(key);
    }

    return { prefix: true, word: node.word };
  }
}

const { expect } = require("../../../utils");

const tests = [
  {
    board: [
      ["o", "a", "a", "n"],
      ["e", "t", "a", "e"],
      ["i", "h", "k", "r"],
      ["i", "f", "l", "v"],
    ],
    words: ["oath", "pea", "eat", "rain"],
    output: ["eat", "oath"],
  },
  {
    board: [["a", "b"]],
    words: ["ba"],
    output: ["ba"],
  },
  {
    board: [
      ["o", "a", "a", "n"],
      ["e", "t", "a", "e"],
      ["i", "h", "k", "r"],
      ["i", "f", "l", "v"],
    ],
    words: ["oath", "pea", "eat", "rain", "hklf", "hf"],
    output: ["oath", "eat", "hklf", "hf"],
  },
];

testWordSearch();

function testWordSearch() {
  for (const { board, words, output } of tests) {
    const result = findWords(board, words);

    const isValid =
      result.length === output.length &&
      expect.array(result).toHaveMembers(output);

    console.warn({ board, words, result, output, isValid });
  }
}

function testTrie() {
  const trie = new Trie();
  trie.add("bad");
  trie.add("ball");
  trie.add("badass");
  trie.add("badly");
  console.warn({ input: "bad", result: trie.search("bad") });
  console.warn({ input: "badl", result: trie.search("badl") });
  console.warn({ input: "badly", result: trie.search("badly") });
  console.warn({ input: "badly1", result: trie.search("badly1") });
  console.warn({ input: "bud", result: trie.search("bud") });
  console.warn({ input: "ball", result: trie.search("ball") });
  console.warn({ input: "bal", result: trie.search("bal") });
}
