/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  const mpq = new MaxPriorityQueue();

  for (const stone of stones) {
    mpq.enqueue(stone);
  }

  while (mpq.size() > 1) {
    const a = mpq.dequeue().element;
    const b = mpq.dequeue().element;

    mpq.enqueue(Math.abs(a - b));
  }

  return mpq.front().element;
};

var { MaxPriorityQueue } = require("@datastructures-js/priority-queue");

const tests = [
  { stones: [2, 7, 4, 1, 8, 1], output: 1 },
  { stones: [1], output: 1 },
];

for (const { stones, output } of tests) {
  const result = lastStoneWeight(stones);
  const isValid = result === output;

  console.warn({ stones, result, output, isValid });
}
