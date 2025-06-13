/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    var result = '';
    var n = strs.length;
    var i = 0;
    var j;
    var c;
    var s;

    while (true) {
        c = null;

        for (j = 0; j < n; j++) {
            s = strs[j];
            if (i === s.length) {
                return result;
            }

            if (c === null) {
                c = s[i];
                continue;
            }

            if (s[i] !== c) {
                return result;
            }
        }

        result += c;
        i++;
    }
};
