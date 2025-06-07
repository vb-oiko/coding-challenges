/**
 * @param {number[]} stoneValue
 * @return {string}
 */
var stoneGameIII = function (stoneValue) {
    var n = stoneValue.length;
    var cache = new Array(n).fill(null);
    var max;

    function dp(i) {
        if (i >= n) {
            return 0;
        }

        if (cache[i] !== null) {
            return cache[i];
        }

        var moves = [];
        if (i < n) {
            moves.push(stoneValue[i] - dp(i + 1));
        }
        if (i + 1 < n) {
            moves.push(stoneValue[i] + stoneValue[i + 1] - dp(i + 2));
        }
        if (i + 2 < n) {
            moves.push(
                stoneValue[i] +
                    stoneValue[i + 1] +
                    stoneValue[i + 2] -
                    dp(i + 3)
            );
        }

        cache[i] = Math.max(...moves);
        return cache[i];
    }

    var result = dp(0);
    if (result === 0) {
        return 'Tie';
    }

    return result > 0 ? 'Alice' : 'Bob';
};

const tests = [
    {
        stoneValue: [1, 2, 3, 7],
        output: 'Bob',
    },
    {
        stoneValue: [1, 2, 3, -9],
        output: 'Alice',
    },
    {
        stoneValue: [1, 2, 3, 6],
        output: 'Tie',
    },
];

for (const { stoneValue, output } of tests) {
    const result = stoneGameIII(stoneValue);
    console.dir({ stoneValue, result, output });
}
