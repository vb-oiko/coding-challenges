/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function (piles) {
    const dp = Array.from({ length: piles.length }, () => new Array(piles.length))

    function backtrack(l, r) {
        if (r < l) {
            return 0
        }

        if (dp[l][r] !== undefined) {
            return dp[l][r]
        }

        if ((l + r) % 2 === 1) {
            // Alice's turn
            dp[l][r] = Math.max(
                backtrack(l + 1, r) + piles[l],
                backtrack(l, r - 1) + piles[r]
            )
        } else {
            // Bob's turn
            dp[l][r] = Math.min(
                backtrack(l + 1, r) - piles[l],
                backtrack(l, r - 1) - piles[r]
            )
        }

        return dp[l][r]
    }
    return backtrack(0, piles.length - 1) > 0
};

const tests = [
    {
        piles: [5, 3, 4, 5],
        output: true
    },
    {
        piles: [3, 7, 2, 3],
        output: true
    }
]

for (const { piles, output } of tests) {
    const result = stoneGame(piles)
    console.dir({ piles, result, output }, { depth: null })
}