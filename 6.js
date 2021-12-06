function parseFish(rawInput) {
  return rawInput.split(",").filter(Boolean).map(Number);
}

function countFishAfterDays(input, days = 80) {
  let fishList = parseFish(input);
  let fishByCycle = new Array(9).fill(0);

  fishList.forEach((fish) => {
    fishByCycle[fish] = (fishByCycle[fish] || 0) + 1;
  });

  for (let day = 0; day < days; day++) {
    let newFishByCycle = new Array(9).fill(0);
    fishByCycle.forEach((numOfFish, cycle) => {
      if (cycle === 0) {
        newFishByCycle[8] = numOfFish;
        newFishByCycle[6] = numOfFish;
      } else if (cycle === 7) {
        newFishByCycle[6] = newFishByCycle[6] + numOfFish;
      } else {
        newFishByCycle[cycle - 1] = numOfFish;
      }
    });
    fishByCycle = newFishByCycle;
  }

  return fishByCycle.reduce((total, numOfFish) => {
    return total + numOfFish;
  }, 0);
}

// For part1
const countFishAfter80Days = (input) => countFishAfterDays(input);
// For part2
const countFishAfter256Days = (input) => countFishAfterDays(input, 256);
