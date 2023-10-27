var TimeMap = function () {
  this.map = new Map();
};

/**
 * @param {string} key
 * @param {string} value
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
  const values = this.map.get(key) ?? [];

  const nearestLowerIndex = nearestIndexOf(values, timestamp);

  values.splice(nearestLowerIndex + 1, 0, {
    value,
    timestamp,
  });

  this.map.set(key, values);
};

/**
 * @param {string} key
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
  const values = this.map.get(key) ?? [];
  if (values.length === 0) {
    return "";
  }

  const nearestLowerIndex = nearestIndexOf(values, timestamp);

  if (nearestLowerIndex < 0) {
    return "";
  }

  return values[nearestLowerIndex].value;
};

/**
 * @param {{timestamp: number, value: string}[]} values
 * @param {number} timestamp
 * @return {number}
 */
function nearestIndexOf(values, timestamp) {
  if (values.length === 0) {
    return -1;
  }

  if (timestamp < values[0].timestamp) {
    return -1;
  }

  let left = 0;
  let right = values.length - 1;
  let mid = (left + right) >>> 1;

  if (timestamp < values[left].timestamp) {
    return left - 1;
  }

  if (timestamp >= values[right].timestamp) {
    return right;
  }

  while (right - left > 1) {
    if (values[mid].timestamp === timestamp) {
      return mid;
    }

    if (values[mid].timestamp <= timestamp) {
      left = mid;
    }

    if (values[mid].timestamp >= timestamp) {
      right = mid;
    }

    mid = (left + right) >>> 1;
  }

  if (timestamp < values[left].timestamp) {
    return left - 1;
  }

  if (timestamp > values[right].timestamp) {
    return right;
  }

  return left;
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */

const tests = [
  {
    commands: ["TimeMap", "set", "get", "get", "set", "get", "get"],
    values: [
      [],
      ["foo", "bar", 1],
      ["foo", 1],
      ["foo", 3],
      ["foo", "bar2", 4],
      ["foo", 4],
      ["foo", 5],
    ],
    output: [null, null, "bar", "bar", null, "bar2", "bar2"],
  },
];

const { expect } = require("../../../utils");

for (const { commands, values, output } of tests) {
  let result = [];

  const timeMap = new TimeMap();

  for (let i = 0; i < commands.length; i++) {
    if (commands[i] === "TimeMap") {
      result.push(null);
    }

    if (commands[i] === "set") {
      const [key, value, timestamp] = values[i];
      timeMap.set(key, value, timestamp);
      result.push(null);
    }

    if (commands[i] === "get") {
      const [key, timestamp] = values[i];
      const value = timeMap.get(key, timestamp);
      result.push(value);
    }
  }

  let isValid = expect.array(result).toEqual(output);

  console.warn({ commands, values, result, output, isValid });
}
