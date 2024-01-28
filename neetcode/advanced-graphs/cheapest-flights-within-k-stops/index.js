/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  let prices = new Array(n).fill(Infinity);
  prices[src] = 0;

  for (let i = 0; i <= k; i++) {
    const nextPrices = [...prices];
    for (const [src, dst, price] of flights) {
      if (prices[src === Infinity]) {
        continue;
      }

      nextPrices[dst] = Math.min(nextPrices[dst], prices[src] + price);
    }

    prices = nextPrices;
  }

  return prices[dst] === Infinity ? -1 : prices[dst];
};

const tests = [
  {
    n: 4,
    flights: [
      [0, 1, 100],
      [1, 2, 100],
      [2, 0, 100],
      [1, 3, 600],
      [2, 3, 200],
    ],
    src: 0,
    dst: 3,
    k: 1,
    output: 700,
  },
  {
    n: 3,
    flights: [
      [0, 1, 100],
      [1, 2, 100],
      [0, 2, 500],
    ],
    src: 0,
    dst: 2,
    k: 1,
    output: 200,
  },
  {
    n: 4,
    flights: [
      [0, 3, 59],
      [2, 0, 83],
      [2, 3, 32],
      [0, 2, 97],
      [3, 1, 16],
      [1, 3, 16],
    ],
    src: 3,
    dst: 0,
    k: 3,
    output: -1,
  },
  {
    n: 4,
    flights: [
      [0, 1, 1],
      [0, 2, 5],
      [1, 2, 1],
      [2, 3, 1],
    ],
    src: 0,
    dst: 3,
    k: 1,
    output: 6,
  },
];

for (const { n, flights, src, dst, k, output } of tests) {
  const result = findCheapestPrice(n, flights, src, dst, k);

  console.warn({
    n,
    flights,
    src,
    dst,
    k,
    result,
    output,
  });
}
