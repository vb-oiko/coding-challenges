/**
 * @param {number[]} nums
 * @return {number}
 */
var minSwaps = function (nums) {
    var n = nums.length;
    var ones = 0;
    var zeros = 0;
    var i;
    for (i = 0; i < n; i++) {
        if (nums[i] % 2 === 0) {
            zeros++;
            continue;
        }

        ones++;
    }

    if (Math.abs(ones - zeros) > 1) {
        return -1;
    }

    function countSwaps(first) {
        var misplaced = [];
        for (i = 0; i < n; i++) {
            misplaced[i] = nums[i] % 2 !== first;
            first = 1 - first;
        }

        var q = [];
        var first = 0;
        var result = 0;
        for (i = 0; i < n; i++) {
            if (!misplaced[i]) {
                continue;
            }

            // queue is empty or current misplace is the same as first in the queue
            if (first === q.length || q[first].value === nums[i] % 2) {
                q.push({ value: nums[i] % 2, index: i });
                continue;
            }

            result += i - q[first].index;
            first++;
        }

        return result;
    }

    if (ones > zeros) {
        return countSwaps(1);
    }

    if (ones < zeros) {
        return countSwaps(0);
    }

    if (ones === zeros) {
        return Math.min(countSwaps(0), countSwaps(1));
    }
};

const tests = [
    {
        input: {
            nums: [2, 4, 6, 5, 7],
        },
        output: 3,
    },
    {
        input: {
            nums: [2, 4, 5, 7],
        },
        output: 1,
    },
    {
        input: {
            nums: [1, 2, 3],
        },
        output: 0,
    },
    {
        input: {
            nums: [4, 5, 6, 8],
        },
        output: -1,
    },
    {
        input: {
            nums: [52, 207, 314, 345, 205],
        },
        output: 2,
    },
    {
        input: {
            nums: [382, 548, 666, 583, 263, 283, 565],
        },
        output: 6,
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = minSwaps(...Object.values(test.input));
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
