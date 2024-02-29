/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  const cache = new Array(s.length * t.length).fill(null);

  function dp(sIndex, tIndex) {
    if (sIndex === s.length && tIndex !== t.length) {
      return 0;
    }

    if (tIndex === t.length) {
      return 1;
    }

    const cacheIndex = sIndex * t.length + tIndex;
    if (cache[cacheIndex] !== null) {
      return cache[cacheIndex];
    }

    cache[cacheIndex] = 0;

    for (let i = sIndex; i < s.length; i++) {
      if (s[i] === t[tIndex]) {
        cache[cacheIndex] += dp(i + 1, tIndex + 1);
      }
    }

    return cache[cacheIndex];
  }

  return dp(0, 0);
};

const tests = [
  {
    s: "rabbbit",
    t: "rabbit",
    output: 3,
  },
  {
    s: "babgbag",
    t: "bag",
    output: 5,
  },
  {
    s: "ddd",
    t: "dd",
    output: 3,
  },
];

for (const { s, t, output } of tests) {
  const result = numDistinct(s, t);
  console.warn({ s, t, result, output });
}
