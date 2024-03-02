/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  let prev = [];
  prev[-1] = 0;
  for (let i = 0; i < word2.length; i++) {
    prev[i] = i + 1;
  }

  for (let i1 = 0; i1 < word1.length; i1++) {
    const cur = [];
    cur[-1] = i1 + 1;
    for (let i2 = 0; i2 < word2.length; i2++) {
      const repl = word1[i1] === word2[i2] ? prev[i2 - 1] : prev[i2 - 1] + 1;
      const del = prev[i2] + 1;
      const ins = cur[i2 - 1] + 1;

      cur[i2] = Math.min(repl, del, ins);
    }
    prev = cur;
  }

  return prev[word2.length - 1];
};

const tests = [
  {
    word1: "horse",
    word2: "ros",
    output: 3,
  },
  {
    word1: "intention",
    word2: "execution",
    output: 5,
  },
  {
    word1: "",
    word2: "a",
    output: 1,
  },
];

for (const { word1, word2, output } of tests) {
  const result = minDistance(word1, word2);
  console.warn({ word1, word2, result, output });
}
