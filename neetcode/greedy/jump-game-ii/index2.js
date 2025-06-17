// dp

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    var n = nums.length;
    var dp = new Array(n);
    dp[0] = 0;
    var min;

    for (var i = 1; i < n; i++) {
        min = Infinity;
        for (var j = 0; j < i; j++) {
            if (nums[j] + j >= i && dp[j] + 1 < min) {
                min = dp[j] + 1;
            }
        }
        dp[i] = min;
    }

    return dp[n - 1];
};

const tests = [
    { input: { nums: [2, 3, 1, 1, 4] }, output: 2 },
    { input: { nums: [2, 3, 0, 1, 4] }, output: 2 },
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
