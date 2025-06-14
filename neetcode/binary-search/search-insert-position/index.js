/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    var l = 0;
    var r = nums.length - 1;
    var m;

    while (r >= l) {
        if (l === r) {
            return target <= nums[l] ? l : l + 1;
        }

        m = Math.ceil((l + r) / 2);

        if (nums[m] === target) {
            return m;
        }

        if (target < nums[m]) {
            r = m - 1;
            continue;
        }

        l = m;
    }

    return l;
};

const tests = [
    {
        nums: [1, 3, 5, 6],
        target: 5,
        output: 2,
    },
    {
        nums: [1, 3, 5, 6],
        target: 2,
        output: 1,
    },
    {
        nums: [1, 3, 5, 6],
        target: 7,
        output: 4,
    },
];

for (const { nums, target, output } of tests) {
    const result = searchInsert(nums, target);
    console.dir({ nums, target, result, output });
}
