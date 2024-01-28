/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  const n = cost.length;
  if (n == 2) {
    return Math.min(cost[0], cost[1]);
  }
  let totals = new Array(n);
  totals[0] = cost[0];
  totals[1] = cost[1];

  for (let i = 2; i < n; i++) {
    totals[i] = Math.min(totals[i - 1] + cost[i], totals[i - 2] + cost[i]);
  }

  return Math.min(totals[n - 2], totals[n - 1]);
};

const tests = [
  {
    cost: [10, 15, 20],
    output: 15,
  },
  {
    cost: [1, 100, 1, 1, 1, 100, 1, 1, 100, 1],
    output: 6,
  },
];

for (const { cost, output } of tests) {
  const result = minCostClimbingStairs(cost);
  console.warn({ cost, result, output });
}
