/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
    const n = obstacleGrid.length;
    const m = obstacleGrid[0].length;

    const cache = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            if (i === n - 1 && j === m - 1) {
                cache[i][j] = 1 - obstacleGrid[i][j];
                continue;
            }

            if (obstacleGrid[i][j] === 1) {
                continue;
            }

            cache[i][j] = cache[i + 1][j] + cache[i][j + 1];
        }
    }

    return cache[0][0]
};

const tests = [
    {
        obstacleGrid: [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
        output: 2
    },
    {
        obstacleGrid: [[0, 1], [0, 0]],
        output: 1
    }
]

for (const { obstacleGrid, output } of tests) {
    const result = uniquePathsWithObstacles(obstacleGrid)
    console.dir({ obstacleGrid, result, output })
}