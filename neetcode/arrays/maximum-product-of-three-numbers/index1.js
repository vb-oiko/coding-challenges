/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function (nums) {
    nums = nums.sort((a, b) => b - a);
    var n = nums.length;

    var prod1 = nums[0] * nums[1] * nums[2];

    if (nums[n - 1] < 0 && nums[n - 2] < 0 && nums[0] > 0) {
        var prod2 = nums[n - 1] * nums[n - 2] * nums[0];
        return Math.max(prod1, prod2);
    }

    return prod1;
};

const tests = [
    {
        nums: [1, 2, 3],
        output: 6,
    },
    {
        nums: [1, 2, 3, 4],
        output: 24,
    },
    {
        nums: [-1, -2, -3],
        output: -6,
    },
    {
        nums: [-1000, -1000, 1000],
        output: 1000000000,
    },
    {
        nums: [-3, -2, -1, 0, 0, 0, 0],
        output: 0,
    },
    {
        nums: [
            -710, -107, -851, 657, -14, -859, 278, -182, -749, 718, -640, 127,
            -930, -462, 694, 969, 143, 309, 904, -651, 160, 451, -159, -316,
            844, -60, 611, -169, -73, 721, -902, 338, -20, -890, -819, -644,
            107, 404, 150, -219, 459, -324, -385, -118, -307, 993, 202, -147,
            62, -94, -976, -329, 689, 870, 532, -686, 371, -850, -186, 87, 878,
            989, -822, -350, -948, -412, 161, -88, -509, 836, -207, -60, 771,
            516, -287, -366, -512, 509, 904, -459, 683, -563, -766, -837, -333,
            93, 893, 303, 908, 532, -206, 990, 280, 826, -13, 115, -732, 525,
            -939, -787,
        ],
        output: 972256230,
    },
    {
        nums: [4, 3, 2, -1, -98, -100],
        output: 39200,
    },
];

for (const { nums, output } of tests) {
    const result = maximumProduct(nums);
    if (result === output) {
        console.log(true);
        continue;
    }
    console.dir({ nums, result, output });
}
