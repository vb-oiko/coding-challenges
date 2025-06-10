/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    var max = -Infinity;
    var sum = 0;
    var newSum = 0;

    for (var i = 0; i < nums.length; i++) {
        newSum = sum + nums[i];
        if (newSum > max) {
            max = newSum;
        }

        if (newSum < 0) {
            sum = 0;
            continue;
        }

        sum = newSum;
    }
    return max;
};

const tests = [
    {
        nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        output: 6,
    },
    {
        nums: [1],
        output: 1,
    },
    {
        nums: [5, 4, -1, 7, 8],
        output: 23,
    },
];

for (const { nums, output } of tests) {
    const result = maxSubArray(nums);
    console.dir({ nums, result, output });
}
