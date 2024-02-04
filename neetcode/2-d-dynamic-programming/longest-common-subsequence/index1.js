/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const cache = Array.from({ length: text1.length }, () =>
    new Array(text2.length).fill(null)
  );

  function dp(i1, i2) {
    if (i1 >= text1.length || i2 >= text2.length) {
      return 0;
    }

    if (cache[i1][i2] !== null) {
      return cache[i1][i2];
    }

    const index = text2.indexOf(text1[i1], i2);

    const len1 = dp(i1 + 1, i2);
    const len2 = index < 0 ? 0 : dp(i1 + 1, index + 1) + 1;

    cache[i1][i2] = Math.max(len1, len2);
    return cache[i1][i2];
  }

  return dp(0, 0);
};

const tests = [
  {
    text1: "abcde",
    text2: "ace",
    output: 3,
  },
  {
    text1: "oxcpqrsvwf",
    text2: "shmtulqrypy",
    output: 2,
  },
  {
    text1: "ezupkr",
    text2: "ubmrapg",
    output: 2,
  },
  {
    text1: "pmjghexybyrgzczy",
    text2: "hafcdqbgncrcbihkd",
    output: 4,
  },
];

for (const { text1, text2, output } of tests) {
  const result = longestCommonSubsequence(text1, text2);
  console.warn({ text1, text2, result, output });
}
