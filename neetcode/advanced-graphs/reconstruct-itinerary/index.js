/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
  const START_NODE = "JFK";
  let adjacency = new Map();

  for (const [from, to] of tickets) {
    const destinations = adjacency.get(from) || [];
    destinations.push(to);
    adjacency.set(from, destinations);
  }

  for (const key of adjacency.keys()) {
    const destinations = adjacency.get(key);
    destinations.sort((a, b) => (a < b ? 1 : -1));
  }

  const result = [];

  function dfs(from) {
    const destinations = adjacency.get(from);

    if (destinations && destinations.length) {
      while (destinations.length) {
        const to = destinations.pop();
        dfs(to);
      }
    }
    result.push(from);
  }

  dfs(START_NODE);

  result.reverse();
  return result;
};

const tests = [
  {
    tickets: [
      ["JFK", "SFO"],
      ["JFK", "ATL"],
      ["SFO", "JFK"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "AAA"],
      ["AAA", "BBB"],
      ["BBB", "ATL"],
    ],
    output: ["JFK", "NRT", "JFK", "KUL"],
  },
  {
    tickets: [
      ["JFK", "KUL"],
      ["JFK", "NRT"],
      ["NRT", "JFK"],
    ],
    output: ["JFK", "NRT", "JFK", "KUL"],
  },
  {
    tickets: [
      ["MUC", "LHR"],
      ["JFK", "MUC"],
      ["SFO", "SJC"],
      ["LHR", "SFO"],
    ],
    output: ["JFK", "MUC", "LHR", "SFO", "SJC"],
  },
  {
    tickets: [
      ["JFK", "SFO"],
      ["JFK", "ATL"],
      ["SFO", "ATL"],
      ["ATL", "JFK"],
      ["ATL", "SFO"],
    ],
    output: ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"],
  },
  {
    tickets: [
      ["EZE", "AXA"],
      ["TIA", "ANU"],
      ["ANU", "JFK"],
      ["JFK", "ANU"],
      ["ANU", "EZE"],
      ["TIA", "ANU"],
      ["AXA", "TIA"],
      ["TIA", "JFK"],
      ["ANU", "TIA"],
      ["JFK", "TIA"],
    ],
    output: [
      "JFK",
      "ANU",
      "EZE",
      "AXA",
      "TIA",
      "ANU",
      "JFK",
      "TIA",
      "ANU",
      "TIA",
      "JFK",
    ],
  },
];

const { expect } = require("../../../utils/expect");

for (const { tickets, output } of tests) {
  const result = findItinerary(tickets);
  const isValid = expect.array(result).toEqual(output);
  console.warn({ isValid });
}
