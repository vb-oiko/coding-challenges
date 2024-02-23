/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const n = prices.length;

  const cache = Array.from({ length: n + 1 }, () =>
    new Array(n + 1).fill(null)
  );

  function dp(index, buyIndex) {
    if (index >= n) {
      return 0;
    }

    if (cache[index][buyIndex] !== null) {
      return cache[index][buyIndex];
    }

    const curPrice = prices[index];
    const buyPrice = buyIndex === n ? null : prices[buyIndex];

    const hold = dp(index + 1, buyIndex);

    const sell =
      buyPrice !== null && curPrice > buyPrice
        ? curPrice - buyPrice + dp(index + 2, n)
        : 0;

    const buy = buyPrice === null ? dp(index + 1, index) : 0;

    cache[index][buyIndex] = Math.max(hold, sell, buy);
    return cache[index][buyIndex];
  }

  return dp(0, n);
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
