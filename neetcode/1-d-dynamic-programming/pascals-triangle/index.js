/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    const result = [[1,0]];
    
    for(let i = 1; i<numRows;i++){
        const prevRow = result[i-1];
        const row = [1];

        for(let j = 1; j< prevRow.length; j++) {
            row.push(prevRow[j-1] + prevRow[j])
        }

        row.push(0);
        result.push(row)
    }

    return result.map(row => {row.pop(); return row});
};


const tests = [
  { n: 2, output:[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]] },

];

for (const { n, output } of tests) {
  const result = generate(n);
  console.dir({ n, result, output }, {depth: null});
}