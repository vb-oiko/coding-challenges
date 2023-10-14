/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const result = [];
  let deque = new Deque();

  for (let i = 0; i < nums.length; i++) {
    if (i >= k) {
      result.push(deque.popLeft());
    }

    deque.push(nums[i]);
  }

  result.push(deque.popLeft());
  return result;
};

class Deque {
  constructor() {
    this.arr = [];
    this.left = 0;
  }

  pushRight(el) {
    this.arr.push(el);
  }

  peekRight() {
    return this.arr[this.arr.length - 1];
  }

  peekLeft() {
    return this.arr[this.left];
  }

  popLeft() {
    const result = this.arr[this.left];
    this.left++;
    return result;
  }

  purgeAllSmallerLeft(el) {
    let i = this.arr.length - 1;
    while (i >= this.left && this.arr[i] < el) {
      this.arr[i] = el;
      i--;
    }
  }

  getArr() {
    return this.arr.slice(this.left, this.arr.length);
  }

  push(el) {
    this.purgeAllSmallerLeft(el);
    this.pushRight(el);
  }
}

const tests = [
  {
    nums: [1, 3, -1, -3, 5, 3, 6, 7],
    k: 3,
    expected: [3, 3, 5, 5, 6, 7],
  },
  {
    nums: [7, 6, 3, 5, -3, -1, 3, 1],
    k: 3,
    expected: [7, 6, 5, 5, 3, 3],
  },
  {
    nums: [1],
    k: 1,
    expected: [1],
  },
  {
    nums: [1, -1],
    k: 1,
    expected: [1, -1],
  },
];

for (const { nums, k, expected } of tests) {
  const result = maxSlidingWindow(nums, k);

  let isValid = true;
  for (let i = 0; i < expected.length; i++) {
    if (result[i] !== expected[i]) {
      isValid = false;
      break;
    }
  }

  console.warn({ nums, k, expected, result, isValid });
}
