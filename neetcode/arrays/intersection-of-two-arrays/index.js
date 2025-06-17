/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
    var set = new Set(nums1);

    var result = new Set();

    for (var i = 0; i < nums2.length; i++) {
        if (set.has(nums2[i])) {
            result.add(nums2[i]);
        }
    }

    return [...result];
};

const tests = [
    { input: { nums1: [1, 2, 2, 1], nums2: [2, 2] }, output: [2] },
    { input: { nums1: [4, 9, 5], nums2: [9, 4, 9, 8, 4] }, output: [9, 4] },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = intersection(...Object.values(test.input));
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
