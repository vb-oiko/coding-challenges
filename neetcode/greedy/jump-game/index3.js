/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    var farthest = nums[0];
    var i;

    for (i = 0; i <= Math.min(nums.length - 1, farthest); i++) {
        farthest = Math.max(farthest, i + nums[i]);
    }

    return farthest >= nums.length - 1;
};

const tests = [
    {
        nums: [2, 3, 1, 1, 4],
        output: true,
    },
    {
        nums: [3, 2, 1, 0, 4],
        output: false,
    },
];

for (const { nums, output } of tests) {
    const result = canJump(nums);
    console.dir({ nums, result, output });
}
