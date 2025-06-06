/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function (stones) {
    let curSet = new Set();

    for (let i = 0; i < stones.length; i++) {
        if (i === 0) {
            curSet.add(stones[i])
            continue
        }

        let nextSet = new Set();

        for (const sum of curSet) {
            nextSet.add(Math.abs(stones[i] + sum))
            nextSet.add(Math.abs(stones[i] - sum))
        }

        curSet = nextSet
    }

    return Math.min(...curSet)
};

const tests = [
    {
        stones: [2, 7, 4, 1, 8, 1],
        output: 1
    },
    {
        stones: [31, 26, 33, 21, 40],
        output: 5
    },
]

for (const { stones, output } of tests) {
    const result = lastStoneWeightII(stones)
    console.dir({ stones, result, output })
}