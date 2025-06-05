/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function (n) {
    let t0 = 0;
    let t1 = 1;
    let t2 = 1;
    let t

    if (n === 0) {
        return t0
    }

    if (n === 1) {
        return t1
    }

    if (n === 2) {
        return t2
    }

    for (let i = 3; i <= n; i++) {
        t = t0 + t1 + t2;
        t0 = t1
        t1 = t2
        t2 = t
    }

    return t
};

const tests = [
    {
        n: 4,
        output: 4
    },
    {
        n: 25,
        output: 1389537
    },
]

for (const { n, output } of tests) {
    const result = tribonacci(n)
    console.dir({ n, result, output })
}