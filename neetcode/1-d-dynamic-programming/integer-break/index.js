/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
    var cache = new Array(n + 1).fill(0);
    cache[1] = 1;
    var i;
    var max;
    var j;
    var prod;

    for (i = 2; i <= n; i++) {
        max = 0;
        for (j = 1; j <= i / 2; j++) {
            prod = Math.max(j * cache[i - j], j * (i - j));
            if (prod > max) {
                max = prod;
            }
        }
        cache[i] = max;
    }

    return cache[n];
};

const tests = [
    {
        n: 2,
        output: 1,
    },
    {
        n: 10,
        output: 36,
    },
];

for (const { n, output } of tests) {
    const result = integerBreak(n);
    console.dir({ n, result, output });
}
