function parseCrabPositions(rawInput) {
  return rawInput.split(",").filter(Boolean).map(Number);
}

function getTheLeastFuel(input, calculateFuelForDistance) {
  let positions = parseCrabPositions(input).sort((a, b) => a - b);
  let currentPos = positions[0],
    delta = Infinity,
    targetDelta = null;

  function calculateDelta(positions, current) {
    return positions.reduce(
      (total, pos) => calculateFuelForDistance(Math.abs(pos - current)) + total,
      0
    );
  }

  while (
    targetDelta === null &&
    currentPos <= positions[positions.length - 1]
  ) {
    let currentDelta = calculateDelta(positions, currentPos);
    if (currentDelta < delta) {
      delta = currentDelta;
    } else if (currentDelta > delta) {
      targetDelta = delta;
    }
    currentPos++;
  }

  return targetDelta;
}

// For part 1
function getTheLeastFuelPart1(input) {
  return getTheLeastFuel(input, (value) => value);
}
// For part 2
function getTheLeastFuelPart2(input) {
  let dict = [];
  function calculateFuelForDistance(n) {
    if (dict[n]) {
      return dict[n];
    }

    let lastDistanceInDict = dict.length - 1;
    for (let i = lastDistanceInDict + 1; i <= n; i++) {
      dict[i] = (dict[i - 1] || 0) + i;
    }

    return dict[n];
  }
  return getTheLeastFuel(input, calculateFuelForDistance);
}
