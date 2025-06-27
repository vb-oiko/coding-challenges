/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    function dp(l, r) {
        if (l > r) {
            return -1;
        }

        if (nums[l] === target) {
            return l;
        }

        if (nums[r] === target) {
            return r;
        }

        if (nums[l] < nums[r] && (target < nums[l] || target > nums[r])) {
            return -1;
        }

        var mid = Math.floor((l + r) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        var left = dp(l, mid - 1);

        if (left !== -1) {
            return left;
        }

        return dp(mid + 1, r);
    }

    return dp(0, nums.length - 1);
};

const tests = [
    { input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 }, output: 4 },
    { input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 }, output: -1 },
    { input: { nums: [1], target: 0 }, output: -1 },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = search(...Object.values(test.input));
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
