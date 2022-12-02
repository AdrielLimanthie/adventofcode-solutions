function parseMovement(str) {
  return str.split("\n").map((raw) => {
    let [direction, valueInString] = raw.split(" ");
    return {
      direction,
      value: Number(valueInString),
    };
  });
}

// For part 1
function productOfDistanceAndDepth(arr) {
  let distance = 0;
  let depth = 0;

  arr.forEach((move) => {
    if (move.direction === "forward") {
      distance += move.value;
    } else if (move.direction === "down") {
      depth += move.value;
    } else if (move.direction === "up") {
      depth -= move.value;
    }
  });

  return distance * depth;
}

// For part 2
function productOfDistanceAndDepthWithAim(arr) {
  let distance = 0;
  let depth = 0;
  let aim = 0;

  arr.forEach((move) => {
    if (move.direction === "forward") {
      distance += move.value;
      depth += aim * move.value;
    } else if (move.direction === "down") {
      aim += move.value;
    } else if (move.direction === "up") {
      aim -= move.value;
    }
  });

  return distance * depth;
}
