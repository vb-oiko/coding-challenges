/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
var canReach = function (s, minJump, maxJump) {
    var n = s.length;
    var set = [0];
    var nextSet = [];
    var farthest = 0;
    var swap;

    while (set.length > 0) {
        nextSet.length = 0;

        console.dir({ set });
        for (var step of set) {
            for (
                var i = Math.max(step + minJump, farthest + 1);
                i <= Math.min(step + maxJump, n - 1);
                i++
            ) {
                farthest = i;

                if (s[i] === '1') {
                    continue;
                }

                if (i === n - 1) {
                    return true;
                }

                nextSet.push(i);
            }
        }

        swap = set;
        set = nextSet;
        nextSet = swap;
    }

    return false;
};

const tests = [
    { input: { s: '011010', minJump: 2, maxJump: 3 }, output: true },
    { input: { s: '01101110', minJump: 2, maxJump: 3 }, output: false },
    { input: { s: '01', minJump: 1, maxJump: 1 }, output: false },
    { input: { s: '00111010', minJump: 3, maxJump: 5 }, output: false },
    {
        input: {
            s: '0'.repeat(50) + '1'.repeat(49) + '0',
            minJump: 1,
            maxJump: 50,
        },
        output: true,
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = canReach(...Object.values(test.input));
    if (!deepEqual(result, test.output)) {
        console.log('❌ fail:');
        console.dir(
            { ...test.input, result, expected: test.output },
            { depth: null }
        );
    } else {
        console.log('✅ pass');
    }
}
