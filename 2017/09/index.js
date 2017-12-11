'use strict';

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim();

const clean = (data) => {
  const ignore = /!./g;
  const garbage = /<.*?>/g;

  data = data.replace(ignore, '');

  const isCleaned = data.replace(garbage, '').replace(/,/g, '');

  return isCleaned;
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

console.log(`Part 1: ${score(clean(input))}`);
