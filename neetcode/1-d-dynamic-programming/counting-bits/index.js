/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
    if (n === 0) {
        return [0]
    }

    const result = [0, 1]
    let divider = 1;

    for (let i = 2; i <= n; i++) {
        const remainder = i % divider;
        if (remainder === 0) {
            divider = divider * 2;
            result.push(1)
        } else {
            result.push(1 + result[remainder])
        }
    }

    return result
};

const tests = [
    {
        n: 2,
        output: [0, 1, 1]
    },
    {
        n: 5,
        output: [0, 1, 1, 2, 1, 2]
    },
]

for (const { n, output } of tests) {
    const result = countBits(n);
    console.dir({ n, result, output }, { depth: null })
}