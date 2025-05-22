/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    let prevRow = [1, 0];
    
    for(let i = 1; i<=rowIndex;i++){
        const row = [1];

        for(let j = 1; j< prevRow.length; j++) {
            row.push(prevRow[j-1] + prevRow[j])
        }

        row.push(0);
        prevRow = row;
    }

    prevRow.pop()

    return prevRow;
};


const tests = [
  { n: 3, output:[[1,3,3,1]] },
{ n: 0, output:[[1]] },
{ n: 1, output:[[1,1]] },
];

for (const { n, output } of tests) {
  const result = getRow(n);
  console.dir({ n, result, output }, {depth: null});
}