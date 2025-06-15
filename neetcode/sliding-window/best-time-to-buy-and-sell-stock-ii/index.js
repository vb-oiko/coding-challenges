/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    var profit = 0;
    var n = prices.length;

    for (var i = 1; i < n; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }

    return profit;
};

const tests = [
    {
        prices: [7, 1, 5, 3, 6, 4],
        output: 7,
    },
    {
        prices: [1, 2, 3, 4, 5],
        output: 4,
    },
    {
        prices: [7, 6, 4, 3, 1],
        output: 0,
    },
];

for (const { prices, output } of tests) {
    const result = maxProfit(prices);
    console.dir({ prices, result, output });
}
