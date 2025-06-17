// greedy

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    var n = nums.length;
    var l = 0;
    var r = 0;
    var result = 0;
    var nextR;

    while (r < n - 1) {
        nextR = r;
        for (var i = l; i <= r; i++) {
            if (nums[i] + i > nextR) {
                nextR = nums[i] + i;
            }
        }
        l = r + 1;
        r = nextR;
        result++;
    }

    return result;
};

const tests = [
    { input: { nums: [2, 3, 1, 1, 4] }, output: 2 },
    { input: { nums: [2, 3, 0, 1, 4] }, output: 2 },
    { input: { nums: [3, 0, 2, 0, 3, 1] }, output: 3 },
    { input: { nums: [3, 0, 2, 5, 3, 1] }, output: 2 },
    { input: { nums: [0] }, output: 0 },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = jump(...Object.values(test.input));
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
