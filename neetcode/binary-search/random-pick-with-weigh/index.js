/**
 * @param {number[]} w
 */
var Solution = function (w) {
  let sum = 0;
  for (let i = 0; i < w.length; i++) {
    sum += w[i];
  }

  this.probability = new Array(w.length);

  let cur = 0;
  for (let i = 0; i < w.length; i++) {
    this.probability[i] = cur;
    cur += w[i] / sum;
  }

  console.warn(this.probability);
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function () {
  if (this.probability.length === 1) {
    return 0;
  }

  let left = 0;
  let right = this.probability.length - 1;

  const searched = Math.random();

  console.warn({ searched });

  while (left !== right) {
    const mid = Math.ceil((left + right) / 2);

    // console.warn({ left, mid, right, searched, cur: this.probability[mid] });
    if (searched >= this.probability[mid]) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  return left;
};

var obj = new Solution([1, 3, 3]);

console.warn(obj.pickIndex());
console.warn(obj.pickIndex());
console.warn(obj.pickIndex());
console.warn(obj.pickIndex());
console.warn(obj.pickIndex());
console.warn(obj.pickIndex());
console.warn(obj.pickIndex());
console.warn(obj.pickIndex());
