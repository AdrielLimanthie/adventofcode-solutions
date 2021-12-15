function parseDots(input) {
  let [dotSection, foldSection, ...rest] = input.split(/\n\n|\r\n\r\n/);
  let dots = dotSection
    .split(/\n|\r\n/)
    .map((row) => row.split(",").map(Number));
  let folds = foldSection
    .split(/\n|\r\n/)
    .filter(Boolean)
    .map((row) => {
      let [text, value] = row.split("=");
      if (text.endsWith("x")) {
        return [Number(value), null];
      } else {
        return [null, Number(value)];
      }
    });
  return {
    dots,
    folds,
  };
}

function transformDotsOnFold(dots, fold) {
  let [foldX, foldY] = fold;

  if (foldY === null) {
    // Fold left
    let newDots = dots.reduce((result, dot) => {
      if (dot[0] === foldX) {
        return result;
      }
      let newX = dot[0] > foldX ? 2 * foldX - dot[0] : dot[0],
        newY = dot[1];
      if (
        !result.some(
          (currentDot) => currentDot[0] === newX && currentDot[1] === newY
        )
      ) {
        result.push([newX, newY]);
      }
      return result;
    }, []);
    return newDots;
  } else {
    // Fold up
    let newDots = dots.reduce((result, dot) => {
      if (dot[1] === foldY) {
        return result;
      }
      let newX = dot[0],
        newY = dot[1] > foldY ? 2 * foldY - dot[1] : dot[1];
      if (
        !result.some(
          (currentDot) => currentDot[0] === newX && currentDot[1] === newY
        )
      ) {
        result.push([newX, newY]);
      }
      return result;
    }, []);
    return newDots;
  }
}

// For part 1
function countDotsAfterFoldingOnce(input) {
  let { dots, folds } = parseDots(input);

  let newDots = transformDotsOnFold(dots, folds[0]);

  return newDots.length;
}

// For part 2
function drawDotsAfterFolding(input) {
  let { dots, folds } = parseDots(input);

  folds.forEach((fold) => {
    dots = transformDotsOnFold(dots, fold);
  });

  let maxX = 0,
    maxY = 0;
  dots.forEach((dot) => {
    if (maxX < dot[0]) {
      maxX = dot[0];
    }
    if (maxY < dot[1]) {
      maxY = dot[1];
    }
  });

  let drawing = new Array(maxY + 1)
    .fill()
    .map(() => new Array(maxX + 1).fill("."));
  dots.forEach((dot) => {
    drawing[dot[1]][dot[0]] = "#";
  });
  console.log(drawing.map((line) => line.join("")).join("\n"));
}
