const fs = require('fs');

const org = (prod) => {
  return new Map(prod.split('\n').map(parse));
};

const parse = (str) => {
  const [p, rest] = str.split(' <-> ');
  const connected = rest.split(', ').map(s => parseInt(s));
  return [parseInt(p), connected];
};

const group = (p, pipes) => {
  const v = [];
  const g = [p];
  while (g.length) {
    let nxt = g.pop();
    pipes.get(nxt)
      .filter(i => !v.includes(i))
      .forEach(i => {
        v.push(i);
        g.push(i);
      });
  }
  return v;
};

const countG = (p) => {
    const v = [];
    let c = 0;
    for (let i = 0; i < p.size; i++) {
        if (v.includes(i)) continue;
        const grp = group(i, p);
        Array.prototype.push.apply(v, grp);
        c++
    };
    return c;
};

const test = fs.readFileSync('test.txt', 'utf8').trim();
const input = fs.readFileSync('input.txt', 'utf8').trim();

console.log(`Test Part 1: ${group(0, org(test)).length}`);
console.log(`Test Part 2: ${countG(org(test))}`);
console.log(`Part 1: ${group(0, org(input)).length}`);
console.log(`Part 2: ${countG(org(input))}`);
