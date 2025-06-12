/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function (senate) {
    var prev = senate.split('');
    var prevR = prev.reduce((acc, cur) => (cur === 'R' ? acc + 1 : acc), 0);
    var prevD = prev.reduce((acc, cur) => (cur === 'D' ? acc + 1 : acc), 0);
    var senator;
    var r = 0;
    var d = 0;
    var rCount;
    var dCount;
    var current;

    while (prevR > 0 && prevD > 0) {
        current = [];
        rCount = 0;
        dCount = 0;

        for (senator of prev) {
            if (senator === 'R' && d > 0) {
                d--;
                continue;
            }

            if (senator === 'D' && r > 0) {
                r--;
                continue;
            }

            if (senator === 'R') {
                current.push('R');
                rCount++;
                r++;
            }

            if (senator === 'D') {
                current.push('D');
                dCount++;
                d++;
            }
        }

        prev = current;
        prevR = rCount;
        prevD = dCount;
    }

    return prevR > prevD ? 'Radiant' : 'Dire';
};

const tests = [
    {
        senate: 'RD',
        output: 'Radiant',
    },
    {
        senate: 'RDD',
        output: 'Dire',
    },
];

for (const { senate, output } of tests) {
    const result = predictPartyVictory(senate);
    console.dir({ senate, result, output });
}
