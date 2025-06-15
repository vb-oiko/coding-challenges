/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
    var set = new Set();
    var num;
    var l = 0;
    var r;

    for (r = 0; r < nums.length; r++) {
        num = nums[r];
        if (r > k) {
            set.delete(nums[l]);
            l++;
        }

        if (set.has(num)) {
            return true;
        }

        set.add(num);
    }

    return false;
};

const tests = [
    {
        nums: [1, 2, 3, 1],
        k: 3,
        output: true,
    },
    {
        nums: [1, 0, 1, 1],
        k: 1,
        output: true,
    },
    {
        nums: [1, 2, 3, 1, 2, 3],
        k: 2,
        output: false,
    },
    {
        nums: [99, 99],
        k: 2,
        output: true,
    },
    {
        nums: [1, 2, 1],
        k: 0,
        output: false,
    },
];

for (const { nums, k, output } of tests) {
    const result = containsNearbyDuplicate(nums, k);
    console.dir({ nums, k, result, output });
}
