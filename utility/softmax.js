export default function softmax(inputArray) {
  const MAX = Math.max(...inputArray);
  let limitedInputs = inputArray.map(val => val - MAX);

  let exponentiatedInputs = limitedInputs.map(val => Math.exp(val));

  const SUM = exponentiatedInputs.reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);

  let normalisedInputs = exponentiatedInputs.map(val => val / SUM);

  return normalisedInputs;
}