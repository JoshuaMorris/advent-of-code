'use strict';

const fs = require('fs');

const distance = (path) => {
  let dist, max = 0, x = 0, y = 0, z = 0;
  path.forEach(d => {
    switch (d) {
    case 'n': y++; z--; break;
    case 'ne': x++; z--; break;
    case 'se': x++; y--; break;
    case 's': y--; z++; break;
    case 'sw': x--; z++; break;
    case 'nw': x--; y++; break;
    }
    dist = Math.max(Math.abs(x), Math.abs(y), Math.abs(z));
    if (dist > max) max = dist;
  });
  return [dist, max];
};

const input = fs.readFileSync('input.txt', 'utf8').trim().split(',');

const [dist, max] = distance(input);
console.log(`Part 1: ${dist}`);
console.log(`Part 2: ${max}`);
