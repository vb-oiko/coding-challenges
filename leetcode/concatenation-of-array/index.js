/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getConcatenation = function (nums) {
    var n = nums.length;
    var i;

    for (i = 0; i < n; i++) {
        nums.push(nums[i]);
    }

    return nums;
};

const tests = [
    { input: { nums: [1, 2, 1] }, output: [1, 2, 1, 1, 2, 1] },
    { input: { nums: [1, 3, 2, 1] }, output: [1, 3, 2, 1, 1, 3, 2, 1] },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = getConcatenation(...Object.values(test.input));
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
