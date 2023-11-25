/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
  if (n === 0) {
    return tasks.length;
  }

  const map = new Map();
  for (const task of tasks) {
    map.set(task, map.get(task) ? map.get(task) + 1 : 1);
  }

  const q = new Queue();
  const heap = new MaxPriorityQueue();

  for (const val of map.values()) {
    heap.enqueue(val);
  }

  let time = 1;

  while (heap.size() > 0 || q.size() > 0) {
    while (q.size() > 0 && q.front().time === time) {
      const value = q.pop().value;
      if (value) {
        heap.enqueue(value);
      }
    }

    if (heap.size() === 0) {
      time += 1;
      continue;
    }

    const value = heap.dequeue().element;

    if (value === 1) {
      time += 1;
      continue;
    }

    q.push({ value: value - 1, time: time + n + 1 });
    time += 1;
  }

  return time - 1;
};

const { Queue } = require("@datastructures-js/queue");
var { MaxPriorityQueue } = require("@datastructures-js/priority-queue");

const tests = [
  {
    tasks: ["A", "A", "A", "B", "B", "B"],
    n: 2,
    output: 8,
  },

  {
    tasks: ["A", "A", "A", "B", "B", "B"],
    n: 0,
    output: 6,
  },

  {
    tasks: ["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"],
    n: 2,
    output: 16,
  },
];

for (const { tasks, n, output } of tests) {
  const result = leastInterval(tasks, n);
  const isValid = result === output;
  console.warn({ tasks, n, result, output, isValid });
}
