/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
    var hashmap = {};
    var num;
    var prevI;

    for (var i = 0; i < nums.length; i++) {
        num = nums[i];
        prevI = hashmap[num];

        if (prevI === undefined) {
            hashmap[num] = i;
            continue;
        }

        if (i - prevI <= k) {
            return true;
        }

        hashmap[num] = i;
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
];

for (const { nums, k, output } of tests) {
    const result = containsNearbyDuplicate(nums, k);
    console.dir({ nums, k, result, output });
}
