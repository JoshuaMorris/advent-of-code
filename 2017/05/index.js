const fs = require('fs');

const soln1 = (input) => {
    let index = 0, jumps = 0;
    input = input.map(i => +i);

    do {
        let distance = input[index];
        input[index]++;
        index += distance;
        jumps++;
    } while (index < input.length && index >= 0);
    return jumps;
};

const soln2 = (input) => {
    let index = 0, jumps = 0;
    input = input.map(i => +i);

    do {
        let distance = input[index];
        if (distance > 2) input[index]--;
        else input[index]++;
        index += distance;
        jumps++
    } while (index < input.length && index >= 0);
    return jumps;
};

let test = fs.readFileSync(`./test.txt`, 'utf-8').trimRight().split('\n');
let input = fs.readFileSync(`./input.txt`, 'utf-8').trimRight().split('\n');

console.assert(5 === soln1(test));
console.assert(10 === soln2(test));

console.log('Part 1: ', soln1(input));
console.log('Part 2: ', soln2(input));
