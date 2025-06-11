/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
var canReach = function (s, minJump, maxJump) {
    var n = s.length;
    var farthest = 0;

    var level = new Array(maxJump - minJump + 1);
    var nextLevel = new Array(maxJump - minJump + 1);
    level.push(0);
    var node;
    var swap;
    var i;

    while (level.length > 0) {
        nextLevel.length = 0;

        for (node of level) {
            for (
                i = Math.max(node + minJump, farthest + 1);
                i <= node + maxJump;
                i++
            ) {
                if (i === n - 1 && s[i] === '0') {
                    return true;
                }

                if (s[i] === '0') {
                    nextLevel.push(i);
                }

                farthest = i;
            }
        }
        swap = level;
        level = nextLevel;
        nextLevel = swap;
    }

    return false;
};

const tests = [
    {
        s: '011010',
        minJump: 2,
        maxJump: 3,
        output: true,
    },
    {
        s: '01101110',
        minJump: 2,
        maxJump: 3,
        output: false,
    },
];

for (const { s, minJump, maxJump, output } of tests) {
    const result = canReach(s, minJump, maxJump);
    console.dir({ s, minJump, maxJump, result, output });
}
