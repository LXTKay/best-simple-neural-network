function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloatBetween(min, max) {
  return (Math.random() * (max - min + 1) + min);
};

export { randomNumberBetween, randomFloatBetween }