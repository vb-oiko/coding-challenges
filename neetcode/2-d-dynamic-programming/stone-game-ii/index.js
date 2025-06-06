/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function (piles) {
    const n = piles.length

    const cache = Array.from({ length: n }, () => new Array())

    function dp(i, m) {
        if (i >= n) {
            return 0
        }

        if (i === n - 1) {
            return piles[i]
        }

        if (cache[i][m] !== undefined) {
            return cache[i][m]
        }

        let sum = 0;
        let max = -Infinity;

        for (let j = 0; j < m * 2; j++) {
            sum += piles[i + j]
            const cur = sum - dp(i + j + 1, Math.max(j + 1, m))
            if (cur > max) {
                max = cur
            }
        }
        cache[i][m] = max
        return max
    }

    return (dp(0, 1) + piles.reduce((prev, curr) => prev + curr, 0)) / 2
};

const tests = [
    {
        piles: [2, 7, 9, 4, 4],
        output: 10
    },
    {
        piles: [1, 2, 3, 4, 5, 100],
        output: 104
    },
]

for (const { piles, output } of tests) {
    const result = stoneGameII(piles)
    console.dir({ piles, result, output })
}