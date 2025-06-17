/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    var map = {};
    var c;
    var counts = new Array(26);
    var key;

    for (var i = 0; i < strs.length; i++) {
        counts.fill(0);

        for (var c of strs[i]) {
            counts[c.charCodeAt(0) - 97]++;
        }
        key = counts.join(',');
        map[key] = map[key] || [];
        map[key].push(strs[i]);
    }

    return Object.values(map);
};

const tests = [
    {
        input: { strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'] },
        output: [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']],
    },
    {
        input: { strs: [''] },
        output: [['']],
    },
    {
        input: { strs: ['a'] },
        output: [['a']],
    },
];

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = groupAnagrams(...Object.values(test.input));
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
