/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  const n = s.length;

  const set = new Set(Array.from({ length: 26 }, (_, i) => `${i + 1}`));
  const cache = new Array(n).fill(0);

  if (!set.has(s[0])) {
    return 0;
  }

  cache[0] = 1;

  for (let i = 1; i < n; i++) {
    const char = s[i];
    const single = set.has(char) ? 1 : 0;
    const doubleChar = s.slice(i - 1, i + 1);
    const double = set.has(doubleChar) ? 1 : 0;
    cache[i] = single * cache[i - 1] + double * (cache[i - 2] ?? 1);
  }

  return cache[n - 1];
};

const tests = [
  //   {
  //     s: "12",
  //     output: 2,
  //   },
  //   {
  //     s: "226",
  //     output: 3,
  //   },
  //   {
  //     s: "06",
  //     output: 0,
  //   },
  //   {
  //     s: "11106",
  //     output: 2,
  //   },
  {
    s: "10011",
    output: 0,
  },
];

for (const { s, output } of tests) {
  const result = numDecodings(s);
  console.warn({ s, result, output });
}
