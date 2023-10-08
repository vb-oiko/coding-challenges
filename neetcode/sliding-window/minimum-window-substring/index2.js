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
    this.conditionsMet = 0;
    this.conditionsTotal = 0;

    for (const c of t) {
      const key = this.getKey(c);

      if (this.arrT[key] === 0) {
        this.conditionsTotal++;
      }

      this.arrT[key]++;
    }
  }

  getKey(c) {
    return c.charCodeAt(0) - this.aCharCode;
  }

  add(c) {
    const key = this.getKey(c);

    if (this.arrT[key] === 0) {
      return;
    }

    if (this.arrS[key] - this.arrT[key] === -1) {
      this.conditionsMet++;
    }

    this.arrS[key]++;
  }

  remove(c) {
    const key = this.getKey(c);

    if (this.arrT[key] === 0) {
      return;
    }

    if (this.arrS[key] - this.arrT[key] === 0) {
      this.conditionsMet--;
    }

    this.arrS[key]--;
  }

  isValid() {
    return this.conditionsMet === this.conditionsTotal;
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
