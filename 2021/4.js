function parseBingoInput(str) {
  let rawInput = str.split("\n").filter(Boolean);
  // Get the sequence of numbers to be called
  let sequence = rawInput.shift().split(",").map(Number);

  // Parse each bingo board
  let bingos = [],
    i = 0;
  while (i < rawInput.length) {
    if (i % 5 === 0) {
      bingos.push([]);
    }
    let rawBingo = rawInput[i];
    bingos[bingos.length - 1][i % 5] = rawBingo
      .split(/\s+/)
      .filter(Boolean)
      .map((value) => ({
        value: Number(value),
        drawn: false,
      }));
    i++;
  }

  return [sequence, bingos];
}

// For part 1
function findWinningBingoScore(rawInput) {
  let [sequence, bingos] = parseBingoInput(rawInput);
  let index = 0,
    winners = [];

  while (winners.length === 0 && index < sequence.length) {
    let drawnNumber = sequence[index];

    bingos.forEach((board) => {
      // Mark the drawn number onto each bingo board
      let i = 0,
        marked = false;
      while (i < board.length && !marked) {
        let j = 0;
        while (j < board[i].length && !marked) {
          if (board[i][j].value === drawnNumber) {
            board[i][j].drawn = true;
            marked = true;
          }
          j++;
        }
        i++;
      }

      // Check if there's a winning line after the drawn number
      i = 0;
      let found = board.some((row) => row.every((cell) => cell.drawn));
      if (!found) {
        let columns = new Array(5).fill(null).map(() => []);
        board.forEach((row, rowIndex) => {
          row.forEach((cell, cellIndex) => {
            columns[cellIndex][rowIndex] = cell;
          });
        });
        found = columns.some((column) => column.every((cell) => cell.drawn));
      }

      // If there is a winning line, add this board to winner list
      if (found) {
        winners.push(board);
      }
    });

    index++;
  }

  // Calculate winning score of each winning bingo board
  let lastDrawnNumber = sequence[index - 1];
  let winningScores = winners.map((board) => {
    let sum = 0;
    board.forEach((row) => {
      row.forEach((cell) => {
        if (!cell.drawn) {
          sum += cell.value;
        }
      });
    });

    return sum * lastDrawnNumber;
  });

  // Find the highest winning score
  return winningScores.sort((a, b) => b - a)[0];
}

// For part 2
function findLastWinningBingoScore(rawInput) {
  let [sequence, bingos] = parseBingoInput(rawInput);
  let index = 0,
    winners = [];

  while (winners.length === 0 && index < sequence.length) {
    let drawnNumber = sequence[index];

    bingos.forEach((board) => {
      // Mark the drawn number onto each bingo board
      let i = 0,
        marked = false;
      while (i < board.length && !marked) {
        let j = 0;
        while (j < board[i].length && !marked) {
          if (board[i][j].value === drawnNumber) {
            board[i][j].drawn = true;
            marked = true;
          }
          j++;
        }
        i++;
      }

      // Check if there's a winning line after the drawn number
      i = 0;
      let found = board.some((row) => row.every((cell) => cell.drawn));
      if (!found) {
        let columns = new Array(5).fill(null).map(() => []);
        board.forEach((row, rowIndex) => {
          row.forEach((cell, cellIndex) => {
            columns[cellIndex][rowIndex] = cell;
          });
        });
        found = columns.some((column) => column.every((cell) => cell.drawn));
      }

      // If there is a winning line, add this board to winner list
      if (found) {
        winners.push(board);
      }
    });

    // Take out winning boards from the original bingo board list
    winners.forEach((winningBoard) => {
      let index = bingos.findIndex((board) => board === winningBoard);
      bingos.splice(index, 1);
    });

    // Reset winners if there are still bingo boards left to check
    if (bingos.length > 0) {
      winners = [];
    }

    index++;
  }

  // Calculate winning score of each winning bingo board
  let lastDrawnNumber = sequence[index - 1];
  let winningScores = winners.map((board) => {
    let sum = 0;
    board.forEach((row) => {
      row.forEach((cell) => {
        if (!cell.drawn) {
          sum += cell.value;
        }
      });
    });

    return sum * lastDrawnNumber;
  });

  // Find the lowest winning score
  return winningScores.sort((a, b) => a - b)[0];
}
