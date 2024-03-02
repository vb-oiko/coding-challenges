/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const cache = Array.from({ length: word1.length }, () =>
    new Array(word2.length).fill(null)
  );

  function dp(i1, i2) {
    if (i1 === -1 && i2 === -1) {
      return 0;
    }

    if (i1 === -1) {
      return i2 + 1;
    }

    if (i2 === -1) {
      return i1 + 1;
    }

    return cache[i1][i2];
  }

  for (let i1 = 0; i1 < word1.length; i1++) {
    for (let i2 = 0; i2 < word2.length; i2++) {
      const repl =
        word1[i1] === word2[i2] ? dp(i1 - 1, i2 - 1) : dp(i1 - 1, i2 - 1) + 1;
      const del = dp(i1 - 1, i2) + 1;
      const ins = dp(i1, i2 - 1) + 1;

      cache[i1][i2] = Math.min(repl, del, ins);
    }
  }

  return dp(word1.length - 1, word2.length - 1);
};

const tests = [
  {
    word1: "horse",
    word2: "ros",
    output: 3,
  },
  // {
  //   word1: "intention",
  //   word2: "execution",
  //   output: 5,
  // },
  // {
  //   word1: "",
  //   word2: "a",
  //   output: 1,
  // },
];

for (const { word1, word2, output } of tests) {
  const result = minDistance(word1, word2);
  console.warn({ word1, word2, result, output });
}
