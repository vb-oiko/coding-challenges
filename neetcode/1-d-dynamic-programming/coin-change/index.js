/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const cache = new Array(amount + 1).fill(null);

  function change(x) {
    if (x === 0) {
      return 0;
    }

    if (cache[x] !== null) {
      return cache[x];
    }

    const results = [];
    for (const coin of coins) {
      if (x >= coin) {
        const option = change(x - coin);
        if (option >= 0) {
          results.push(option);
        }
      }
    }

    if (results.length === 0) {
      cache[x] = -1;
      return -1;
    }

    cache[x] = 1 + Math.min(...results);
    return cache[x];
  }

  return change(amount);
};

const tests = [
  {
    coins: [1, 2, 5],
    amount: 11,
    output: 3,
  },
  {
    coins: [2],
    amount: 3,
    output: -1,
  },
  {
    coins: [1],
    amount: 0,
    output: 0,
  },
];

for (const { coins, amount, output } of tests) {
  const result = coinChange(coins, amount);
  console.warn({ coins, amount, result, output });
}
