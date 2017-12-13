'use strict';

const fs = require('fs');

const clean = (data) => {
  const ignore = /!./g;
  const garbage = /<.*?>/g;

  data = data.replace(ignore, '');

  const isCleaned = data
    .replace(garbage, '')
    .replace(/,/g, '');

  const sizeOfGarbage = data.match(garbage)
    .map(str => str.length - 2)
    .reduce((str, len) => str + len, 0);

  return [isCleaned, sizeOfGarbage];
};

const score = (data) => {
  let total = 0;
  let curr = 1;

  data.split('').map((c) => {
    switch(c) {
    case '{':
      total += curr;
      curr++;
      break;

    case '}':
      curr--;
      break;
    }
  });

  return total;
};

const input = fs.readFileSync('input.txt', 'utf8').trim();
const [isCleaned, sizeOfGarbage] = clean(input);

console.log(`Part 1: ${score(isCleaned)}`);
console.log(`Part 2: ${sizeOfGarbage}`);
