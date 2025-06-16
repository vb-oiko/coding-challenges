/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    intervals.sort((a, b) => a[0] - b[0]);

    for (var i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= intervals[i - 1][1]) {
            intervals[i] = [
                intervals[i - 1][0],
                Math.max(intervals[i - 1][1], intervals[i][1]),
            ];

            intervals[i - 1] = null;
        }
    }

    return intervals.filter(Boolean);
};

const tests = [
    {
        input: {
            intervals: [
                [1, 3],
                [2, 6],
                [8, 10],
                [15, 18],
            ],
        },
        output: [
            [1, 6],
            [8, 10],
            [15, 18],
        ],
    },
    {
        input: {
            intervals: [
                [1, 4],
                [4, 5],
            ],
        },
        output: [[1, 5]],
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = merge(...Object.values(test.input));
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
