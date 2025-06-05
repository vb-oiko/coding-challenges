/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    const n = grid.length;
    const m = grid[0].length;

    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(Infinity))

    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            if (i === n - 1 && j === m - 1) {
                dp[i][j] = grid[i][j]
                continue
            }

            dp[i][j] = grid[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1])
        }
    }

    return dp[0][0]
};

const tests = [
    {
        grid: [[1, 3, 1], [1, 5, 1], [4, 2, 1]],
        output: 7
    },
    {
        grid: [[1, 2, 3], [4, 5, 6]],
        output: 12
    }
]

for (const { grid, output } of tests) {
    const result = minPathSum(grid)
    console.dir({ grid, result, output })
}