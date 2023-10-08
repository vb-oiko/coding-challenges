/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const set = new CharSet(t);

  let min = Infinity;
  let result = "";
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    set.add(s[right]);

    if (set.isValid()) {
      while (left < right && set.isValidIfRemove(s[left])) {
        set.remove(s[left]);
        left++;
      }

      const curLength = right - left + 1;

      if (curLength < min) {
        result = s.slice(left, right + 1);
        min = curLength;
      }
    }
  }

  return result;
};

class CharSet {
  constructor(t) {
    this.alphabetLength = 58;
    this.arrS = new Array(this.alphabetLength).fill(0);
    this.arrT = new Array(this.alphabetLength).fill(0);
    this.aCharCode = "A".charCodeAt(0);

    for (const c of t) {
      this.arrT[c.charCodeAt(0) - this.aCharCode]++;
    }
  }

  add(c) {
    this.arrS[c.charCodeAt(0) - this.aCharCode]++;
  }

  remove(c) {
    this.arrS[c.charCodeAt(0) - this.aCharCode]--;
  }

  isValid() {
    for (let i = 0; i < this.alphabetLength; i++) {
      if (this.arrS[i] < this.arrT[i]) {
        return false;
      }
    }

    return true;
  }

  isValidIfRemove(c) {
    this.remove(c);
    const result = this.isValid();
    this.add(c);
    return result;
  }
}

const tests = [
  {
    s: "ADOBECODEBANC",
    t: "ABC",
    result: "BANC",
    expected: "BANC",
  },
  { s: "a", t: "a", result: "a", expected: "a" },
  { s: "a", t: "aa", result: "", expected: "" },
  {
    s: "gehzduwqkzuyotckqcusdiqubeqglkvuocttzrllqfjhzorpqnjwxbqyfiesscmigicfzn",
    t: "qsvczwsslkhwg",
    result: "wqkzuyotckqcusdiqubeqglkvuocttzrllqfjhzorpqnjwxbqyfiess",
    expected: "wqkzuyotckqcusdiqubeqglkvuocttzrllqfjhzorpqnjwxbqyfiess",
  },
];

for (const { s, t, expected } of tests) {
  const result = minWindow(s, t);

  console.warn({ s, t, expected, result, valid: result === expected });
}
