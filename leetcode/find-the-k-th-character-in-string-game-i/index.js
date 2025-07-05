/**
 * @param {number} k
 * @return {character}
 */
var kthCharacter = function (k) {
    var s = 'a';
    var A = 'a'.codePointAt(0);
    var next;

    while (s.length < k) {
        var n = s.length;
        for (var i = 0; i < n; i++) {
            next = (s.codePointAt(i) - A + 1) % 26;
            s += String.fromCodePoint(A + next);
        }
    }

    return s[k - 1];
};

const tests = [
    {
        input: { k: 5 },
        output: 'b',
    },
    {
        input: { k: 10 },
        output: 'c',
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = kthCharacter(...Object.values(test.input));
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
