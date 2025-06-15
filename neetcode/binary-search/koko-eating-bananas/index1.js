/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
    var total;
    var i;
    var n = piles.length;

    function canEat(v) {
        total = 0;
        for (i = 0; i < n; i++) {
            total += Math.ceil(piles[i] / v);
        }
        return total <= h;
    }

    var l = 0;
    var r = 0;
    var p;

    for (i = 0; i < n; i++) {
        p = piles[i];
        l += p;
        if (p > r) {
            r = p;
        }
    }

    l = Math.floor(l / h);

    var res = r;

    while (l <= r) {
        m = Math.floor((l + r) / 2);

        if (canEat(m)) {
            res = m;
            r = m - 1;
            continue;
        }

        l = m + 1;
    }

    return res;
};

const tests = [
    { piles: [3, 6, 7, 11], h: 8, output: 4 },
    { piles: [30, 11, 23, 4, 20], h: 5, output: 30 },
    { piles: [30, 11, 23, 4, 20], h: 6, output: 23 },
];

for (const { piles, h, output } of tests) {
    const result = minEatingSpeed(piles, h);
    console.dir({ piles, h, result, output });
}
