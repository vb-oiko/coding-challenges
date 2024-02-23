/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const n = prices.length;

  const sold = new Array(n);
  const held = new Array(n);
  const reset = new Array(n);

  sold[0] = -Infinity;
  held[0] = -prices[0];
  reset[0] = 0;

  for (let i = 1; i < n; i++) {
    sold[i] = held[i - 1] + prices[i];
    held[i] = Math.max(held[i - 1], reset[i - 1] - prices[i]);
    reset[i] = Math.max(reset[i - 1], sold[i - 1]);
  }

  return Math.max(sold[n - 1], reset[n - 1]);
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
