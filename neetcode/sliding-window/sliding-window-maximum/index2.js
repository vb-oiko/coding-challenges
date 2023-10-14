/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const result = [];
  let deque = new Deque();

  for (let i = 0; i < nums.length; i++) {
    while (true) {
      const rightIndex = deque.peekRight();
      if (rightIndex === null) {
        break;
      }

      if (nums[rightIndex] < nums[i]) {
        deque.popRight();
        continue;
      }

      break;
    }

    deque.pushRight(i);

    if (i < k - 1) {
      continue;
    }

    const leftIndex = deque.peekLeft();

    if (leftIndex < i - k + 1) {
      deque.popLeft();
    }

    result.push(nums[deque.peekLeft()]);
  }

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

  popRight() {
    if (this.arr.length === this.left) {
      return null;
    }
    return this.arr.pop();
  }

  peekRight() {
    if (this.arr.length === this.left) {
      return null;
    }
    return this.arr[this.arr.length - 1];
  }

  peekLeft() {
    if (this.arr.length === 0 || this.left >= this.arr.length) {
      return null;
    }

    return this.arr[this.left];
  }

  popLeft() {
    if (this.arr.length === 0 || this.left >= this.arr.length) {
      return null;
    }

    const result = this.arr[this.left];
    this.left++;
    return result;
  }

  getArr() {
    return this.arr.slice(this.left, this.arr.length);
  }
}

const tests = [
  // {
  //   nums: [1, 3, -1, -3, 5, 3, 6, 7],
  //   k: 3,
  //   expected: [3, 3, 5, 5, 6, 7],
  // },
  // {
  //   nums: [7, 6, 3, 5, -3, -1, 3, 1],
  //   k: 3,
  //   expected: [7, 6, 5, 5, 3, 3],
  // },
  // {
  //   nums: [1],
  //   k: 1,
  //   expected: [1],
  // },
  // {
  //   nums: [1, -1],
  //   k: 1,
  //   expected: [1, -1],
  // },
  {
    nums: [1, 3, 1, 2, 0, 5],
    k: 3,
    expected: [3, 3, 2, 5],
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
