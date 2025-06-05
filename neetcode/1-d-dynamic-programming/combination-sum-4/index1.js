/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
    const cache = Array.from({ length: target + 1 }, () => null);
    cache[0] = 0

    function dp(t) {
        if (cache[t] !== null) {
            return cache[t]
        }

        let count = 0;
        for (const num of nums) {
            if (num === t) {
                count += 1;
                continue
            }

            if (num <= t) {
                count = count + dp(t - num)
            }
        }
        cache[t] = count
        return count
    }

    return dp(target)
};

const tests = [
    {
        nums: [1, 2, 3], target: 4,
        output: 7
    },
    {
        nums: [9], target: 3,
        output: 0
    }
]

for (const { nums, target, output } of tests) {
    const result = combinationSum4(nums, target)
    console.dir({ nums, target, result, output })
}