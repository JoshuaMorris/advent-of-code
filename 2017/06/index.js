'use strict';

const fs = require('fs');
const R = require('ramda');

const matchSet = (memory, state) => {
  const curr = memory.join(',');
  const exists = state.has(curr);
  if (!exists) {
    state.add(curr);
  }
  return exists;
};

const redistribute = (mem) => {
  const max = R.reduce(R.max, -Infinity, mem);
  let i = R.indexOf(max, mem);
  let blocks = mem[i];
  mem[i] = 0;
  while(blocks > 0) {
    i = (i + 1) % mem.length;
    mem[i]++;
    blocks--;
  }
};

const counter = (memory) => {
  let state = new Set();
  let cycles = 0;

  while(!matchSet(memory, state)) {
    redistribute(memory);
    cycles++;
  }

  console.log(`Part 1: ${cycles}`);

  let match = memory.join(',');
  redistribute(memory);
  cycles = 1;
  while(match !== memory.join(',')) {
    cycles++;
    redistribute(memory);
  }

  console.log(`Part 2: ${cycles}`);
};

const soln = R.pipe(
  R.split('\t'),
  R.map(Number),
  counter
);

soln(fs.readFileSync('./test.txt', 'utf8'));
soln(fs.readFileSync('./input.txt', 'utf8'));












