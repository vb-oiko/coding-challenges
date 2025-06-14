/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    if (x === 1) {
        return 1;
    }

    var l = 0;
    var r = x;
    var m;
    var q;

    while (r - l > 1) {
        m = Math.ceil((l + r) / 2);
        q = m * m;
        if (x === q) {
            return m;
        }

        if (x < q) {
            r = m;
            continue;
        }

        l = m;
    }

    return l;
};

const tests = [
    {
        x: 4,
        output: 2,
    },
    {
        x: 8,
        output: 2,
    },
    {
        x: 26,
        output: 5,
    },
];

for (const { x, output } of tests) {
    const result = mySqrt(x);
    console.dir({ x, result, output });
}
