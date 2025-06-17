// greedy

/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function (pairs) {
    var n = pairs.length;

    if (n === 1) {
        return 1;
    }

    pairs.sort((a, b) => {
        return a[1] - b[1];
    });

    var cur = -Infinity;
    var i;
    var result = 0;

    for (i = 0; i < n; i++) {
        if (pairs[i][0] > cur) {
            cur = pairs[i][1];
            result++;
        }
    }

    return result;
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
