/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
    function dp(l, r) {
        if (r < l) {
            return false;
        }

        if (nums[l] === target || nums[r] === target) {
            return true;
        }

        if (l === r) {
            return false;
        }

        if (nums[l] < nums[r] && nums[r] < target) {
            return false;
        }

        if (nums[l] < nums[r] && target < nums[l]) {
            return false;
        }

        var m = Math.floor((l + r) / 2);

        if (nums[m] === target) {
            return true;
        }

        return dp(l, m - 1) || dp(m + 1, r);
    }

    return dp(0, nums.length - 1);
};

const tests = [
    {
        nums: [2, 5, 6, 0, 0, 1, 2],
        target: 0,
        output: true,
    },
    {
        nums: [2, 5, 6, 0, 0, 1, 2],
        target: 3,
        output: false,
    },
];

for (const { nums, target, output } of tests) {
    const result = search(nums, target);
    console.dir({ nums, target, result, output });
}
