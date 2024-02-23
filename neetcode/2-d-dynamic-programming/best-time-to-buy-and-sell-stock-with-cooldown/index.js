/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const n = prices.length;

  let prevSold = -Infinity;
  let prevHeld = -prices[0];
  let prevReset = 0;

  for (let i = 1; i < n; i++) {
    const sold = prevHeld + prices[i];
    const held = Math.max(prevHeld, prevReset - prices[i]);
    const reset = Math.max(prevReset, prevSold);

    prevSold = sold;
    prevHeld = held;
    prevReset = reset;
  }

  return Math.max(prevSold, prevReset);
};

const tests = [
  {
    prices: [1, 2, 3, 0, 2],
    output: 3,
  },
  {
    prices: [1, 2, 4],
    output: 3,
  },
];

for (const { prices, output } of tests) {
  const result = maxProfit(prices);
  console.warn({ prices, result, output });
}
