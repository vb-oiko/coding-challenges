
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
    let prevRow = [...matrix[0]]
    const n = matrix.length

    for (let i = 1; i < n; i++) {
        const curRow = [];
        for (let j = 0; j < n; j++) {
            curRow[j] = matrix[i][j] + Math.min(
                j === 0 ? +Infinity : prevRow[j - 1],
                prevRow[j],
                j === n - 1 ? +Infinity : prevRow[j + 1]
            )
        }
        prevRow = curRow
    }
    return Math.min(...prevRow)
};

const tests = [
    {
        matrix: [[2, 1, 3], [6, 5, 4], [7, 8, 9]],
        output: 13
    },
    {
        matrix: [[-19, 57], [-40, -5]],
        output: -59
    }
]

for (const { matrix, output } of tests) {
    const result = minFallingPathSum(matrix)
    console.dir({ matrix, result, output })
}