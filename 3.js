function parseInput(str) {
  return str.split('\n').filter(Boolean);
}

// For part 1
function calculatePowerConsumption(arr) {
  let bitCount = arr[0].length;
  let countOfOneAtEachBit = (new Array(bitCount)).fill(0);
  arr.forEach(value => {
    for (let i = 0; i < bitCount; i++) {
      if (value.charAt(i) === '1') {
        countOfOneAtEachBit[i] = countOfOneAtEachBit[i] + 1;
      }
    }
  })

  let gamma = '';
  countOfOneAtEachBit.forEach(count => {
    if (count * 2 > arr.length) {
      gamma = gamma + '1';
    } else {
      gamma = gamma + '0';
    }
  })
  let epsilon = gamma.split('').map(value => value === '1' ? '0' : '1').join('');

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

// For part 2
function calculateLifeSupportRating(arr) {
  let bitCount = arr[0].length;
  let oxygenArr = [...arr], co2Arr = [...arr];
  for (let bit = 0; bit < bitCount; bit ++) {
    if (oxygenArr.length === 1) {
      break;
    }

    let arrOfOne = [], arrOfZero = [];

    oxygenArr.forEach(value => {
      if (value.charAt(bit) === '1') {
        arrOfOne.push(value);
      } else {
        arrOfZero.push(value);
      }
    })

    if (arrOfOne.length >= arrOfZero.length) {
      oxygenArr = arrOfOne;
    } else {
      oxygenArr = arrOfZero;
    }
  }

  
  for (let bit = 0; bit < bitCount; bit ++) {
    if (co2Arr.length === 1) {
      break;
    }

    let arrOfOne = [], arrOfZero = [];

    co2Arr.forEach(value => {
      if (value.charAt(bit) === '1') {
        arrOfOne.push(value);
      } else {
        arrOfZero.push(value);
      }
    })

    if (arrOfZero.length <= arrOfOne.length) {
      co2Arr = arrOfZero;
    } else {
      co2Arr = arrOfOne;
    }
  }

  return parseInt(oxygenArr[0], 2) * parseInt(co2Arr[0], 2);
}
