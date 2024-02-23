/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const n = prices.length;

  let plusOne = new Array(n + 1).fill(0);
  let plusTwo = new Array(n + 1).fill(0);

  for (let index = n - 1; index >= 0; index--) {
    const curr = new Array(n + 1);
    for (let buyIndex = 0; buyIndex <= n; buyIndex++) {
      const curPrice = prices[index];
      const buyPrice = buyIndex === n ? null : prices[buyIndex];

      const hold = plusOne[buyIndex];

      const sell =
        buyPrice !== null && curPrice > buyPrice
          ? curPrice - buyPrice + plusTwo[n]
          : 0;

      const buy = buyPrice === null ? plusOne[index] : 0;

      curr[buyIndex] = Math.max(hold, sell, buy);
    }

    plusTwo = plusOne;
    plusOne = curr;
  }

  return plusOne[n];
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
