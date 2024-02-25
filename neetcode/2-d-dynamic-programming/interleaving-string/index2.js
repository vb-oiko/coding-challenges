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

  let prev = new Array(s2.length + 1);
  let cur = new Array(s2.length + 1);

  prev[0] = true;
  for (let j = 1; j <= s2.length; j++) {
    prev[j] = prev[j - 1] && s2[j - 1] === s3[j - 1];
  }

  for (let i = 1; i <= s1.length; i++) {
    cur[0] = prev[0] && s1[i - 1] === s3[i - 1];
    for (let j = 1; j <= s2.length; j++) {
      cur[j] =
        (prev[j] && s1[i - 1] === s3[i - 1 + j]) ||
        (cur[j - 1] && s2[j - 1] === s3[j - 1 + i]);
    }
    prev = cur;
  }

  return prev[s2.length];
};

//  dp(0, 0) = dp(0, 1) || dp(1, 0)
//  dp(1, 0) = dp(1, 1) || dp(2, 0)

//  dp(i, j) = dp(i-1, j) && s1[i-1] === s3[i-1+j]
//  dp(i, j) = dp(i, j-1) && s2[j-1] === s3[j-1+i]

//  dp(i  , j) = dp(i-1, j) && s1[i-1] === s3[i-1+j]
//  dp(i+1, j) = dp(i  , j) && s1[i]   === s3[i+j]

const tests = [
  {
    s2: "aabcc",
    s1: "dbbca",
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
