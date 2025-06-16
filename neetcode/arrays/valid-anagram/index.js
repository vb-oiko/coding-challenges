/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    if (s.length !== t.length) {
        return false;
    }

    if (s.length === 0 && t.length === 0) {
        return true;
    }

    var map = {};
    var c;

    for (var i = 0; i < s.length; i++) {
        c = s[i];
        map[c] = (map[c] || 0) + 1;
        c = t[i];
        map[c] = (map[c] || 0) - 1;
    }

    for (c of Object.keys(map)) {
        if (map[c] !== 0) {
            return false;
        }
    }

    return true;
};

const tests = [
    {
        s: 'anagram',
        t: 'nagaram',
        output: true,
    },
    {
        s: 'rat',
        t: 'car',
        output: false,
    },
];

for (const { s, t, output } of tests) {
    const result = isAnagram(s, t);
    if (result === output) {
        console.log(true);
        continue;
    }

    console.log({ s, t, result, output });
}
