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

Map.prototype.getOrDefault = function (key, defaultValue = 0) {
  return this.get(key) || defaultValue;
};

Map.prototype.increment = function (key) {
  return this.set(key, this.getOrDefault(key) + 1);
};

Map.prototype.decrement = function (key) {
  return this.set(key, this.getOrDefault(key) - 1);
};

class CharSet {
  constructor(t) {
    this.tMap = new Map();
    this.sMap = new Map();
    this.aCharCode = "A".charCodeAt(0);
    this.conditionsMet = 0;

    for (const c of t) {
      const key = this.getKey(c);
      this.tMap.increment(key);
    }
  }

  getKey(c) {
    return c.charCodeAt(0) - this.aCharCode;
  }

  add(c) {
    const key = this.getKey(c);

    if (!this.tMap.has(key)) {
      return;
    }

    if (this.sMap.getOrDefault(key) - this.tMap.getOrDefault(key) === -1) {
      this.conditionsMet++;
    }

    this.sMap.increment(key);
  }

  remove(c) {
    const key = this.getKey(c);

    if (!this.tMap.has(key)) {
      return;
    }

    if (this.sMap.getOrDefault(key) - this.tMap.getOrDefault(key) === 0) {
      this.conditionsMet--;
    }

    this.sMap.decrement(key);
  }

  isValid() {
    return this.conditionsMet === this.tMap.size;
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
