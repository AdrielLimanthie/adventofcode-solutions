function parseData(input) {
  let [template, rawTable] = input.split(/\n\n|\r\n\r\n/);

  let insertionTable = rawTable
    .split(/\n|\r\n/)
    .filter(Boolean)
    .reduce((table, row) => {
      let [key, value] = row.split(" -> ");
      table[key] = {
        element: value,
        insertedPairs: [
          `${key.slice(0, 1)}${value}`,
          `${value}${key.slice(1)}`,
        ],
      };
      return table;
    }, {});

  let pairs = {};
  for (let i = 0; i < template.length - 1; i++) {
    let pair = template.substring(i, i + 2);
    pairs[pair] = (pairs[pair] || 0) + 1;
  }

  return {
    template,
    pairs,
    insertionTable,
  };
}

function getMinMaxDifference(input, totalStep) {
  let { template, pairs, insertionTable } = parseData(input);

  let elementCounter = {};
  template.split("").forEach((element) => {
    elementCounter[element] = (elementCounter[element] || 0) + 1;
  });

  for (let step = 0; step < totalStep; step++) {
    let newPairs = {};
    let pairList = Object.keys(pairs);
    pairList.forEach((pair) => {
      let { element, insertedPairs } = insertionTable[pair];
      const pairCount = pairs[pair];
      elementCounter[element] = (elementCounter[element] || 0) + pairCount;
      insertedPairs.forEach((p) => {
        newPairs[p] = (newPairs[p] || 0) + pairCount;
      });
    });

    pairs = newPairs;
  }

  let min = Infinity,
    max = 0;
  Object.keys(elementCounter).forEach((element) => {
    let count = elementCounter[element];
    if (count > max) {
      max = count;
    }
    if (count < min) {
      min = count;
    }
  });

  return max - min;
}

// For part 1
function getMinMaxDifferenceAfterTenSteps(input) {
  return getMinMaxDifference(input, 10);
}

// For part 2
function getMinMaxDifferenceAfterFortySteps(input) {
  return getMinMaxDifference(input, 40);
}
