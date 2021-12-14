function parsePassages(input) {
  return input
    .split(/\n|\r\n/)
    .filter(Boolean)
    .reduce((graph, passage) => {
      let [from, to] = passage.split("-");
      if (!graph[from]) {
        graph[from] = new Set();
      }
      if (!graph[to]) {
        graph[to] = new Set();
      }
      graph[from].add(to);
      graph[to].add(from);
      return graph;
    }, {});
}

function traversePassage(
  graph,
  from,
  currentPath,
  allPaths,
  smallCaveCounter = null
) {
  let to = graph[from];

  to.forEach((dest) => {
    let isSmallCave = !["start", "end"].includes(dest) && /[a-z]+/.test(dest);
    if (dest === "end") {
      allPaths.push(`${currentPath},${from},${dest}`);
    } else if (dest !== "start") {
      if (!(isSmallCave && currentPath.includes(dest))) {
        traversePassage(
          graph,
          dest,
          `${currentPath},${from}`,
          allPaths,
          smallCaveCounter
        );
      } else if (smallCaveCounter !== null && smallCaveCounter > 0) {
        traversePassage(
          graph,
          dest,
          `${currentPath},${from}`,
          allPaths,
          smallCaveCounter - 1
        );
      }
    }
  });
}

function countPossiblePaths(input) {
  const graph = parsePassages(input);
  let paths = [];
  traversePassage(graph, "start", "", paths);

  return paths.length;
}

function countPossiblePathsWithSmallCaveRepeated(input) {
  const graph = parsePassages(input);
  let paths = [];
  traversePassage(graph, "start", "", paths, 1);

  return paths.length;
}
