/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function (nums) {
    var n = nums.length;
    var max = nums[0];
    var min = nums[0];
    var sum = 0;
    var i;
    var maxSum = 0;
    var minSum = 0;

    for (i = 0; i < n; i++) {
        sum += nums[i];

        maxSum += nums[i];
        minSum += nums[i];

        if (maxSum > max) {
            max = maxSum;
        }

        if (minSum < min) {
            min = minSum;
        }

        if (maxSum < 0) {
            maxSum = 0;
        }

        if (minSum > 0) {
            minSum = 0;
        }
    }

    if (max >= 0) {
        return Math.max(max, sum - min);
    }

    return max;
};

const tests = [
    {
        nums: [1, -2, 3, -2],
        output: 3,
    },
    {
        nums: [5, -3, 5],
        output: 10,
    },
    {
        nums: [-3, -2, -3],
        output: -2,
    },
];

for (const { nums, output } of tests) {
    const result = maxSubarraySumCircular(nums);
    console.dir({ nums, result, output });
}
