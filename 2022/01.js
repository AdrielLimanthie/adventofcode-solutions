// @ts-check
const fs = require('fs');

function parse(input) {
  return input.split('\n\n').map(foods => foods.split('\n').map(Number));
}

function sum(foods) {
  return foods.reduce((total, food) => { return total + food }, 0);
}

function getMostCalories(input) {
  const data = parse(input);
  let max = 0;
  for (const foods of data) {
    const totalCalories = sum(foods);
    if (totalCalories > max) {
      max = totalCalories;
    }
  }

  return max;
}

function getTopThreeMostCalories(input) {
  const data = parse(input);
  let maxes = [0, 0, 0];

  for (const foods of data) {
    const totalCalories = sum(foods);

    let i = 0;
    while (maxes[i] < totalCalories) {
      i++;
    }

    for (let j = 0; j < i; j++) {
      maxes[j] = j + 1 === i ? totalCalories : maxes[j + 1];
    }
  }
  
  return sum(maxes);
}

const input = fs.readFileSync(`${__dirname}/01.input`, 'utf-8');
console.log(getMostCalories(input));
console.log(getTopThreeMostCalories(input));
