/**
 * @param {number[]} arr
 * @return {number}
 */
var maxTurbulenceSize = function (arr) {
    var n = arr.length;
    if (n === 1) {
        return 1;
    }

    var prevSign = Math.sign(arr[1] - arr[0]);
    var max = prevSign === 0 ? 1 : 2;
    var curSign;
    var len = max;

    for (var i = 2; i < n; i++) {
        curSign = Math.sign(arr[i] - arr[i - 1]);

        if (curSign === 0) {
            len = 1;
        } else if (curSign === prevSign) {
            len = 2;
        } else {
            len += 1;
        }

        if (len > max) {
            max = len;
        }

        prevSign = curSign;
    }

    return max;
};

const tests = [
    {
        arr: [9, 4, 2, 10, 7, 8, 8, 1, 9],
        output: 5,
    },
    {
        arr: [4, 8, 12, 16],
        output: 2,
    },
    {
        arr: [100],
        output: 1,
    },
];

for (const { arr, output } of tests) {
    const result = maxTurbulenceSize(arr);
    console.dir({ arr, result, output });
}
