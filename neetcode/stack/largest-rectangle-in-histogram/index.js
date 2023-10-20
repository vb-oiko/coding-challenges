/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let result = 0;
  const stack = new Stack();
  stack.push({ index: 0, height: heights[0] });

  for (let currentIndex = 1; currentIndex < heights.length; currentIndex++) {
    const currentHight = heights[currentIndex];

    if (currentHight > stack.peek().height) {
      stack.push({ index: currentIndex, height: currentHight });

      continue;
    }

    if (currentHight === stack.peek().height) {
      continue;
    }

    let removedIndex = null;

    while (stack.size > 0 && stack.peek().height > currentHight) {
      const { index, height } = stack.pop();
      removedIndex = index;

      const rightArea = (currentIndex - index + 1) * heights[currentIndex];

      const leftArea = (currentIndex - index) * height;

      if (rightArea > result) {
        result = rightArea;
      }

      if (leftArea > result) {
        result = leftArea;
      }
    }

    stack.push({
      index: removedIndex === null ? currentIndex : removedIndex,
      height: heights[currentIndex],
    });
  }

  while (stack.size > 0) {
    const { index, height } = stack.pop();

    const leftArea =
      stack.size === 0 && height !== 0
        ? heights.length * height
        : (heights.length - index) * height;

    if (leftArea > result) {
      result = leftArea;
    }
  }

  return result;
};

class Stack {
  constructor() {
    this.arr = [];
  }

  push(val) {
    this.arr.push(val);
  }

  get size() {
    return this.arr.length;
  }

  pop() {
    if (this.size === 0) {
      throw new Error("Trying to pop from empty stack");
    }

    return this.arr.pop();
  }

  peek() {
    if (this.size === 0) {
      throw new Error("Trying to peek at empty stack");
    }

    return this.arr[this.size - 1];
  }
}

const tests = [
  {
    heights: [2, 1, 5, 6, 2, 3],
    output: 10,
  },
  {
    heights: [2, 2, 5, 6, 2, 3],
    output: 12,
  },
  {
    heights: [2, 4],
    output: 4,
  },
  {
    heights: [2, 1, 2],
    output: 3,
  },
  {
    heights: [4, 2, 0, 3, 2, 5],
    output: 6,
  },
];

for (const { heights, output } of tests) {
  const result = largestRectangleArea(heights);

  let isValid = result === output;

  console.warn({ heights, result, output, isValid });
}
