/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
    const map = {};

    for (const c of s) {
        map[c] = (map[c] || 0) + 1;
    }


    const map2 = {}
    let max = 0;

    for (const [c, n] of Object.entries(map)) {
        const cur = map2[n] || [];
        cur.push(c)
        map2[n] = cur
        if (n > max) {
            max = n;
        }
    }

    let result = ''

    for (let i = max; i > 0; i--) {
        const chars = map2[i]

        if (!chars) {
            continue
        }

        for (const c of chars) {
            result += c.repeat(i)
        }
    }


    return result
};

const tests = [
    // {
    //     s: "tree"
    // },
    {
        s: "eeeee"
    }
]

for (const { s } of tests) {
    const result = frequencySort(s)
    console.dir({ s, result })
}