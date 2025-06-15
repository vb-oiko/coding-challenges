/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function (nums, k) {
    var n = nums.length;

    function canSplit(sum) {
        var batch = 0;
        var count = 0;
        var num;

        for (var i = 0; i < n; i++) {
            num = nums[i];

            if (num > sum) {
                return false;
            }

            if (batch + num > sum) {
                batch = num;
                count++;
                continue;
            }

            batch += num;
        }

        if (batch > 0) {
            count++;
        }

        return count <= k;
    }

    var l = 0;
    var r = 0;

    for (var i = 0; i < n; i++) {
        r += nums[i];
    }

    l = Math.ceil(r / k);

    var m;
    var res = r;
    while (l <= r) {
        m = Math.ceil((l + r) / 2);

        if (canSplit(m)) {
            res = m;
            r = m - 1;
            continue;
        }

        l = m + 1;
    }

    return res;
};

const tests = [
    {
        nums: [7, 2, 5, 10, 8],
        k: 2,
        output: 18,
    },
    {
        nums: [1, 2, 3, 4, 5],
        k: 2,
        output: 9,
    },
    {
        nums: [1, 4, 4],
        k: 3,
        output: 4,
    },
];

for (const { nums, k, output } of tests) {
    const result = splitArray(nums, k);
    console.dir({ nums, k, result, output });
}
