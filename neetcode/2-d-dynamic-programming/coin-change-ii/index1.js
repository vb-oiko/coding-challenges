/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  const cache = new Array(amount + 1)
    .fill(0)
    .map(() => new Array(coins.length).fill(null));

  function dp(part, start) {
    if (part === 0) {
      return 1;
    }

    if (cache[part][start] !== null) {
      return cache[part][start];
    }

    let result = 0;
    for (let i = start; i < coins.length; i++) {
      const coin = coins[i];
      const rest = part - coin;

      if (rest < 0) {
        continue;
      }
      result += dp(rest, i);
    }

    cache[part][start] = result;
    return result;
  }

  coins.sort((a, b) => b - a);

  return dp(amount, 0);
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
