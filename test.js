import NeuralNetwork from "./nn.js";


const nn = new NeuralNetwork(2, 1, 3, 3);
console.log(nn.nodes);
const nn2 = nn.clone();
console.log(nn2.nodes);