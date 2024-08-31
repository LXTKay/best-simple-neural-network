import NeuralNetwork from "./nn.js";


const nn = new NeuralNetwork(2, 1, 3, 3);
console.log("Bias Matrix");
console.log(nn.returnBiasMatrix());
console.log("Weight Matrix");
console.log(nn.returnWeightMatrix());