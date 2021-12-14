function parseEnergyLevel(input) {
  return input
    .split(/\n|\r\n/)
    .filter(Boolean)
    .map((row) => row.split("").map(Number));
}

function incrementEnergy(map, v, h) {
  if (v < 0 || h < 0 || v >= map.length || h >= map[v].length) {
    return 0;
  }

  let newEnergy = map[v][h] + 1;
  map[v][h] = newEnergy;

  if (newEnergy === 10) {
    return (
      1 +
      incrementEnergy(map, v - 1, h - 1) +
      incrementEnergy(map, v - 1, h) +
      incrementEnergy(map, v - 1, h + 1) +
      incrementEnergy(map, v, h - 1) +
      incrementEnergy(map, v, h + 1) +
      incrementEnergy(map, v + 1, h - 1) +
      incrementEnergy(map, v + 1, h) +
      incrementEnergy(map, v + 1, h + 1)
    );
  } else {
    return 0;
  }
}

// For part 1
function countTotalFlashes(input) {
  let octopuses = parseEnergyLevel(input);
  let flashCount = 0;

  for (let time = 0; time < 100; time++) {
    // increment energy level
    for (let v = 0; v < octopuses.length; v++) {
      for (let h = 0; h < octopuses[v].length; h++) {
        flashCount += incrementEnergy(octopuses, v, h);
      }
    }

    // reset energy level > 9 to 0
    for (let v = 0; v < octopuses.length; v++) {
      for (let h = 0; h < octopuses[v].length; h++) {
        if (octopuses[v][h] > 9) {
          octopuses[v][h] = 0;
        }
      }
    }
  }

  return flashCount;
}

// For part 2
function findSimultaneousFlash(input) {
  let octopuses = parseEnergyLevel(input);
  let step = 0,
    found = false;

  while (!found) {
    // increment energy level
    for (let v = 0; v < octopuses.length; v++) {
      for (let h = 0; h < octopuses[v].length; h++) {
        incrementEnergy(octopuses, v, h);
      }
    }

    // reset energy level > 9 to 0
    for (let v = 0; v < octopuses.length; v++) {
      for (let h = 0; h < octopuses[v].length; h++) {
        if (octopuses[v][h] > 9) {
          octopuses[v][h] = 0;
        }
      }
    }

    // check if all octopuses flashed
    if (octopuses.every((row) => row.every((energy) => energy === 0))) {
      found = true;
    }

    step++;
  }

  return step;
}
