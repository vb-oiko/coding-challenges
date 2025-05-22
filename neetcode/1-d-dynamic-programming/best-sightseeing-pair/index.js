/**
 * @param {number[]} values
 * @return {number}
 */
var maxScoreSightseeingPair = function (values) {
    let localMax = values[0] - 1
    let globalMax = localMax

    for (let i = 1; i < values.length; i++) {
        if (localMax + values[i] > globalMax) {
            globalMax = localMax + values[i]
        }
        localMax = Math.max(localMax, values[i]) - 1
    }

    return globalMax
};

const tests = [
    {
        values: [8, 1, 5, 2, 6],
        output: 11
    }
    ,
    {
        values: [1, 2],
        output: 2
    }

]

for (const { values, output } of tests) {
    const result = maxScoreSightseeingPair(values);
    console.dir({ values, result, output }, { depth: null });
}