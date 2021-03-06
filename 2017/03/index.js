'use strict';

const soln1 = (input) => {
  let x = 0;
  let y = 0;
  let dir = 'R';
  let data = [];

  for (let i = 1; i < input; i++) {
    data[y] = data[y] || {};
    data[y][x] = i;

    if (i > 1) {
      if (dir === 'R' && (!data[y - 1] || !data[y - 1][x])) dir = 'U';
      else if (dir === 'U' && !data[y][x - 1]) dir = 'L';
      else if (dir === 'L' && (!data[y + 1] || !data[y + 1][x])) dir = 'D';
      else if (dir === 'D' && !data[y][x + 1]) dir = 'R';
    }

    if (dir === 'L') x--;
    if (dir === 'R') x++;
    if (dir === 'U') y--;
    if (dir === 'D') y++;
  }

  return Math.abs(x) + Math.abs(y);
};

const soln2 = (input) => {
  let x = 0;
  let y = 0;
  let dir = 'R';
  let data = [];

  for (let i = 1; ; i++) {
    let value = 0;

    if (data[y] && data[y][x + 1]) value += data[y][x + 1];
    if (data[y] && data[y][x - 1]) value += data[y][x - 1];
    if (data[y + 1] && data[y + 1][x]) value += data[y + 1][x];
    if (data[y + 1] && data[y + 1][x + 1]) value += data[y + 1][x + 1];
    if (data[y + 1] && data[y + 1][x - 1]) value += data[y + 1][x - 1];
    if (data[y - 1] && data[y - 1][x]) value += data[y - 1][x];
    if (data[y - 1] && data[y - 1][x + 1]) value += data[y - 1][x + 1];
    if (data[y - 1] && data[y - 1][x - 1]) value += data[y - 1][x - 1];
    if (i === 1) value = 1;

    data[y] = data[y] || {};
    data[y][x] = value;

    if (value > input) {
      return value;
    }

    if (i > 1) {
      if (dir === 'R' && (!data[y - 1] || !data[y - 1][x])) dir = 'U';
      else if (dir === 'U' && !data[y][x - 1]) dir = 'L';
      else if (dir === 'L' && (!data[y + 1] || !data[y + 1][x])) dir = 'D';
      else if (dir === 'D' && !data[y][x + 1]) dir = 'R';
    }

    if (dir === 'L') x--;
    if (dir === 'R') x++;
    if (dir === 'U') y--;
    if (dir === 'D') y++;
  }
};

console.assert(soln1(1) === 0);
console.assert(soln1(12) === 3);
console.assert(soln1(23) === 2);
console.assert(soln1(1024) === 31);

console.assert(soln2(1) === 2);
console.assert(soln2(12) === 23);
console.assert(soln2(23) === 25);
console.assert(soln2(1024) === 1968);

console.log(`Part 1: ${soln1(361527)}`);
console.log(`Part 2: ${soln2(361527)}`);
