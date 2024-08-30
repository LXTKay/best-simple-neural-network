function numberSafetyCheck(array) {
  array.forEach(element => {
    if (element === NaN) element = 0;
    if (element === -Infinity) element = Number.MIN_SAFE_INTEGER;
    if (element === Infinity) element = Number.MAX_SAFE_INTEGER;
    element = Number(element.toFixed(8));
  });
  return array;
}

export default function softmax(inputArray) {
  inputArray = numberSafetyCheck(inputArray);
  const MAX = Math.max(...inputArray);
  let limitedInputs = inputArray.map(val => val - MAX);

  let exponentiatedInputs = limitedInputs.map(val => Math.exp(val));

  const SUM = exponentiatedInputs.reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);

  let normalisedInputs = exponentiatedInputs.map(val => val / SUM);

  return normalisedInputs;
}

