/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (prices.length < 2) {
    return 0;
  }

  let min = prices[0];
  let max = prices[0];
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    const current = prices[i];
    if (current < min) {
      min = current;
      max = current;
    }

    if (current > max) {
      max = current;
      if (max - min > profit) {
        profit = max - min;
      }
    }
  }

  return profit;
};

const tests = [
  //   [7, 1, 5, 3, 6, 4],
  //   [7, 6, 4, 3, 1],
  [2, 4, 1],
];

for (const test of tests) {
  const result = maxProfit(test);
  console.warn({ test, result });
}
