/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.length = 0;
  this.list = new List();
  this.map = new Map();
  this.index = 0;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) {
    return -1;
  }

  const node = this.map.get(key);
  this.list.remove(node);
  node.prev = null;
  node.next = null;
  this.list.addToStart(node);

  return node.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const oldNode = this.map.get(key);
  if (oldNode) {
    this.list.remove(oldNode);
  } else {
    if (this.length === this.capacity) {
      this.map.delete(this.list.tail.key);
      this.list.remove(this.list.tail);
    } else {
      this.length++;
    }
  }

  const newNode = new Node(key, value);
  this.map.set(key, newNode);
  this.list.addToStart(newNode);
};

class Node {
  constructor(key, value, prev = null, next = null) {
    this.key = key;
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class List {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToStart(node) {
    const oldHead = this.head;
    this.head = node;
    this.head.prev = null;
    this.head.next = oldHead;
    if (oldHead) {
      oldHead.prev = this.head;
    }
    if (this.tail === null) {
      this.tail = node;
    }
  }

  remove(node) {
    const prev = node.prev;
    const next = node.next;

    if (node === this.head) {
      this.head = next;
    }

    if (node === this.tail) {
      this.tail = prev;
    }

    if (prev) {
      prev.next = next;
    }

    if (next) {
      next.prev = prev;
    }
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const tests = [
  //   {
  //     commands: [
  //       "LRUCache",
  //       "put",
  //       "put",
  //       "get",
  //       "put",
  //       "get",
  //       "put",
  //       "get",
  //       "get",
  //       "get",
  //     ],
  //     params: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
  //     output: [null, null, null, 1, null, -1, null, -1, 3, 4],
  //   },
  //   {
  //     commands: ["LRUCache", "get", "put", "get", "put", "put", "get", "get"],
  //     params: [[2], [2], [2, 6], [1], [1, 5], [1, 2], [1], [2]],
  //     output: [null, -1, null, -1, null, null, 2, 6],
  //   },
  //   {
  //     commands: ["LRUCache", "put", "put", "put", "put", "get", "get"],
  //     params: [[2], [2, 1], [1, 1], [2, 3], [4, 1], [1], [2]],
  //     output: [null, null, null, null, null, -1, 3],
  //   },
  {
    commands: [
      "LRUCache",
      "put",
      "put",
      "put",
      "put",
      "put",
      "get",
      "put",
      "get",
      "get",
      "put",
      "get",
      "put",
      "put",
      "put",
      "get",
      "put",
      "get",
      "get",
      "get",
      "get",
      "put",
      "put",
      "get",
      "get",
      "get",
      "put",
      "put",
      "get",
      "put",
      "get",
      "put",
      "get",
      "get",
      "get",
      "put",
      "put",
      "put",
      "get",
      "put",
      "get",
      "get",
      "put",
      "put",
      "get",
      "put",
      "put",
      "put",
      "put",
      "get",
      "put",
      "put",
      "get",
      "put",
      "put",
      "get",
      "put",
      "put",
      "put",
      "put",
      "put",
      "get",
      "put",
      "put",
      "get",
      "put",
      "get",
      "get",
      "get",
      "put",
      "get",
      "get",
      "put",
      "put",
      "put",
      "put",
      "get",
      "put",
      "put",
      "put",
      "put",
      "get",
      "get",
      "get",
      "put",
      "put",
      "put",
      "get",
      "put",
      "put",
      "put",
      "get",
      "put",
      "put",
      "put",
      "get",
      "get",
      "get",
      "put",
      "put",
      "put",
      "put",
      "get",
      "put",
      "put",
      "put",
      "put",
      "put",
      "put",
      "put",
    ],
    params: [
      [10],
      [10, 13],
      [3, 17],
      [6, 11],
      [10, 5],
      [9, 10],
      [13],
      [2, 19],
      [2],
      [3],
      [5, 25],
      [8],
      [9, 22],
      [5, 5],
      [1, 30],
      [11],
      [9, 12],
      [7],
      [5],
      [8],
      [9],
      [4, 30],
      [9, 3],
      [9],
      [10],
      [10],
      [6, 14],
      [3, 1],
      [3],
      [10, 11],
      [8],
      [2, 14],
      [1],
      [5],
      [4],
      [11, 4],
      [12, 24],
      [5, 18],
      [13],
      [7, 23],
      [8],
      [12],
      [3, 27],
      [2, 12],
      [5],
      [2, 9],
      [13, 4],
      [8, 18],
      [1, 7],
      [6],
      [9, 29],
      [8, 21],
      [5],
      [6, 30],
      [1, 12],
      [10],
      [4, 15],
      [7, 22],
      [11, 26],
      [8, 17],
      [9, 29],
      [5],
      [3, 4],
      [11, 30],
      [12],
      [4, 29],
      [3],
      [9],
      [6],
      [3, 4],
      [1],
      [10],
      [3, 29],
      [10, 28],
      [1, 20],
      [11, 13],
      [3],
      [3, 12],
      [3, 8],
      [10, 9],
      [3, 26],
      [8],
      [7],
      [5],
      [13, 17],
      [2, 27],
      [11, 15],
      [12],
      [9, 19],
      [2, 15],
      [3, 16],
      [1],
      [12, 17],
      [9, 1],
      [6, 19],
      [4],
      [5],
      [5],
      [8, 1],
      [11, 7],
      [5, 2],
      [9, 28],
      [1],
      [2, 2],
      [7, 4],
      [4, 22],
      [7, 24],
      [9, 26],
      [13, 28],
      [11, 26],
    ],
    output: [
      null,
      null,
      null,
      null,
      null,
      null,
      -1,
      null,
      19,
      17,
      null,
      -1,
      null,
      null,
      null,
      -1,
      null,
      -1,
      5,
      -1,
      12,
      null,
      null,
      3,
      5,
      5,
      null,
      null,
      1,
      null,
      -1,
      null,
      30,
      5,
      30,
      null,
      null,
      null,
      -1,
      null,
      -1,
      24,
      null,
      null,
      18,
      null,
      null,
      null,
      null,
      -1,
      null,
      null,
      18,
      null,
      null,
      -1,
      null,
      null,
      null,
      null,
      null,
      18,
      null,
      null,
      -1,
      null,
      4,
      29,
      30,
      null,
      12,
      -1,
      null,
      null,
      null,
      null,
      29,
      null,
      null,
      null,
      null,
      17,
      22,
      18,
      null,
      null,
      null,
      -1,
      null,
      null,
      null,
      20,
      null,
      null,
      null,
      -1,
      18,
      18,
      null,
      null,
      null,
      null,
      20,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
];

const { expect } = require("../../../utils");

for (const { commands, params, output } of tests) {
  let cache;

  function execute(command, params) {
    switch (command) {
      case "LRUCache":
        const [capacity] = params;
        cache = new LRUCache(capacity);
        return null;

      case "put":
        const [key, value] = params;
        cache.put(key, value);
        return null;

      case "get":
        const [key1] = params;
        return cache.get(key1);

      default:
        throw new Error("Unknown command");
    }
  }

  let results = [];

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    const param = params[i];
    const result = execute(command, param);
    results.push(result);
    // console.warn({
    //   command: `${command} (${param})`,

    //   map: cache.map,
    //   result,
    // });
  }

  const isValid = expect.array(results).toEqual(output);

  //   console.warn({ commands, params, results, output, isValid });
  console.warn({ isValid });
}
