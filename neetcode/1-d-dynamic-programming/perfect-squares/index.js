/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    var cache = new Array(n + 1).fill(Infinity);
    cache[0] = 0;
    var j;
    var q;
    var count;
    var i;

    for (i = 1; i <= n; i++) {
        j = 1;
        q = 1;
        while (q <= i) {
            count = 1 + cache[i - q];
            if (count < cache[i]) {
                cache[i] = count;
            }
            j++;
            q = j * j;
        }
    }

    return cache[n];
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
