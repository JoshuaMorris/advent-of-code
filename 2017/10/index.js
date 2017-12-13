'use strict';

const fs = require('fs');

function range(n) {
  return Array.from(Array(n).keys());
}

const hasher = (arr, len, rounds = 1) => {
  let pos = 0, skip = 0;
  for (let r = 0; r < rounds; r++) {
    for (const l of len) {
      if (l > 1) {
        arr = [...arr.slice(pos), ...arr.slice(0, pos)];
        arr = [...arr.slice(0, l).reverse(), ...arr.slice(l)];
        arr = [...arr.slice(-pos), ...arr.slice(0, -pos)];
      }

      pos = (pos + l + skip) % arr.length;
      skip++;
    }
  }
  return arr;
};

const denserHasher = (arr) => {
  const hash = [];
  for (let b = 0; b < 16; b++) {
    const xor = arr
      .slice(b * 16, (b + 1) * 16)
      .reduce((x, n) => x ^ n);
    hash.push(xor);
  }
  return hash;
};

const test = fs.readFileSync('test.txt', 'utf8').trim();
const input = fs.readFileSync('input.txt', 'utf8').trim();

console.log(`Test 1: ${hasher(range(5), test.split(',').map(s => parseInt(s))).slice(0, 2).reduce((p, n) => p * n)}`);
console.assert(hasher(range(5), test.split(',').map(s => parseInt(s))).slice(0, 2).reduce((p, n) => p * n) === 12);
console.log(`Part 1: ${hasher(range(256), input.split(',').map(s => parseInt(s))).slice(0, 2).reduce((p, n) => p * n)}`);
console.log(`Part 2: ${Buffer.from(denserHasher(hasher(range(256), input.split('').map(c => c.charCodeAt()).concat([17, 31, 73, 47, 23]), 64))).toString('hex')}`);
