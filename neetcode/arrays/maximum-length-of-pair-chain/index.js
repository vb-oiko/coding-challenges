/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function (pairs) {
    pairs.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        }

        return a[1] - b[1];
    });

    var n = pairs.length;

    var dp = new Array(n).fill(1);
    var max;
    var j;
    var count;

    for (var i = 1; i < n; i++) {
        max = 1;
        for (j = i - 1; j >= 0; j--) {
            if (j < max - 1) {
                break;
            }
            count = pairs[i][0] <= pairs[j][1] ? dp[j] - 1 : dp[j] + 1;
            if (count > max) {
                max = count;
            }
        }
        dp[i] = max;
    }

    console.dir({ dp });

    return dp[n - 1];
};

const tests = [
    {
        input: {
            pairs: [
                [1, 2],
                [2, 3],
                [3, 4],
            ],
        },
        output: 2,
    },
    {
        input: {
            pairs: [
                [1, 2],
                [7, 8],
                [4, 5],
            ],
        },
        output: 3,
    },
    {
        input: {
            pairs: [
                [-6, 9],
                [1, 6],
                [8, 10],
                [-1, 4],
                [-6, -2],
                [-9, 8],
                [-5, 3],
                [0, 3],
            ],
        },
        output: 3,
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = findLongestChain(...Object.values(test.input));
    if (!deepEqual(result, test.output)) {
        console.log('❌ fail:');
        console.dir(
            { ...test.input, result, expected: test.output },
            { depth: null }
        );
    } else {
        console.log('✅ pass');
    }
}
