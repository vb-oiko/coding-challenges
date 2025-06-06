/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function (piles) {
    const n = piles.length;
    const cache = Array.from({ length: n }, () => new Array(n).fill(null))

    function dp(i, j) {
        if (cache[i][j] !== null) {
            return cache[i][j]
        }

        if (i == j) {
            return piles[i]
        }

        cache[i][j] = Math.max(piles[i] - dp(i + 1, j), piles[j] - dp(i, j - 1))
        return cache[i][j]
    }

    const result = dp(0, n - 1)

    return result > 0
};

const tests = [
    {
        piles: [5, 3, 4, 5],
        output: true
    },
    {
        piles: [3, 7, 2, 3],
        output: true
    },
]

for (const { piles, output } of tests) {
    const result = stoneGame(piles)
    console.dir({ piles, result, output })
}