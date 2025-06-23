/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSneakyNumbers = function (nums) {
    var n = nums.length;
    var map = new Array(n - 2).fill(0);
    var result = [];

    for (var i = 0; i < n; i++) {
        map[nums[i]]++;
        if (map[nums[i]] === 2) {
            result.push(nums[i]);
        }
    }

    return result;
};

const tests = [{ input: { nums: [0, 3, 2, 1, 3, 2] }, output: [3, 2] }];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = getSneakyNumbers(...Object.values(test.input));
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
