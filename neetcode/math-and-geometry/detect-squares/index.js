var DetectSquares = function () {
  this.xMap = new Map();
  this.yMap = new Map();
};

/**
 * @param {number[]} point
 * @return {void}
 */
DetectSquares.prototype.add = function (point) {
  const [x, y] = point;

  const yMap = this.xMap.get(x) || new Map();
  const yCount = yMap.get(y) || 0;
  yMap.set(y, yCount + 1);
  this.xMap.set(x, yMap);

  const xMap = this.yMap.get(y) || new Map();
  const xCount = xMap.get(x) || 0;
  xMap.set(x, xCount + 1);
  this.yMap.set(y, xMap);
};

/**
 * @param {number[]} point
 * @return {number}
 */
DetectSquares.prototype.count = function (point) {
  const [x, y] = point;
  let result = 0;

  const ys = this.getByX(x);
  const xs = this.getByY(y);
  if (!xs) {
    return 0;
  }

  if (!ys) {
    return 0;
  }

  for (const [dx, count] of xs) {
    const len = Math.abs(x - dx);

    if (len === 0) {
      continue;
    }

    result += count * this.hasPoints(dx, y - len) * this.hasPoints(x, y - len);
    result += count * this.hasPoints(dx, y + len) * this.hasPoints(x, y + len);
  }

  return result;
};

/**
 * @param {number} x
 * @return {Iterable<[number,number]> | null}
 */
DetectSquares.prototype.getByX = function (x) {
  const yMap = this.xMap.get(x);
  if (!yMap) {
    return null;
  }

  return yMap.entries();
};

/**
 * @param {number} y
 * @return {Iterable<[number,number]> | null }
 */
DetectSquares.prototype.getByY = function (y) {
  const xMap = this.yMap.get(y);
  if (!xMap) {
    return null;
  }

  return xMap.entries();
};

/**
 * @param {number} x
 * @param {number} y
 * @return {boolean }
 */
DetectSquares.prototype.hasPoints = function (x, y) {
  const yMap = this.xMap.get(x);
  if (!yMap) {
    return 0;
  }

  return yMap.has(y) ? yMap.get(y) : 0;
};

/**
 * Your DetectSquares object will be instantiated and called as such:
 * var obj = new DetectSquares()
 * obj.add(point)
 * var param_2 = obj.count(point)
 */

const tests = [
  {
    commands: [
      "DetectSquares",
      "add",
      "add",
      "add",
      "count",
      "count",
      "add",
      "count",
    ],
    values: [
      [],
      [[3, 10]],
      [[11, 2]],
      [[3, 2]],
      [[11, 10]],
      [[14, 8]],
      [[11, 2]],
      [[11, 10]],
    ],
    output: [null, null, null, null, 1, 0, null, 2],
  },
];

for (const { commands, values, output } of tests) {
  const detectSquares = new DetectSquares();
  const results = [];
  for (let i = 0; i < commands.length; i++) {
    switch (commands[i]) {
      case "DetectSquares":
        results.push(null);
        break;

      case "add":
        detectSquares.add(values[i][0]);
        results.push(null);
        break;

      case "count":
        results.push(detectSquares.count(values[i][0]));
        break;

      default:
        break;
    }
  }
  console.log({ commands, values, results, output });
}
