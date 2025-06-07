/**
 * @param {number[]} stoneValue
 * @return {string}
 */
var stoneGameIII = function (stoneValue) {
    var n = stoneValue.length;
    var cache = new Array(n + 1);
    cache[n] = 0;
    cache[n - 1] = stoneValue[n - 1];
    cache[n - 2] = Math.max(
        stoneValue[n - 2] + stoneValue[n - 1],
        stoneValue[n - 2] - cache[n - 1]
    );
    cache[n - 3] = Math.max(
        stoneValue[n - 3] - cache[n - 2],
        stoneValue[n - 3] + stoneValue[n - 2] - cache[n - 1],
        stoneValue[n - 3] + stoneValue[n - 2] + stoneValue[n - 1]
    );

    for (var i = n - 4; i >= 0; i--) {
        cache[i] = Math.max(
            stoneValue[i] - cache[i + 1],
            stoneValue[i] + stoneValue[i + 1] - cache[i + 2],
            stoneValue[i] + stoneValue[i + 1] + stoneValue[i + 2] - cache[i + 3]
        );
    }

    if (cache[0] === 0) {
        return 'Tie';
    }

    return cache[0] > 0 ? 'Alice' : 'Bob';
};

const tests = [
    // {
    //     stoneValue: [1, 2, 3, 7],
    //     output: 'Bob',
    // },
    // {
    //     stoneValue: [1, 2, 3, -9],
    //     output: 'Alice',
    // },
    // {
    //     stoneValue: [1, 2, 3, 6],
    //     output: 'Tie',
    // },
    {
        stoneValue: [-1, -2, -3],
        output: 'Tie',
    },
];

for (const { stoneValue, output } of tests) {
    const result = stoneGameIII(stoneValue);
    console.dir({ stoneValue, result, output });
}
