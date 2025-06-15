/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    var n = prices.length;
    var profit = 0;
    var buy = prices[0];
    var price;

    for (var i = 1; i < n; i++) {
        price = prices[i];

        if (price - buy > profit) {
            profit = price - buy;
        }

        if (price < buy) {
            buy = price;
        }
    }

    return profit;
};

const tests = [
    {
        prices: [7, 1, 5, 3, 6, 4],
        output: 5,
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
