/**
 * @param {string} word
 * @return {number}
 */
var possibleStringCount = function (word) {
    var n = word.length;
    if (n === 1) {
        return 1;
    }

    var result = 1;
    var slow = 0;
    var fast = 1;

    while (fast < n) {
        if (word[fast] === word[slow]) {
            result++;
            fast++;
            continue;
        }

        slow = fast;
        fast++;
    }

    return result;
};

const tests = [
    {
        input: { word: 'abbcccc' },
        output: 5,
    },
    {
        input: { word: 'abcd' },
        output: 1,
    },
    {
        input: { word: 'aaaa' },
        output: 4,
    },
    {
        input: { word: 'ere' },
        output: 1,
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = possibleStringCount(...Object.values(test.input));
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
