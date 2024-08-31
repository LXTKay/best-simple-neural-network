"use strict";
import { randomNumberBetween, randomFloatBetween } from "./utility/randomNumberBetween.js";
import reLU from "./utility/reLU.js";
import sigmoid from "./utility/sigmoid.js";
import softmax from "./utility/softmax.js";
import tanh from "./utility/tanh.js";
import leakyReLu from "./utility/leakyReLU.js";
import deepClone from "./utility/deepClone.js";

class Node {
  constructor(bias) {
    this.bias = bias;
    this.edges = [];
  }
}

class Edge {
  constructor(weight) {
    this.weight = weight;
    this.nextNode = null;
  }
}

/**
 * The NeuralNetwork class creates a neural network instance.
 *
 * @param {number} amountInputNodes - The number of inputs the neural network receives
 * @param {number} amountOutputNodes - The number of outputs the neural network produces
 * @param {number} amountHiddenLayers - The number of hidden layers in the neural nework
 * @param {number} amountNodesPerLayer - The number of neurons per hidden layer
 * @param {function} weightGenerator - (Optional) The function that generates the weights
 * @param {function} biasGenerator - (Optional) The function that generates the bias
 */
class NeuralNetwork {
  constructor(
    amountInputNodes,
    amountOutputNodes,
    amountHiddenLayers,
    amountNodesPerLayer,
    weightGenerator = function () { return randomFloatBetween(-1, 1); },
    biasGenerator = function () { return randomFloatBetween(-1, 1); }
  ) {

    if (!Number.isInteger(amountInputNodes)) throw new TypeError("Amount of InputNodes must be an integer");
    if (!Number.isInteger(amountOutputNodes)) throw new TypeError("Amount of OutputNodes must be an integer");
    if (!Number.isInteger(amountHiddenLayers)) throw new TypeError("Amount of HiddenLayers must be an integer");
    if (!Number.isInteger(amountNodesPerLayer)) throw new TypeError("Amount of NodesPerLayer must be an integer");
    if (typeof weightGenerator !== "function") throw new TypeError("WeightGenerator must be a function");
    if (typeof biasGenerator !== "function") throw new TypeError("BiasGenerator must be a function");


    const nodes = [];
    // create input nodes
    nodes.push([]);
    for (let inputNode = 0; inputNode < amountInputNodes; inputNode++) {
      nodes[0][inputNode] = new Node(0);
    }
    // create hidden nodes
    for (let currentLayer = 1; currentLayer <= amountHiddenLayers; currentLayer++) {
      if (amountHiddenLayers === 0) break;
      nodes[currentLayer] = [];
      for (let currentNode = 0; currentNode < amountNodesPerLayer; currentNode++) {
        nodes[currentLayer][currentNode] = new Node(biasGenerator());
      }
    }
    // create output nodes
    nodes[1 + amountHiddenLayers] = [];
    for (let currentNode = 0; currentNode < amountOutputNodes; currentNode++) {
      nodes[amountHiddenLayers + 1][currentNode] = new Node(biasGenerator());
    }
    // create edges
    for (let currentLayer = 0; currentLayer < nodes.length - 1; currentLayer++) {
      for (let currentNode = 0; currentNode < nodes[currentLayer].length; currentNode++) {
        nodes[currentLayer][currentNode].edges = [];
        for (let node of nodes[currentLayer + 1]) {
          const edge = new Edge(weightGenerator());
          edge.nextNode = node;
          nodes[currentLayer][currentNode].edges.push(edge);
        }
      }
    }
    this.nodes = nodes;
    this.info = "Neuronal Network created at: " + new Date().toISOString()
      + "\nInputNodes: " + amountInputNodes
      + "\nOutputNodes: " + amountOutputNodes
      + "\nHiddenLayers: " + amountHiddenLayers
      + "\nNodesPerLayer: " + amountNodesPerLayer;
  }

  returnBiases() {
    const biases = [];
    for (const layer of this.nodes) {
      biases.push([])
      for (const node of layer) {
        biases[biases.length - 1].push(node.bias);
      }
    }
    return biases;
  }
  returnWeights() {
    const weights = [];
    for (const layer of this.nodes) {
      weights.push([])
      for (const node of layer) {
        weights[weights.length - 1].push([])
        for (const edge of node.edges) {
          weights[weights.length - 1][weights[weights.length - 1].length - 1].push(edge.weight);
        }
      }
    }
    return weights;
  }

  fire(userInputs) {
    let nextLayerValues = [];
    for (let i = 0; i < this.nodes[1].length; i++) {
      let currentValue = 0;
      for (let j = 0; j < this.nodes[0].length; j++) {
        currentValue += userInputs[j] * this.nodes[0][j].edges[i].weight;
      }
      nextLayerValues.push(this.neuronActivationFunction(currentValue + this.nodes[1][i].bias));
    }

    let currentLayerValues = nextLayerValues;
    nextLayerValues = [];
    for (let i = 1; i < this.nodes.length - 1; i++) {
      for (let j = 0; j < this.nodes[i + 1].length; j++) {
        let currentValue = 0;
        for (let k = 0; k < this.nodes[i].length; k++) {
          currentValue += currentLayerValues[k] * this.nodes[i][k].edges[j].weight;
        }
        nextLayerValues.push(this.neuronActivationFunction(currentValue + this.nodes[i + 1][j].bias));
      }
      currentLayerValues = nextLayerValues;
      nextLayerValues = [];
    }

    if (typeof this.finalOperation !== "function") return currentLayerValues;
    return this.finalOperation(currentLayerValues);

  }
  finalOperation = softmax;
  set finalOperation(value) {
    if (typeof value !== "function"
      && value !== null) {
      throw new TypeError("Final operation must be a function or null");
    }
    this.finalOperation = value;
  }
  iterateEachNode(userFunction) {
    for (let layer of this.nodes) {
      for (let node of layer) {
        userFunction(node);
      }
    }
  }
  clone() {
    const newNNinstance = new this.constructor(
      this.nodes[0].length,
      this.nodes[this.nodes.length - 1].length,
      this.nodes.length - 2,
      this.nodes[2] ? this.nodes[1].length : 0,
      this.weightGenerator,
      this.biasGenerator
    );
    newNNinstance.finalOperation = this.finalOperation;
    newNNinstance.neuronActivationFunction = this.neuronActivationFunction;
    newNNinstance.nodes = deepClone(this.nodes);
    return newNNinstance;
  }
  //Utilities
  static randomFloatBetween = randomFloatBetween;
  static randomNumberBetween = randomNumberBetween;
  neuronActivationFunction = reLU;
  static reLU = reLU;
  static sigmoid = sigmoid;
  static tanh = tanh;
  static leakyReLU = leakyReLU;
  static softmax = softmax;
}

export default NeuralNetwork;