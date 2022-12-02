function parseMap(input) {
  return input
    .split(/\n|\r\n/)
    .filter(Boolean)
    .map((row) => row.split("").map(Number));
}

function isLowPoint(map, v, h) {
  let middle = map[v][h];
  let left = h - 1 >= 0 ? map[v][h - 1] : null;
  let right = h + 1 < map[0].length ? map[v][h + 1] : null;
  let top = v - 1 >= 0 ? map[v - 1][h] : null;
  let bottom = v + 1 < map.length ? map[v + 1][h] : null;
  return (
    (left === null || middle < left) &&
    (right === null || middle < right) &&
    (top === null || middle < top) &&
    (bottom === null || middle < bottom)
  );
}

// For part 1
function countSumOfRiskLevel(input) {
  let map = parseMap(input);

  let sum = 0;
  for (let v = 0; v < map.length; v++) {
    let row = map[v];
    for (let h = 0; h < row.length; h++) {
      if (isLowPoint(map, v, h)) {
        sum += map[v][h] + 1;
      }
    }
  }

  return sum;
}

// For part 2
function countProductOfThreeLargestBasins(input) {
  let map = parseMap(input);

  function recursiveCountBasinSize(map, point, visited) {
    if (visited[`${point[0]}-${point[1]}`] || map[point[0]][point[1]] === 9) {
      return 0;
    }

    let [v, h] = point;
    visited[`${v}-${h}`] = true;
    let left = h - 1 >= 0 ? [v, h - 1] : null;
    let right = h + 1 < map[0].length ? [v, h + 1] : null;
    let top = v - 1 >= 0 ? [v - 1, h] : null;
    let bottom = v + 1 < map.length ? [v + 1, h] : null;

    return (
      1 +
      (left ? recursiveCountBasinSize(map, left, visited) : 0) +
      (top ? recursiveCountBasinSize(map, top, visited) : 0) +
      (right ? recursiveCountBasinSize(map, right, visited) : 0) +
      (bottom ? recursiveCountBasinSize(map, bottom, visited) : 0)
    );
  }

  let lowestPoints = [];
  for (let v = 0; v < map.length; v++) {
    let row = map[v];
    for (let h = 0; h < row.length; h++) {
      if (isLowPoint(map, v, h)) {
        lowestPoints.push([v, h]);
      }
    }
  }

  let visited = {};
  let basinSizes = lowestPoints.map((point) =>
    recursiveCountBasinSize(map, point, visited)
  );

  return basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((product, size) => product * size, 1);
}
