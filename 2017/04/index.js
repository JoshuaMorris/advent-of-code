'use strict';

const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .trim()
  .split('\n')
  .map(row => row.split(' '));

const soln1 = input.filter(
  row => row.length === new Set(row).size
);

const soln2 = input
  .map(row =>
    row.map(word =>
      word
        .split('')
        .sort()
        .join('')
    )
  )
  .filter(row => row.length === new Set(row).size);

console.log(`Part 1: ${soln1.length}`);
console.log(`Part 2: ${soln2.length}`);
