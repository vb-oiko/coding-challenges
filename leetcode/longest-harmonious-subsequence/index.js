/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function (nums) {
    var n = nums.length;
    var map = new Map();

    for (var num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }

    var keys = Array.from(map.keys());
    n = keys.length;

    if (n === 1) {
        return 0;
    }

    keys.sort((a, b) => a - b);

    var max = 0;
    var cur;

    for (var i = 1; i < n; i++) {
        if (keys[i] - keys[i - 1] > 1) {
            continue;
        }
        cur = map.get(keys[i]) + map.get(keys[i - 1]);
        if (cur > max) {
            max = cur;
        }
    }

    return max;
};

const tests = [
    {
        input: { nums: [1, 3, 2, 2, 5, 2, 3, 7] },
        output: 5,
    },
    {
        input: { nums: [1, 2, 3, 4] },
        output: 2,
    },
    {
        input: { nums: [1, 1, 1, 1] },
        output: 0,
    },
    {
        input: { nums: [1, 2, 2, 1] },
        output: 4,
    },
    {
        input: { nums: [1, 3, 5, 7, 9, 11, 13, 15, 17] },
        output: 0,
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = findLHS(...Object.values(test.input));
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
