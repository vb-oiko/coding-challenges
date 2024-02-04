/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const short = text1.length < text2.length ? text1 : text2;
  const long = text1.length < text2.length ? text2 : text1;

  let prev = new Array(short.length + 1).fill(0);

  for (let i = long.length - 1; i >= 0; i--) {
    const cur = [...prev];
    for (let j = short.length - 1; j >= 0; j--) {
      if (long[i] === short[j]) {
        cur[j] = 1 + prev[j + 1];
        continue;
      }

      cur[j] = Math.max(cur[j + 1], prev[j]);
    }

    prev = cur;
  }

  return prev[0];
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
