/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
  if (!node) {
    return null;
  }

  const start = new Node(node.val);
  const map = new Map();
  map.set(node.val, start);

  function getOrCreateNode(val) {
    const foundNode = map.get(val);
    if (foundNode) {
      return foundNode;
    }

    const newNode = new Node(val);
    map.set(val, newNode);
    return newNode;
  }

  const visited = new Set();

  function dfs(sourceNode) {
    if (visited.has(sourceNode)) {
      return;
    }

    const targetNode = getOrCreateNode(sourceNode.val);
    visited.add(sourceNode);

    sourceNode.neighbors.forEach((sourceNeighbor) => {
      dfs(sourceNeighbor);
      const targetNeighbor = getOrCreateNode(sourceNeighbor.val);
      targetNode.neighbors.push(targetNeighbor);
    });
  }

  dfs(node);

  return start;
};

const { Node } = require("../../../utils");

const tests = [
  {
    adjList: [
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 3],
    ],
    output: [
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 3],
    ],
  },
];

for (const { adjList, output } of tests) {
  const graph = Node.fromAdjacencyList(adjList);
  const cloned = cloneGraph(graph);
  const result = Node.toAdjacencyList(cloned);
  console.warn({ adjList, output, result });
}
