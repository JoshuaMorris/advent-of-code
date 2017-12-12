'use strict';
const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim();

const getNodes = (input) => {
  const nodes = {};
  const array = input.split('\n').map(parseNode);
  array.forEach(([name, weight, children]) => nodes[name] = { weight, children });
  return nodes;
};

const parseNode = (str) => {
  const [name, weight, ...children] = str.match(/(\w+)/g);
  return [name, parseInt(weight, 10), children];
};

const findRoot = (nodes) => {
  const names = Object.keys(nodes);
  const allChildren = [];
  Object.values(nodes).forEach(n => Array.prototype.push.apply(allChildren, n.children));
  return names.filter(n => allChildren.indexOf(n) < 0).shift();
};

const totalWeight = (name, nodes) => {
  const node = nodes[name];
  return node.weight + node.children.reduce((s, c) => s + totalWeight(c, nodes), 0);
};

const fixWeights = (name, delta) => {
  const node = nodes[name];
  const childrenWeights = node.children.map(c => totalWeight(c, nodes));
  const freq = frequency(childrenWeights);
  if (freq.length === 1) return [name, node.weight + delta];

  const [[n1, f1], [n2, f2]] = freq;
  const outlier = node.children.filter((c, i) => childrenWeights[i] === n2).shift();
  return fixWeights(outlier, n1 - n2);
};

const frequency = (a) => {
  const unique = [...new Set(a)];
  return unique
    .map(x => [x, a.filter(y => x === y).length])
    .sort(([n1, f1], [n2, f2]) => f2 - f1);
};

const nodes = getNodes(input);

const root = findRoot(nodes);
console.log(`Part 1: ${root}`);

const [outlier, fixedWeight] = fixWeights(root, 0);
console.log(`Part 2: ${fixedWeight}`);
