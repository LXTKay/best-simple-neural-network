import NeuralNetwork from "./nn.js";

const nn = new NeuralNetwork(2, 2, 5, 4);

console.log(nn.info);
console.log(nn.fire([1, 1]));