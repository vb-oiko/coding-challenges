/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  const n = gas.length;
  let totalBalance = 0;
  let curBalance = 0;
  let result = 0;

  for (let i = 0; i < n; i++) {
    const balance = gas[i] - cost[i];
    totalBalance += balance;
    curBalance += balance;
    if (curBalance < 0) {
      result = i + 1;
      curBalance = 0;
    }
  }

  return totalBalance < 0 ? -1 : result;
};

const tests = [
  {
    gas: [1, 2, 3, 4, 5],
    cost: [3, 4, 5, 1, 2],
    output: 3,
  },
  {
    gas: [2, 3, 4],
    cost: [3, 4, 3],
    output: -1,
  },
];

for (const { gas, cost, output } of tests) {
  const result = canCompleteCircuit(gas, cost);
  console.log({ gas, cost, result, output });
}
