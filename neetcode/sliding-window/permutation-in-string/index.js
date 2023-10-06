/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  const set = new CharSet(s1);

  for (let right = 0; right < s2.length; right++) {
    const left = right - s1.length;

    if (left < 0) {
      set.add(s2[right]);
      continue;
    }
    if (set.isValid()) {
      return true;
    }

    set.add(s2[right]);
    set.remove(s2[left]);
  }

  if (set.isValid()) {
    return true;
  }

  return false;
};

const ALPHABET_LENGTH = 26;

class CharSet {
  constructor(s1) {
    this.arr1 = new Array(ALPHABET_LENGTH).fill(0);
    this.arr2 = new Array(ALPHABET_LENGTH).fill(0);
    this.aCharCode = "a".charCodeAt(0);
    for (const c of s1) {
      this.arr1[c.charCodeAt(0) - this.aCharCode]++;
    }
  }

  add(c) {
    this.arr2[c.charCodeAt(0) - this.aCharCode]++;
  }

  remove(c) {
    this.arr2[c.charCodeAt(0) - this.aCharCode]--;
  }

  isValid() {
    for (let i = 0; i < ALPHABET_LENGTH; i++) {
      if (this.arr1[i] !== this.arr2[i]) {
        return false;
      }
    }

    return true;
  }
}

const tests = [
  { s1: "ab", s2: "eidbaooo" },
  { s1: "ab", s2: "eidoooba" },
  { s1: "ab", s2: "eidboaoo" },
];

for (const { s1, s2 } of tests) {
  const result = checkInclusion(s1, s2);
  console.warn({ s1, s2, result });
}
