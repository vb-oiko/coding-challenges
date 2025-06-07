/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    const cache = new Array(n + 1).fill(null);

    function dp(a) {
        if (a === 0) {
            return 0;
        }

        if (cache[a] !== null) {
            return cache[a];
        }

        let min = Infinity;
        const q = Math.floor(Math.sqrt(n));
        for (let i = 1; i <= q; i++) {
            const rest = a - i * i;
            if (rest < 0) {
                continue;
            }

            const count = 1 + dp(rest);
            if (count < min) {
                min = count;
            }
        }

        cache[a] = min;
        return min;
    }

    return dp(n);
};

const tests = [
    {
        n: 12,
        output: 3,
    },
    {
        n: 13,
        output: 2,
    },
];

for (const { n, output } of tests) {
    const result = numSquares(n);
    console.dir({ n, result, output });
}
