/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    var map = {};
    var j;

    for (var i = 0; i < nums.length; i++) {
        j = map[nums[i]];

        if (j === undefined) {
            map[target - nums[i]] = i;
            continue;
        }

        return [j, i];
    }
};

const tests = [
    {
        input: { nums: [2, 7, 11, 15], target: 9 },
        output: [0, 1],
    },
    {
        input: { nums: [3, 2, 4], target: 6 },
        output: [1, 2],
    },
    {
        input: { nums: [3, 3], target: 6 },
        output: [0, 1],
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = twoSum(...Object.values(test.input));
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
