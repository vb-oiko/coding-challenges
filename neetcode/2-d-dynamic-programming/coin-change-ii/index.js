/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  const cache = new Array(amount + 1)
    .fill(0)
    .map(() => new Array(coins.length).fill(0));

  for (let i = 0; i < coins.length; i++) {
    cache[0][i] = 1;
  }

  coins.sort((a, b) => a - b);

  for (let coinIndex = 0; coinIndex < coins.length; coinIndex++) {
    const coin = coins[coinIndex];

    for (let part = 1; part <= amount; part++) {
      const rest = part - coin;
      if (coinIndex === 0) {
        cache[part][coinIndex] =
          rest >= 0 ? cache[rest][coinIndex] : cache[part][coinIndex];
        continue;
      }

      cache[part][coinIndex] =
        rest >= 0
          ? cache[part][coinIndex - 1] + cache[rest][coinIndex]
          : cache[part][coinIndex - 1];
    }
  }

  return cache[amount][coins.length - 1];
};

const tests = [
  {
    amount: 400,
    coins: [1, 2, 5],
    output: 4,
  },
];

for (const { amount, coins, output } of tests) {
  const result = change(amount, coins);
  console.warn({ amount, coins, result, output });
}
