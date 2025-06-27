/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    var n = nums.length;

    if (n === 0) {
        return [-1, -1];
    }

    if (n === 1) {
        return nums[0] === target ? [0, 0] : [-1, -1];
    }

    if (target < nums[0] || target > nums[n - 1]) {
        return [-1, -1];
    }

    var left = nums[0] === target ? 0 : -1;
    var right = nums[n - 1] === target ? n - 1 : -1;

    if (left !== -1 && right !== -1) {
        return [left, right];
    }

    function findLeft(l, r) {
        if (l >= r) {
            return -1;
        }

        if (nums[r] === target && nums[r - 1] < target) {
            return r;
        }

        if (r - l === 1) {
            return -1;
        }

        var mid = Math.floor((l + r) / 2);

        if (nums[mid] < target) {
            return findLeft(mid, r);
        }

        return findLeft(l, mid);
    }

    left = left === -1 ? findLeft(0, n - 1) : left;

    function findRight(l, r) {
        if (l >= r) {
            return -1;
        }

        if (nums[l] === target && nums[l + 1] > target) {
            return l;
        }

        if (r - l === 1) {
            return -1;
        }

        var mid = Math.floor((l + r) / 2);

        if (nums[mid] > target) {
            return findRight(l, mid);
        }

        return findRight(mid, r);
    }

    right = right === -1 ? findRight(0, n - 1) : right;

    return [left, right];
};

const tests = [
    { input: { nums: [5, 7, 7, 8, 8, 10], target: 8 }, output: [3, 4] },
    { input: { nums: [5, 7, 7, 8, 8, 10], target: 6 }, output: [-1, -1] },
    { input: { nums: [], target: 0 }, output: [-1, -1] },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = searchRange(...Object.values(test.input));
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
