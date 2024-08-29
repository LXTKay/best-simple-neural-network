"use strict";
import { randomNumberBetween, randomFloatBetween } from "./utility/randomNumberBetween.js";
import reLu from "./utility/reLU.js";
import softmax from "./utility/softmax.js";

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

class NeuralNetwork {
  constructor(
    amountInputNodes,
    amountOutputNodes,
    amountHiddenLayers,
    amountNodesPerLayer,
    weightGenerator = function () { return randomNumberBetween(-1, 1); },
    biasGenerator = function () { return randomNumberBetween(-1, 1); }
  ) {
    try {
      if (!Number.isInteger(amountInputNodes)) throw new TypeError("Amount of InputNodes must be an integer");
      if (!Number.isInteger(amountOutputNodes)) throw new TypeError("Amount of OutputNodes must be an integer");
      if (!Number.isInteger(amountHiddenLayers)) throw new TypeError("Amount of HiddenLayers must be an integer");
      if (!Number.isInteger(amountNodesPerLayer)) throw new TypeError("Amount of NodesPerLayer must be an integer");
      if (typeof weightGenerator !== "function") throw new TypeError("WeightGenerator must be a function");
      if (typeof biasGenerator !== "function") throw new TypeError("BiasGenerator must be a function");
    }
    catch (e) {
      throw e;
    }

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
    if (userInputs.length !== this.nodes[0].length) {
      throw new Error("Input array must have same length as the input layer");
    }
    console.log("Firing Neural Network with inputs: " + userInputs);
    let nextLayerValues = []
    for (let i = 0; i < this.nodes[1].length; i++) {
      let currentValue = 0;
      for (let node of this.nodes[0]) {
        currentValue += userInputs[i] * node.edges[i].weight + node.edges[i].nextNode.bias;
      }
      nextLayerValues.push(this.neuronActivationFunction(currentValue))
    }

    console.log("Neural Network Input LayerOutput: " + nextLayerValues);
    console.log("Moving on to hidden layers...")

    let newValuesArray = []
    for (let currentLayerIndex = 1; currentLayerIndex - 1 < this.nodes.length; currentLayerIndex++) {
      console.log("Current Layer: " + currentLayerIndex);
      for (let i = 0; i < this.nodes[currentLayerIndex + 1].length; i++) {
        let currentValue = 0;
        for (let node of this.nodes[currentLayerIndex]) {
          currentValue += nextLayerValues[i] * node.edges[i].weight + node.edges[i].nextNode.bias;
        }
        newValuesArray.push(this.neuronActivationFunction(currentValue))
      }
      nextLayerValues = newValuesArray;
    }

    if (typeof this.finalOperation !== "function") return nextLayerValues;
    return this.finalOperation(nextLayerValues);

  }
  finalOperation = softmax;
  set finalOperation(value) {
    if (typeof value !== "function"
      && value !== null) {
      throw new TypeError("Final operation must be a function or null");
    }
    this.finalOperation = value;
  }
  //Utilities
  neuronActivationFunction = reLu;
  reLu = reLu;

}

export default NeuralNetwork;