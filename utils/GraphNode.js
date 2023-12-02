class Node {
  constructor(val, neighbors) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }

  static fromAdjacencyList(list) {
    const map = new Map();
    let start = null;

    function getOrCreateNode(val) {
      const node = map.get(val);
      if (node) {
        return node;
      }

      const newNode = new Node(val);
      map.set(val, newNode);

      return newNode;
    }

    for (let val = 1; val <= list.length; val++) {
      const node = getOrCreateNode(val);

      if (val === 1) {
        start = node;
      }

      for (const neighbor of list[val - 1]) {
        node.neighbors.push(getOrCreateNode(neighbor));
      }
    }

    return start;
  }

  static toAdjacencyList(start) {
    const visited = new Set();
    const result = [];

    function dfs(node) {
      if (visited.has(node)) {
        return;
      }

      visited.add(node);
      console.warn({ node });

      result[node.val - 1] = node.neighbors.map(({ val }) => val);
      node.neighbors.forEach((neighbor) => dfs(neighbor));
    }

    dfs(start);

    return result;
  }
}

module.exports = {
  Node,
};

// const adjList = [
//   [2, 4],
//   [1, 3],
//   [2, 4],
//   [1, 3],
// ];

// const graph = Node.fromAdjacencyList(adjList);

// const arr = Node.toAdjacencyList(graph);

// console.warn({ adjList, graph, arr });
