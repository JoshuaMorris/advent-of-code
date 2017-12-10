'use strict';

const fs = require('fs');

const parse = (input, fn) =>
  input.reduce((total, row) =>
    total + fn(row.split(/\s/).map(Number)), 0);

const soln1 = val => (Math.max(...val) - Math.min(...val));

const soln2 = (values) => {
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length; j++) {
      if (i !== j && values[i] % values[j] === 0) {
        return values[i] / values[j];
      }
    }
  }
};

const input = fs
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n');

console.log(
  `Part one: ${parse(
    input,
    soln1
  )}`
);

console.log(
  `Part two: ${parse(
    input,
    soln2
  )}`
);

console.assert(parse(
  input,
  soln1
) === 53978);

console.assert(parse(
  input,
  soln2
) === 314);
