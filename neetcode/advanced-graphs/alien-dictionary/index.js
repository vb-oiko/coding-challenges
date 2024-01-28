/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function (words) {
  if (words.length === 1) {
    return [...new Set(words[0].split(""))].join("");
  }

  const adjacency = new Map();
  const indegree = new Map();
  let result = new Set();

  for (const letter of words[0]) {
    indegree.set(letter, indegree.get(letter) || 0);
  }

  for (let i = 0; i < words.length - 1; i++) {
    for (const letter of words[i + 1]) {
      indegree.set(letter, indegree.get(letter) || 0);
    }

    if (words[i].startsWith(words[i + 1]) && words[i] !== words[i + 1]) {
      return "";
    }

    const minCommonLength = Math.min(words[i].length, words[i + 1].length);
    for (let j = 0; j < minCommonLength; j++) {
      const a = words[i][j];
      const b = words[i + 1][j];
      if (a === b) {
        continue;
      }

      const neighbors = adjacency.get(a) || new Set();
      if (!neighbors.has(b)) {
        neighbors.add(b);
        indegree.set(b, (indegree.get(b) || 0) + 1);
      }
      adjacency.set(a, neighbors);
      break;
    }
  }

  const nodes = new Queue();

  for (const [node, incomingCount] of indegree) {
    if (incomingCount === 0) {
      nodes.enqueue(node);
    }
  }

  while (nodes.size() > 0) {
    const node = nodes.dequeue();
    result.add(node);
    const neighbors = adjacency.get(node);
    if (!neighbors) {
      continue;
    }

    for (const neighbor of neighbors) {
      const newIndegree = (indegree.get(neighbor) || 1) - 1;
      indegree.set(neighbor, newIndegree);
      if (newIndegree === 0) {
        nodes.enqueue(neighbor);
      }
    }
  }

  return result.size === indegree.size ? [...result].join("") : "";
};

var { Queue } = require("@datastructures-js/queue");

const tests = [
  {
    words: ["wrt", "wrf", "er", "ett", "rftt"],
    output: "wertf",
  },
  {
    words: ["z", "x"],
    output: "zx",
  },
  {
    words: ["z", "x", "z"],
    output: "",
  },
  {
    words: ["z", "z"],
    output: "z",
  },
  {
    words: ["ab", "adc"],
    output: "abcd",
  },
  {
    words: ["ac", "ab", "zc", "zb"],
    output: "acbz",
  },
  {
    words: ["ac", "ab", "b"],
    output: "acb",
  },
  {
    words: ["z", "x", "a", "zb", "zx"],
    output: "",
  },
];

for (const { words, output } of tests) {
  const result = alienOrder(words);

  console.warn({ words, result, output });
}
