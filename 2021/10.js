function parseCode(input) {
  return input.split(/\n|\r\n/).filter(Boolean);
}

// For part 1
function calculateSyntaxErrorScore(input) {
  const SCORE_TABLE = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };
  const OPENING_BRACKET = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<",
  };

  let lines = parseCode(input);
  let score = 0;

  lines.forEach((line) => {
    let stack = [],
      i = 0,
      foundError = false;

    while (!foundError && i < line.length) {
      let char = line.charAt(i);
      if (["(", "[", "{", "<"].includes(char)) {
        stack.push(char);
      } else if (stack[stack.length - 1] === OPENING_BRACKET[char]) {
        stack.pop();
      } else {
        foundError = true;
        score += SCORE_TABLE[char];
      }
      i++;
    }
  });

  return score;
}

// For part 2
function calculateAutocompleteScore(input) {
  const SCORE_TABLE = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };
  const OPENING_BRACKET = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<",
  };
  const CLOSING_BRACKET = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
  };

  function calculateLineScore(arr, currentScore) {
    if (arr.length === 0) {
      return currentScore;
    }
    currentScore = currentScore * 5 + SCORE_TABLE[arr.shift()];
    return calculateLineScore(arr, currentScore);
  }

  let lines = parseCode(input);
  let scores = [];

  lines = lines.filter((line) => {
    let stack = [],
      i = 0,
      foundError = false;

    while (!foundError && i < line.length) {
      let char = line.charAt(i);
      if (["(", "[", "{", "<"].includes(char)) {
        stack.push(char);
      } else if (stack[stack.length - 1] === OPENING_BRACKET[char]) {
        stack.pop();
      } else {
        foundError = true;
      }
      i++;
    }

    return !foundError;
  });

  lines.forEach((line) => {
    let stack = [],
      i = 0;

    while (i < line.length) {
      let char = line.charAt(i);
      if (["(", "[", "{", "<"].includes(char)) {
        stack.push(char);
      } else if (stack[stack.length - 1] === OPENING_BRACKET[char]) {
        stack.pop();
      }
      i++;
    }

    let completion = [];
    while (stack.length > 0) {
      completion.push(CLOSING_BRACKET[stack.pop()]);
    }

    scores.push(calculateLineScore(completion, 0));
  });

  scores = scores.sort((a, b) => a - b);
  return scores.length % 2 === 1
    ? scores[(scores.length - 1) / 2]
    : (scores[scores.length / 2] + scores[scores.length / 2 - 1]) / 2;
}
