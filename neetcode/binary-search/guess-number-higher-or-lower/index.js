/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
    var l = 1;
    var r = n;
    var m;
    var sign;

    while (r > l) {
        m = Math.ceil((l + r) / 2);

        sign = guess(m);

        if (sign === 0) {
            return m;
        }

        if (sign === -1) {
            r = m - 1;
            continue;
        }

        l = m;
    }

    return l;
};

var guess = function (num) {};

function buildGuess(pick) {
    return function (num) {
        return Math.sign(pick - num);
    };
}

const tests = [
    {
        n: 10,
        pick: 6,
        output: 6,
    },
    {
        n: 1,
        pick: 1,
        output: 1,
    },
    {
        n: 2,
        pick: 1,
        output: 1,
    },
];

for (const { n, pick, output } of tests) {
    guess = buildGuess(pick);
    const result = guessNumber(n);
    console.dir({ n, pick, result, output });
}
