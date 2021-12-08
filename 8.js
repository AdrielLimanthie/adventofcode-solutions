// For part 1
function countEasyDigits(rawInput) {
  let entries = rawInput
    .split(/\n|\n\r/)
    .filter(Boolean)
    .map((entry) => entry.split(" | ")[1].split(" "));
  let count = 0;
  entries.forEach((entry) => {
    entry.forEach((digit) => {
      if ([2, 3, 4, 7].includes(digit.length)) {
        count++;
      }
    });
  });

  return count;
}

// For part 2
function getSumOfEntries(rawInput) {
  function parseDigits(entry) {
    return entry.split(" ").map((digit) => digit.split("").sort().join(""));
  }

  function areCharsInString(chars, str) {
    return chars.every((char) => str.includes(char));
  }

  function deducePattern(pattern) {
    let sortedPattern = pattern.sort((a, b) => a.length - b.length);
    let dict = {};
    let one = sortedPattern.shift(),
      seven = sortedPattern.shift(),
      four = sortedPattern.shift(),
      eight = sortedPattern.pop();
    dict[one] = 1;
    dict[seven] = 7;
    dict[four] = 4;
    dict[eight] = 8;

    let fiveSegments = sortedPattern.slice(0, 3);
    let three = fiveSegments.find((p) => areCharsInString(one.split(""), p));
    let five = fiveSegments.find((p) =>
      areCharsInString(
        four.split("").filter((char) => !one.includes(char)),
        p
      )
    );
    let two = fiveSegments.find((p) => p !== three && p !== five);
    dict[three] = 3;
    dict[five] = 5;
    dict[two] = 2;

    let sixSegments = sortedPattern.slice(3);
    let nine = sixSegments.find((p) => areCharsInString(four.split(""), p));
    let zero = sixSegments.find(
      (p) => areCharsInString(one.split(""), p) && p !== nine
    );
    let six = sixSegments.find((p) => p !== zero && p !== nine);
    dict[zero] = 0;
    dict[nine] = 9;
    dict[six] = 6;

    return dict;
  }

  let entries = rawInput
    .split(/\n|\n\r/)
    .filter(Boolean)
    .map((entry) => {
      let parts = entry.split(" | ");
      return {
        pattern: parseDigits(parts[0]),
        output: parseDigits(parts[1]),
      };
    });

  let outputs = entries.map((entry) => {
    let dict = deducePattern(entry.pattern);
    let { output } = entry;
    return output.reduce((final, digit) => final + dict[digit], "");
  });

  return outputs.reduce((sum, output) => sum + Number(output), 0);
}
