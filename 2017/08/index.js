'use strict';

const fs = require('fs');

const exec = (instruction, registers, runtime) => {
  const [reg, mod, amnt, op1, cond, op2] = instruction;
  let reg1 = registers[reg];
  let reg2 = registers[op1];
  if (cond(reg2, op2)) {
    reg1 = mod(reg1, amnt);
    registers[reg] = reg1;
  }
  if (reg1 > runtime[reg]) runtime[reg] = reg1;
};

const pushIns = (instructions, registers, runtime) => {
  instructions.forEach(e => exec(e, registers, runtime));
};

const initReg = (instructions) => {
  const r = {};
  const m = {};
  instructions.forEach(e => {
    const [a, x, y, b] = e;
    r[a] = r[b] = 0;
    m[a] = m[b] = 0;
  });
  return [r, m];
};

const getOperator = (str) => {
  switch(str) {
  case 'inc': return (a, b) => a + b;
  case 'dec': return (a, b) => a - b;
  }
};

const getComp = (str) => {
  switch(str) {
  case '==': return (a, b) => a === b;
  case '!=' : return (a, b) => a !== b;
  case '<=' : return (a, b) => a <= b;
  case '>=' : return (a, b) => a >= b;
  case '<' : return (a, b) => a < b;
  case '>' : return (a, b) => a > b;
  }
};

const parse = (str) => {
  const [reg, mod, amnt, junk, op1, cond, op2] = str.split(' ');
  return [
    reg,
    getOperator(mod),
    parseInt(amnt),
    op1,
    getComp(cond),
    parseInt(op2)
  ];
};

const soln = (input) => {
  const instructions = input.split('\n').map(s => parse(s));
  const [registers, runtime] = initReg(instructions);
  pushIns(instructions, registers, runtime);

  return [
    Math.max.apply(null, Object.values(registers)),
    Math.max.apply(null, Object.values(runtime))
  ];
};

const test = fs.readFileSync('test.txt', 'utf8').trim();
const input = fs.readFileSync('input.txt', 'utf8').trim();

console.log(`test: ${soln(test)}`);
console.assert(soln(test)[0] === 1);
console.assert(soln(test)[1] === 10);

console.log(`Part 1: ${soln(input)[0]}`);
console.log(`Part 2: ${soln(input)[1]}`);
