function parseInputToArray(str) {
  return str.split('\n').map(Number);
}

// For part 1
function countLargerNextValue(arr) {
  let prev = null, count = 0;
  
  arr.forEach(val => {
    if (prev !== null) {
      if (val > prev) {
        count++;
      }
    }
    prev = val;
  });
  
  return count;
}

// For part 2
function countThreeLargerNextValue(arr) {
  let prev = null, count = 0;
  
  for (let i = 0; i < arr.length - 2; i++) {
    if (i === 0) {
      prev = arr[i] + arr[i + 1] + arr[i + 2];
    } else {
      let current = prev - arr[i - 1] + arr[i + 2];
      if (current > prev) {
        count++;
      }
      prev = current;
    }
  }
  
  return count;
}
