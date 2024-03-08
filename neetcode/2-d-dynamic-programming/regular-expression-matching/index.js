/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  const cache = Array.from({ length: s.length }, () => {
    const arr = new Array(p.length).fill(null);
    arr[-1] = false;
    return arr;
  });

  cache[-1] = new Array(p.length).fill(null);
  cache[-1][-1] = true;

  function dp(si, pi) {
    if (si < -1 || pi < -1) {
      return false;
    }

    if (si === -1 && pi === -1) {
      return true;
    }
    if (cache[si][pi] !== null) {
      return cache[si][pi];
    }

    if (p[pi] === "." || p[pi] === s[si]) {
      const result = dp(si - 1, pi - 1);
      cache[si][pi] = result;
      return result;
    }

    if (p[pi] !== "*") {
      cache[si][pi] = false;
      return false;
    }

    const char = p[pi - 1];

    const result =
      dp(si, pi - 2) || (dp(si - 1, pi) && (char === "." || s[si] === char));
    cache[si][pi] = result;
    return result;
  }

  return dp(s.length - 1, p.length - 1);
};

const tests = [
  {
    s: "aa",
    p: "a",
    output: false,
  },
  {
    s: "",
    p: "a",
    output: false,
  },
  {
    s: "a",
    p: "",
    output: false,
  },
  {
    s: "",
    p: "",
    output: true,
  },
  {
    s: "aa",
    p: "ba",
    output: false,
  },
  {
    s: "aa",
    p: "aa",
    output: true,
  },
  {
    s: "aa",
    p: "aaa",
    output: false,
  },
  {
    s: "aa",
    p: "a.",
    output: true,
  },
  {
    s: "aa",
    p: "a*",
    output: true,
  },
  {
    s: "aa",
    p: ".*",
    output: true,
  },
  {
    s: "bb",
    p: "bba*",
    output: true,
  },
  {
    s: "aabb",
    p: "a*bba*",
    output: true,
  },
  {
    s: "bb",
    p: "a*bba*",
    output: true,
  },
  {
    s: "a",
    p: "ab*a",
    output: false,
  },
];

for (const { s, p, output } of tests) {
  const result = isMatch(s, p);
  console.log({ s, p, result, output });
}
