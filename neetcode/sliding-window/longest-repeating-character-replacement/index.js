/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  const set = new CharSet(k);
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    set.add(s[right]);

    if (set.isValid()) {
      if (set.sum > maxLength) {
        maxLength = set.sum;
      }
      continue;
    }

    while (!set.isValid() & (left < right)) {
      set.remove(s[left]);
      left++;
    }
  }

  return maxLength;
};

class CharSet {
  constructor(k) {
    this.k = k;
    this.arr = new Array(26).fill(0);
    this.A = "A".charCodeAt(0);
    this.sum = 0;
    this.max = 0;
  }

  add(c) {
    this.arr[c.charCodeAt(0) - this.A]++;
    this.sum++;
    this.updateMax();
  }

  remove(c) {
    this.arr[c.charCodeAt(0) - this.A]--;
    this.sum--;
    this.updateMax();
  }

  updateMax() {
    this.max = 0;
    for (const n of this.arr) {
      if (n > this.max) {
        this.max = n;
      }
    }
  }

  isValid() {
    return this.sum - this.max <= this.k;
  }
}

const tests = [
  { s: "ABABC", k: 2 },
  { s: "AABABBA", k: 1 },
];

for (const { s, k } of tests) {
  const result = characterReplacement(s, k);
  console.warn({ s, k, result });
}
