function parseRiskLevelPartOne(input) {
  return input
    .split(/\n|\r\n/)
    .filter(Boolean)
    .map((row) => row.split("").map(Number));
}

function parseRiskLevelPartTwo(input) {
  let map = input
    .split(/\n|\r\n/)
    .filter(Boolean)
    .map((row) => row.split("").map(Number));
  let baseV = map.length,
    baseH = map[0].length;
  for (let v = baseV; v < baseV * 5; v++) {
    for (let h = 0; h < baseH; h++) {
      if (!map[v]) {
        map[v] = [];
      }
      map[v][h] = (map[v - baseV][h] % 9) + 1;
    }
  }
  for (let v = 0; v < baseV * 5; v++) {
    for (let h = baseH; h < baseH * 5; h++) {
      map[v][h] = (map[v][h - baseH] % 9) + 1;
    }
  }
  return map;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  static getLeft(index) {
    return index * 2 + 1;
  }

  static getRight(index) {
    return index * 2 + 2;
  }

  static getParent(index) {
    return Math.floor((index - 1) / 2);
  }

  get length() {
    return this.heap.length;
  }

  insert(node, value) {
    this.heap.push({
      node,
      value,
    });

    let i = this.heap.length - 1;
    while (
      i > 0 &&
      this.heap[MinHeap.getParent(i)].value > this.heap[i].value
    ) {
      let temp = this.heap[MinHeap.getParent(i)];
      this.heap[MinHeap.getParent(i)] = this.heap[i];
      this.heap[i] = temp;
      i = MinHeap.getParent(i);
    }
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    } else if (this.heap.length === 1) {
      return this.heap.pop();
    }

    let root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapify(0);

    return root;
  }

  decreaseValue(node, value) {
    let i = this.heap.findIndex(
      (el) => el.node[0] === node[0] && el.node[1] === node[1]
    );
    if (i !== -1) {
      this.heap[i].value = value;
    }
    while (
      i > 0 &&
      this.heap[MinHeap.getParent(i)].value > this.heap[i].value
    ) {
      let temp = this.heap[MinHeap.getParent(i)];
      this.heap[MinHeap.getParent(i)] = this.heap[i];
      this.heap[i] = temp;
      i = MinHeap.getParent(i);
    }
  }

  heapify(index = 0) {
    let left = MinHeap.getLeft(index),
      right = MinHeap.getRight(index),
      smallest = index;
    if (
      left < this.heap.length &&
      this.heap[left].value < this.heap[index].value
    ) {
      smallest = left;
    }
    if (
      right < this.heap.length &&
      this.heap[right].value < this.heap[smallest].value
    ) {
      smallest = right;
    }
    if (smallest !== index) {
      let temp = this.heap[index];
      this.heap[index] = this.heap[smallest];
      this.heap[smallest] = temp;
      this.heapify(smallest);
    }
  }
}

function getKey([v, h]) {
  return `${v},${h}`;
}

function findLowestRiskToDestination(input, parser) {
  let map = parser(input);

  let queue = new MinHeap(),
    distances = {},
    visited = {};

  // Set initial distances and populate queue with all the nodes
  map.forEach((row, v) => {
    row.forEach((_, h) => {
      let value = v === 0 && h === 0 ? 0 : Infinity;
      distances[getKey([v, h])] = value;
      queue.insert([v, h], value);
    });
  });

  while (queue.length > 0) {
    // Find the node in queue with smallest distance
    let current = queue.extractMin();
    let { node: currentNode, value } = current;
    visited[getKey(currentNode)] = true;

    // Find all the unvisited neighbors of this node
    let [v, h] = currentNode;
    let neighbors = [
      [v - 1, h],
      [v, h - 1],
      [v + 1, h],
      [v, h + 1],
    ];
    neighbors = neighbors.filter(
      (node) =>
        node[0] >= 0 &&
        node[0] < map.length &&
        node[1] >= 0 &&
        node[1] < map[0].length &&
        !visited[getKey(node)]
    );

    neighbors.forEach((node) => {
      let newDistance = distances[getKey(currentNode)] + map[node[0]][node[1]];
      if (newDistance < distances[getKey(node)]) {
        distances[getKey(node)] = newDistance;
        queue.decreaseValue(node, newDistance);
      }
    });
  }

  let target = [map.length - 1, map[0].length - 1];
  return distances[getKey(target)];
}

// For part 1
function findLowestRiskPartOne(input) {
  return findLowestRiskToDestination(input, parseRiskLevelPartOne);
}
// For part 2
function findLowestRiskPartTwo(input) {
  return findLowestRiskToDestination(input, parseRiskLevelPartTwo);
}
