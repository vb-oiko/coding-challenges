/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    const dp = Array.from({ length: text1.length }, () => new Array(text2.length))

    function backtrack(i, j) {
        if (i === text1.length || j === text2.length) {
            return 0
        }

        if (dp[i][j] !== undefined) {
            return dp[i][j]
        }

        if (text1[i] === text2[j]) {
            dp[i][j] = 1 + backtrack(i + 1, j + 1)
            return dp[i][j]
        }

        dp[i][j] = Math.max(
            backtrack(i + 1, j),
            backtrack(i, j + 1)
        )

        return dp[i][j]
    }

    return backtrack(0, 0)
};

const tests = [
    {
        text1: "abcde", text2: "ace",
        output: 3
    },

    {
        text1: "abc", text2: "abc",
        output: 3
    },

    {
        text1: "abc", text2: "def",
        output: 0
    }
]

for (const { text1, text2, output } of tests) {
    const result = longestCommonSubsequence(text1, text2)
    console.dir({ text1, text2, result, output })
}