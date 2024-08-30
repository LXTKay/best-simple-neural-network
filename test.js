import NeuralNetwork from "./nn.js";

const nn = new NeuralNetwork(5, 5, 10, 4);

console.log(nn.info);
console.log(nn.fire([1.5, -1, 2, 4, 1]));