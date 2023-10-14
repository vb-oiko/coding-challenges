var MinStack = function () {
  this.arr = [];
  this.deque = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.arr.push(val);
  const curIndex = this.arr.length - 1;
  const topIndexInDeque = this.deque[this.deque.length - 1];

  if (this.deque.length === 0 || val < this.arr[topIndexInDeque]) {
    this.deque.push(curIndex);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  if (this.arr.length === 0) {
    return null;
  }

  const curIndex = this.arr.length - 1;
  const topIndexInDeque = this.deque[this.deque.length - 1];

  if (curIndex === topIndexInDeque) {
    this.deque.pop();
  }

  this.arr.pop();
  return null;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.arr.length > 0 ? this.arr[this.arr.length - 1] : null;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  const topIndexInDeque = this.deque[this.deque.length - 1];

  return this.arr[topIndexInDeque];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

const tests = [
  {
    commands: [
      "MinStack",
      "push",
      "push",
      "push",
      "getMin",
      "pop",
      "top",
      "getMin",
    ],
    values: [[], [-2], [0], [-3], [], [], [], []],
    output: [null, null, null, null, -3, null, 0, -2],
  },
];

for (const { commands, values, output } of tests) {
  let result = new Array();
  let stack;

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    const value = values[i].length === 0 ? null : values[i][0];

    // console.warn({ command, value, stack, result });

    switch (command) {
      case "MinStack":
        stack = new MinStack();
        result.push(null);
        break;

      case "push":
        stack.push(value);
        result.push(null);
        break;

      case "getMin":
        result.push(stack.getMin());
        break;

      case "pop":
        result.push(stack.pop());
        break;

      case "top":
        result.push(stack.top());
        break;

      case "getMin":
        result.push(stack.getMin());
        break;

      default:
        break;
    }

    // console.warn({ command, value, stack, result });
  }

  let isValid = true;

  for (let i = 0; i < output.length; i++) {
    if (output[i] !== result[i]) {
      isValid = false;
    }
  }

  console.warn({ commands, values, output, result, isValid });
}
