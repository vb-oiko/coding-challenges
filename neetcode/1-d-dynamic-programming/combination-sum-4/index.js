/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
    const cache = Array.from({ length: target + 1 }, () => 0);

    for (let currentTarget = 1; currentTarget <= target; currentTarget++) {
        for (const num of nums) {
            if (num === currentTarget) {
                cache[currentTarget] += 1;
                continue
            }

            if (num < currentTarget) {
                cache[currentTarget] += cache[currentTarget - num]
            }
        }
    }

    return cache[target]

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