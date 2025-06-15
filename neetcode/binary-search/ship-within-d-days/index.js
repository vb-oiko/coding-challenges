/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function (weights, days) {
    var n = weights.length;
    var total = 0;
    var max = 0;
    var i;

    for (i = 0; i < n; i++) {
        total += weights[i];
        if (weights[i] > max) {
            max = weights[i];
        }
    }

    if (days === 1) {
        return total;
    }

    function canShip(weight) {
        var i = 0;
        var batch = 0;
        var count = 1;
        while (i < n) {
            if (batch + weights[i] <= weight) {
                batch += weights[i];
                i++;
                continue;
            }

            batch = weights[i];
            i++;
            count++;
        }

        return count <= days;
    }

    var l = Math.max(max, Math.ceil(max / days));
    var r = total;
    var res = total;
    var m;

    while (l <= r) {
        m = Math.floor((l + r) / 2);

        if (canShip(m)) {
            res = m;
            r = m - 1;
            continue;
        }

        l = m + 1;
    }

    return res;
};

const tests = [
    {
        weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        days: 5,
        output: 15,
    },
    {
        weights: [3, 2, 2, 4, 1, 4],
        days: 3,
        output: 6,
    },
    {
        weights: [1, 2, 3, 1, 1],
        days: 4,
        output: 3,
    },
];

for (const { weights, days, output } of tests) {
    const result = shipWithinDays(weights, days);
    console.dir({ weights, days, result, output });
}
