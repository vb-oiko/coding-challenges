/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  if (s3.length !== s1.length + s2.length) {
    return false;
  }

  const cache = Array.from({ length: s1.length + 1 }, () =>
    new Array(s2.length + 1).fill(null)
  );

  function dp(i1, i2) {
    if (i1 === s1.length && i2 === s2.length) {
      return true;
    }
    if (cache[i1][i2] !== null) {
      return cache[i1][i2];
    }

    const a = i1 < s1.length && s1[i1] === s3[i1 + i2] ? dp(i1 + 1, i2) : false;
    const b = i2 < s2.length && s2[i2] === s3[i1 + i2] ? dp(i1, i2 + 1) : false;

    cache[i1][i2] = a || b;
    return cache[i1][i2];
  }

  return dp(0, 0);
};

const tests = [
  {
    s1: "aabcc",
    s2: "dbbca",
    s3: "aadbbcbcac",
    output: true,
  },
  {
    s1: "aabcc",
    s2: "dbbca",
    s3: "aadbbbaccc",
    output: false,
  },
  {
    s1: "",
    s2: "",
    s3: "",
    output: true,
  },
];

for (const { s1, s2, s3, output } of tests) {
  const result = isInterleave(s1, s2, s3);
  console.warn({ s1, s2, s3, result, output });
}
