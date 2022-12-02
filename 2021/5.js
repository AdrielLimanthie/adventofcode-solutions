function parseLines(str) {
  function parsePoint(rawPoint) {
    return rawPoint.split(",").reduce((point, coord, index) => {
      if (index === 0) {
        point.x = Number(coord);
      } else {
        point.y = Number(coord);
      }
      return point;
    }, {});
  }

  let rawLines = str.split("\n").filter(Boolean);
  return rawLines.map((rawLine) => {
    let [point1, point2] = rawLine.split(" -> ");

    return {
      start: parsePoint(point1),
      end: parsePoint(point2),
    };
  });
}

// For part 1
function countOverlappingPoints(rawInput) {
  function getDirection(start, end) {
    if (start.x === end.x) {
      return start.y - end.y > 0 ? "up" : "down";
    } else if (start.y === end.y) {
      return start.x - end.x > 0 ? "left" : "right";
    }
  }

  // Consider only vertical/horizontal lines
  let lines = parseLines(rawInput);
  let straightLines = lines.filter((line) => {
    return line.start.x === line.end.x || line.start.y === line.end.y;
  });

  // Initialize floorMap
  let floorMap = new Array(1000).fill(null).map(() => []);
  let count = 0;

  // Draw each line into the floorMap
  straightLines.forEach((line, index) => {
    let { start, end } = line;
    let direction = getDirection(start, end);

    if (direction === "up") {
      for (let i = start.y; i >= end.y; i--) {
        floorMap[start.x][i] = (floorMap[start.x][i] || 0) + 1;
        if (floorMap[start.x][i] === 2) {
          count++;
        }
      }
    } else if (direction === "down") {
      for (let i = start.y; i <= end.y; i++) {
        floorMap[start.x][i] = (floorMap[start.x][i] || 0) + 1;
        if (floorMap[start.x][i] === 2) {
          count++;
        }
      }
    } else if (direction === "left") {
      for (let i = start.x; i >= end.x; i--) {
        floorMap[i][start.y] = (floorMap[i][start.y] || 0) + 1;
        if (floorMap[i][start.y] === 2) {
          count++;
        }
      }
    } else {
      for (let i = start.x; i <= end.x; i++) {
        floorMap[i][start.y] = (floorMap[i][start.y] || 0) + 1;
        if (floorMap[i][start.y] === 2) {
          count++;
        }
      }
    }
  });

  return count;
}

// For part 2
function countAllOverlappingPoints(rawInput) {
  function getDirection(start, end) {
    if (start.x === end.x) {
      return start.y - end.y > 0 ? "up" : "down";
    } else if (start.y === end.y) {
      return start.x - end.x > 0 ? "left" : "right";
    } else if (start.x < end.x) {
      return start.y < end.y ? "downright" : "upright";
    } else if (start.x > end.x) {
      return start.y < end.y ? "downleft" : "upleft";
    }
  }

  let lines = parseLines(rawInput);

  // Initialize floorMap
  let floorMap = new Array(1000).fill(null).map(() => []);
  let count = 0;

  // Draw each line into the floorMap
  lines.forEach((line, index) => {
    let { start, end } = line;
    let direction = getDirection(start, end);

    if (direction === "up") {
      for (let i = start.y; i >= end.y; i--) {
        floorMap[start.x][i] = (floorMap[start.x][i] || 0) + 1;
        if (floorMap[start.x][i] === 2) {
          count++;
        }
      }
    } else if (direction === "down") {
      for (let i = start.y; i <= end.y; i++) {
        floorMap[start.x][i] = (floorMap[start.x][i] || 0) + 1;
        if (floorMap[start.x][i] === 2) {
          count++;
        }
      }
    } else if (direction === "left") {
      for (let i = start.x; i >= end.x; i--) {
        floorMap[i][start.y] = (floorMap[i][start.y] || 0) + 1;
        if (floorMap[i][start.y] === 2) {
          count++;
        }
      }
    } else if (direction === "right") {
      for (let i = start.x; i <= end.x; i++) {
        floorMap[i][start.y] = (floorMap[i][start.y] || 0) + 1;
        if (floorMap[i][start.y] === 2) {
          count++;
        }
      }
    } else if (direction === "downright") {
      for (let i = 0; i <= end.x - start.x; i++) {
        floorMap[start.x + i][start.y + i] =
          (floorMap[start.x + i][start.y + i] || 0) + 1;
        if (floorMap[start.x + i][start.y + i] === 2) {
          count++;
        }
      }
    } else if (direction === "downleft") {
      for (let i = 0; i <= start.x - end.x; i++) {
        floorMap[start.x - i][start.y + i] =
          (floorMap[start.x - i][start.y + i] || 0) + 1;
        if (floorMap[start.x - i][start.y + i] === 2) {
          count++;
        }
      }
    } else if (direction === "upright") {
      for (let i = 0; i <= end.x - start.x; i++) {
        floorMap[start.x + i][start.y - i] =
          (floorMap[start.x + i][start.y - i] || 0) + 1;
        if (floorMap[start.x + i][start.y - i] === 2) {
          count++;
        }
      }
    } else if (direction === "upleft") {
      for (let i = 0; i <= start.x - end.x; i++) {
        floorMap[start.x - i][start.y - i] =
          (floorMap[start.x - i][start.y - i] || 0) + 1;
        if (floorMap[start.x - i][start.y - i] === 2) {
          count++;
        }
      }
    }
  });

  return count;
}
